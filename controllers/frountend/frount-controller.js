const Admin = require('../../model/admin')
const path = require('path');
const EventListing = require('../../model/eventListingModal')
const IcoListing = require('../../model/icoListingModal')
const Airdrop = require('../../model/airdropModal')
const Influencer = require('../../model/influencerModal')
const News = require('../../model/newsModal')
const moment = require("moment");
const axios = require('axios');







module.exports.frountHomePage = async (req, res) => {
  try {

    // ICO list
    const icoListingData = await IcoListing.find()
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(12);


    const formattedIcoListingData = icoListingData.map(event => {
      const plain = event.toObject();
      return {
        ...plain,
        startDateFormatted: moment(plain.startDate).format("D MMM YYYY"),  // e.g., 2 Jul 2025
        endDateFormatted: moment(plain.endDate).format("D MMM YYYY"),
      };
    });

    // Airdrop List

    //  const adminData = await Admin.find()
    const AirdropData = await Airdrop.find()
      .sort({ createdAt: -1 }) // Sort by newest
      .limit(12);


    const formattedAirdropData = AirdropData.map(event => {
      const plain2 = event.toObject();
      return {
        ...plain2,
        startDateFormatted: moment(plain2.startDate).format("D MMM YYYY"),  // e.g., 2 Jul 2025
        endDateFormatted: moment(plain2.endDate).format("D MMM YYYY"),
      };
    });

    // events listing
    const category = 'upcoming'
    const now = new Date();
    let filter = {};
    if (category === 'ongoing') {
      filter = {
        startDate: { $lte: now },
        endDate: { $gte: now }
      };
    } else if (category === 'upcoming') {
      filter = {
        startDate: { $gt: now }
      };
    } else if (category === 'ended') {
      filter = {
        endDate: { $lt: now }
      };
    }
    const eventListingData = await EventListing.find(filter)
      .sort({ startDate: 1 }) // -1 means latest first, use 1 for oldest first
      .limit(12);
    // // console.log("======", formattedAirdropData)

    // crypto coins

    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: 'usd',
        }
      }
    );
    // console.log(response.data)
    res.render("frountend/index.ejs", {
      formattedIcoListingData,
      formattedAirdropData,
      eventListingData,
      response: response.data
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.eventListing = async (req, res) => {
  try {
    const perPage = 20;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || 'all';
    const now = new Date();

    // filter ongoing , upcoming , ended logic

    let filter = {};
    if (category === 'ongoing') {
      filter = {
        startDate: { $lte: now },
        endDate: { $gte: now }
      };
    } else if (category === 'upcoming') {
      filter = {
        startDate: { $gt: now }
      };
    } else if (category === 'ended') {
      filter = {
        endDate: { $lt: now }
      };
    }



    const totalCount = await EventListing.countDocuments(filter);
    const eventListingData = await EventListing.find(filter)
      .sort({ startDate: 1 }) // -1 means latest first, use 1 for oldest first
      .skip((page - 1) * perPage)
      .limit(perPage);

    //  // console.log(eventListingData)
    const formattedEventListingData = eventListingData.map(event => {
      const plain = event.toObject();
      return {
        ...plain,
        startDateFormatted: moment(plain.startDate).format("MMMM Do, YYYY"),
        endDateFormatted: moment(plain.endDate).format("MMMM Do, YYYY"),
      };
    });
    // // console.log(formattedEventListingData)
    res.render("frountend/eventListing.ejs", {
      formattedEventListingData,
      current: page,
      pages: Math.ceil(totalCount / perPage),
      selectedCategory: category
    })

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.createEventListing = async (req, res) => {
  try {
    //  const adminData = await Admin.find()
    res.render("frountend/createEventListing.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.createEventListingSubmit = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const { title, country, location, startDate, endDate, eventType, category, website, description, entryType, basicPrice, standradPrice, premiumPrice, vipPrice, authorName, authorEmail, authorWhatsapp, authorTwitter } = req.body;
    const bannerImage = req.files.banner[0].location

    const body = req.body;

    // Step 1: Create a temporary object to hold the grouped speakers
    const speakers = [];
    const tempSpeakers = {};

    // Step 2: Group fields by speaker index
    Object.keys(body).forEach(key => {
      const match = key.match(/^speakers\[(\d+)\]\.(\w+)$/);
      if (match) {
        const index = parseInt(match[1], 10);  // Get the index
        const field = match[2];  // Get the field (mrp, name, age, city, country)

        // Initialize the speaker object if it doesn't exist
        if (!tempSpeakers[index]) {
          tempSpeakers[index] = {};
        }

        // Assign the value to the speaker field
        tempSpeakers[index][field] = body[key];
      }
    });

    // Step 3: Filter out speakers with all empty fields
    Object.values(tempSpeakers).forEach(speakerObj => {
      // Check if the speaker has at least one non-empty field
      const hasValidField = Object.values(speakerObj).some(value => value !== '' && value !== null);

      // If it has any non-empty field, keep the entire speaker object
      if (hasValidField) {
        speakers.push(speakerObj);
      }
    });



    // Step 1: Create a temporary object to hold the grouped partners
    const partners = [];
    const tempPartners = {};

    // Step 2: Group fields by partner index
    Object.keys(body).forEach(key => {
      const match = key.match(/^partner\[(\d+)\]\.(\w+)$/);  // Match fields like partner[0].mrp
      if (match) {
        const index = parseInt(match[1], 10);  // Get the index (0, 1, 2, ...)
        const field = match[2];  // Get the field name (mrp, name, etc.)

        // Initialize the partner object if it doesn't exist
        if (!tempPartners[index]) {
          tempPartners[index] = {};
        }

        // Assign the value to the correct field
        tempPartners[index][field] = body[key];
      }
    });

    // Step 3: Filter out partners with all empty fields and ensure all fields appear
    Object.values(tempPartners).forEach(partnerObj => {
      // Check if the partner has at least one non-empty field
      const hasValidField = Object.values(partnerObj).some(value => value !== '' && value !== null);

      // If it has any non-empty field, keep the entire partner object
      if (hasValidField) {
        partners.push(partnerObj);
      }
    });

    // Step 1: Create a temporary object to hold the grouped sponsors
    const sponsors = [];
    const tempSponsors = {};

    // Step 2: Group fields by sponsor index
    Object.keys(body).forEach(key => {
      const match = key.match(/^sponsor\[(\d+)\]\.(\w+)$/);  // Match sponsor fields like sponsor[0].mrp
      if (match) {
        const index = parseInt(match[1], 10);  // Get the index (0, 1, 2, ...)
        const field = match[2];  // Get the field name (mrp, name, etc.)

        // Initialize the sponsor object if it doesn't exist
        if (!tempSponsors[index]) {
          tempSponsors[index] = {};
        }

        // Assign the value to the correct field
        tempSponsors[index][field] = body[key];
      }
    });

    // Step 3: Filter out sponsors with all empty fields and ensure 'name' is always included
    Object.values(tempSponsors).forEach(sponsorObj => {
      // Ensure that 'name' is always included, even if it's empty
      if (sponsorObj['name'] === undefined) {
        sponsorObj['name'] = ''; // Add 'name' as an empty string if it's not present
      }

      // Check if the sponsor has at least one non-empty field (other than 'name')
      const hasValidField = Object.keys(sponsorObj).some(field => sponsorObj[field] !== '' && sponsorObj[field] !== null);

      // If it has any non-empty field, keep the entire sponsor object
      if (hasValidField || sponsorObj['name'] !== '') {
        sponsors.push(sponsorObj);
      }
    });


    //  manage slug

    var slug = title.replace(/\s+/g, '-')
    const eventData = await EventListing.find({ title: title })
    // // console.log(eventData)
    if (eventData.length > 0) {
      slug = title.replace(/\s+/g, '-') + Math.floor(100 + Math.random() * 900);
    }

    // save data


    const newEvent = new EventListing({
      title: title,
      bannerImage: bannerImage,
      country: country,
      location: location,
      startDate: startDate,
      endDate: endDate,
      eventType: eventType,
      category: category,
      website: website,
      entryType: entryType,
      price: {
        basicPrice: basicPrice,
        standradPrice: standradPrice,
        premiumPrice: premiumPrice,
        vipPrice: vipPrice
      },
      description: description,
      speakers: speakers,
      partners: partners,
      sponsors: sponsors,
      slug: slug,
      authorName: authorName,
      authorEmail: authorEmail,
      authorWhatsapp: authorWhatsapp,
      authorTwitter: authorTwitter
    });
    const savedEvent = await newEvent.save();
    res.redirect('/eventListing')
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.detailEventListing = async (req, res) => {
  try {
    const eventListingSlug = req.params.id
    //  // console.log("========",eventListingSlug)
    const eventListingData = await EventListing.find({ slug: eventListingSlug })
    const formattedEventListingData = eventListingData.map(event => {
      const plain = event.toObject();
      return {
        ...plain,
        startDateFormatted: moment(plain.startDate).format("MMMM Do, YYYY"),
        endDateFormatted: moment(plain.endDate).format("MMMM Do, YYYY"),
      };
    });
    //   // console.log("--------",formattedEventListingData)
    res.render("frountend/DetailEventListing.ejs", { eventListingData: formattedEventListingData[0] })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


//  ICO LISTING



module.exports.IcoListing = async (req, res) => {
  try {
    const perPage = 20;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || 'all';
    const now = new Date();

    // filter ongoing , upcoming , ended logic

    let filter = {};
    if (category === 'ongoing') {
      filter = {
        startDate: { $lte: now },
        endDate: { $gte: now }
      };
    } else if (category === 'upcoming') {
      filter = {
        startDate: { $gt: now }
      };
    } else if (category === 'ended') {
      filter = {
        endDate: { $lt: now }
      };
    }
    const totalCount = await IcoListing.countDocuments(filter);
    const icoListingData = await IcoListing.find(filter)
      .sort({ startDate: 1 }) // -1 means latest first, use 1 for oldest first
      .skip((page - 1) * perPage)
      .limit(perPage);


    const formattedIcoListingData = icoListingData.map(event => {
      const plain = event.toObject();
      return {
        ...plain,
        startDateFormatted: moment(plain.startDate).format("MMMM Do, YYYY"),
        endDateFormatted: moment(plain.endDate).format("MMMM Do, YYYY"),
      };
    });
    res.render("frountend/icoListing.ejs", {
      formattedIcoListingData,
      current: page,
      pages: Math.ceil(totalCount / perPage),
      selectedCategory: category
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.createIcoListing = async (req, res) => {
  try {
    //  const adminData = await Admin.find()
    res.render("frountend/createIcoListing.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.icoListingUnderProcess = async (req, res) => {
  try {
    const { message } = req.query;
    res.render("frountend/icoUnderProcess.ejs", { message })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


// ICO Listing Submit




module.exports.createIcoListingSubmit = async (req, res) => {
  try {
    const {
      title,
      raiseFund,
      startDate,
      endDate,
      smallDescription,
      ticker,
      blockChain,
      category,
      country,
      industry,
      foundedYear,
      whitelist,
      kyc,
      bounty,
      mvp,
      securityAudit,
      tokenReview,
      totalRaise,
      preSale,
      fdv,
      totalSupply,
      publicSale,
      initialCirculationSupply,
      TelegramChannel,
      twitterLink,
      instagramLink,
      youtubeLink,
      websiteLink,
      mediumLink,
      authorName,
      authorEmail,
      authorTwitter,
      authorWhatsapp
    } = req.body;

    const body = req.body;

    // Required: logo & whitepaper
    if (!req.files || !req.files.logo || !req.files.whitepaper) {
      return res.status(400).json({ message: 'Logo and Whitepaper are required.' });
    }

    const logoUrl = req.files.logo ? req.files.logo[0]?.location : null;
    const whitepaperUrl = req.files.whitepaper ? req.files.whitepaper[0]?.location : null;
    const roadmapUrl = req.files.roadmap ? req.files.roadmap[0]?.location : null;
    const projectScreeshot = req.files.projectSreenshot ? req.files.projectSreenshot.map(file => file.location) : [];
   // // console.log("=========", req.files)
   // // console.log("==================", req.body)

    // for rounds

    const rounds = [];
    const tempRounds = {};

    Object.keys(body).forEach(key => {
      const match = key.match(/^rounds\[(\d+)\]\.(\w+)$/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];

        if (!tempRounds[index]) {
          tempRounds[index] = {};
        }

        tempRounds[index][field] = body[key];
      }
    });


    Object.values(tempRounds).forEach(roundObj => {
      const hasValidField = Object.values(roundObj).some(
        value => value !== '' && value !== null && value !== undefined
      );

      if (hasValidField) {
        rounds.push(roundObj);
      }
    });
  //  // console.log("Rounds=========", rounds)


    // for teams

    const team = [];
    const tempTeam = {};

    Object.keys(body).forEach(key => {
      const match = key.match(/^team\[(\d+)\]\.(\w+)$/);
      if (match) {
        const index = parseInt(match[1], 10);
        const field = match[2];

        if (!tempTeam[index]) {
          tempTeam[index] = {};
        }

        tempTeam[index][field] = body[key];
      }
    });

    Object.values(tempTeam).forEach(teamObj => {
      const hasValidField = Object.values(teamObj).some(
        value => value !== '' && value !== null && value !== undefined
      );

      if (hasValidField) {
        team.push(teamObj);
      }
    });

  //  // console.log("teams=========", team)


    // for influencers section

    // Step 1: Create a temporary object to hold the grouped influencers
    const influencers = [];
    const tempInfluencers = {};

    // Step 2: Group fields by influencer index
    Object.keys(body).forEach(key => {
      const match = key.match(/^influancer\[(\d+)\]\.(\w+)$/);
      if (match) {
        const index = parseInt(match[1], 10);  // Get the index
        const field = match[2];  // Get the field (e.g., name, age, city, country, etc.)

        // Initialize the influencer object if it doesn't exist
        if (!tempInfluencers[index]) {
          tempInfluencers[index] = {};
        }

        // Assign the value to the influencer field
        tempInfluencers[index][field] = body[key];
      }
    });

    // Step 3: Filter out influencers with all empty fields
    Object.values(tempInfluencers).forEach(influencerObj => {
      // Check if the influencer has at least one non-empty field
      const hasValidField = Object.values(influencerObj).some(value => value !== '' && value !== null);

      // If it has any non-empty field, keep the entire influencer object
      if (hasValidField) {
        influencers.push(influencerObj);
      }
    });

  //  // console.log("influencers=========", influencers)


    // for partners section


    // Step 1: Create a temporary object to hold the grouped partners
    const partners = [];
    const tempPartners = {};

    // Step 2: Group fields by partner index
    Object.keys(body).forEach(key => {
      const match = key.match(/^partner\[(\d+)\]\.(\w+)$/);  // Match fields like partner[0].mrp
      if (match) {
        const index = parseInt(match[1], 10);  // Get the index (0, 1, 2, ...)
        const field = match[2];  // Get the field name (mrp, name, etc.)

        // Initialize the partner object if it doesn't exist
        if (!tempPartners[index]) {
          tempPartners[index] = {};
        }

        // Assign the value to the correct field
        tempPartners[index][field] = body[key];
      }
    });

    // Step 3: Filter out partners with all empty fields and ensure all fields appear
    Object.values(tempPartners).forEach(partnerObj => {
      // Check if the partner has at least one non-empty field
      const hasValidField = Object.values(partnerObj).some(value => value !== '' && value !== null);

      // If it has any non-empty field, keep the entire partner object
      if (hasValidField) {
        partners.push(partnerObj);
      }
    });

    // console.log("partners=========", partners)


    // for sponsors section


    // Step 1: Create a temporary object to hold the grouped sponsors
    const sponsors = [];
    const tempSponsors = {};

    // Step 2: Group fields by sponsor index
    Object.keys(body).forEach(key => {
      const match = key.match(/^sponsor\[(\d+)\]\.(\w+)$/);  // Match sponsor fields like sponsor[0].mrp
      if (match) {
        const index = parseInt(match[1], 10);  // Get the index (0, 1, 2, ...)
        const field = match[2];  // Get the field name (mrp, name, etc.)

        // Initialize the sponsor object if it doesn't exist
        if (!tempSponsors[index]) {
          tempSponsors[index] = {};
        }

        // Assign the value to the correct field
        tempSponsors[index][field] = body[key];
      }
    });

    // Step 3: Filter out sponsors with all empty fields and ensure 'name' is always included
    Object.values(tempSponsors).forEach(sponsorObj => {
      // Ensure that 'name' is always included, even if it's empty
      if (sponsorObj['name'] === undefined) {
        sponsorObj['name'] = ''; // Add 'name' as an empty string if it's not present
      }

      // Check if the sponsor has at least one non-empty field (other than 'name')
      const hasValidField = Object.keys(sponsorObj).some(field => sponsorObj[field] !== '' && sponsorObj[field] !== null);

      // If it has any non-empty field, keep the entire sponsor object
      if (hasValidField || sponsorObj['name'] !== '') {
        sponsors.push(sponsorObj);
      }
    });

    // console.log("sponsors=========", sponsors)


    //  manage slug

    var slug = title.replace(/\s+/g, '-')
    const IcoData = await IcoListing.find({ title: title })
    if (IcoData.length > 0) {
      slug = title.replace(/\s+/g, '-') + Math.floor(100 + Math.random() * 900);
    }

    // save data


    const newIco = new IcoListing({
      title: title,
      slug: slug,
      raiseFund: raiseFund,
      startDate: startDate,
      endDate: endDate,
      smallDescription: smallDescription,
      ticker: ticker,
      blockChain: blockChain,
      category: category,
      country: country,
      industry: industry,
      foundedYear: foundedYear,
      whitelist: whitelist,
      kyc: kyc,
      bounty: bounty,
      mvp: mvp,
      securityAudit: securityAudit,
      tokenReview: tokenReview,
      totalRaise: totalRaise,
      preSale: preSale,
      fdv: fdv,
      totalSupply: totalSupply,
      publicSale: publicSale,
      initialCirculationSupply: initialCirculationSupply,
      TelegramChannel: TelegramChannel,
      twitterLink: twitterLink,
      instagramLink: instagramLink,
      youtubeLink: youtubeLink,
      websiteLink: websiteLink,
      mediumLink: mediumLink,
      logo: logoUrl,
      whitepaper: whitepaperUrl,
      roadmap: roadmapUrl,
      projectScreeshot: projectScreeshot,
      rounds: rounds,
      teams: team,
      influencers: influencers,
      partners: partners,
      sponsors: sponsors,
      authorName: authorName,
      authorEmail: authorEmail,
      authorWhatsapp: authorWhatsapp,
      authorTwitter: authorTwitter
    });
    const SavedIco = await newIco.save();
    res.redirect(`/icoUnderProcess/:${SavedIco._id}?message=${"ICO"}`)
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.airdropListing = async (req, res) => {
  try {
    const perPage = 20;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || 'all';
    const now = new Date();

    // filter ongoing , upcoming , ended logic

    let filter = {};
    if (category === 'ongoing') {
      filter = {
        startDate: { $lte: now },
        endDate: { $gte: now }
      };
    } else if (category === 'upcoming') {
      filter = {
        startDate: { $gt: now }
      };
    } else if (category === 'ended') {
      filter = {
        endDate: { $lt: now }
      };
    }
    const totalCount = await Airdrop.countDocuments(filter);
    const icoListingData = await Airdrop.find(filter)
      .sort({ startDate: 1 }) // -1 means latest first, use 1 for oldest first
      .skip((page - 1) * perPage)
      .limit(perPage);


    const formattedAirdropListingData = icoListingData.map(event => {
      const plain = event.toObject();
      return {
        ...plain,
        startDateFormatted: moment(plain.startDate).format("MMMM Do, YYYY"),
        endDateFormatted: moment(plain.endDate).format("MMMM Do, YYYY"),
      };
    });
   // console.log(formattedAirdropListingData)
    res.render("frountend/airdrops.ejs", {
      formattedAirdropListingData,
      current: page,
      pages: Math.ceil(totalCount / perPage),
      selectedCategory: category
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.createAirdrop = async (req, res) => {
  try {
    //  const adminData = await Admin.find()
    res.render("frountend/createAirdropListing.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.createAirdropSubmit = async (req, res) => {
  try {
    // console.log(req.body)
    const {
      tokenName,
      tokenSymbol,
      country,
      startDate,
      endDate,
      winningDate,
      cryptocurrencyType,
      tokenQuantity,
      airdropQuantity,
      noOfWinners,
      projectWebsite,
      email,
      partnershipWithUs,
      projectDescription,
      taskDetails,
      projectBasedOn,
      taskList,
      facebook,
      twitter,
      instagram,
      reddit,
      mediumUrl,
      telegram,
      authorName,
      authorEmail,
      authorWhatsapp,
      authorTwitter
    } = req.body;

    const tokenImage = req.files.tokenImage ? req.files.tokenImage[0]?.location : null;
    const bannerImage = req.files.bannerImage ? req.files.bannerImage[0]?.location : null;

    //  manage slug

    var slug = tokenName.replace(/\s+/g, '-')
    const AirdropData = await Airdrop.find({ tokenName: tokenName })
    if (AirdropData.length > 0) {
      slug = tokenName.replace(/\s+/g, '-') + Math.floor(100 + Math.random() * 900);
    }

    // Utility to sanitize null or "" to "N/A"
    const sanitize = (val) => (val === '' || val === null || val === undefined) ? 'N/A' : val;

    const newAirdrop = new Airdrop({
      tokenName: sanitize(tokenName),
      tokenImage: sanitize(tokenImage),
      bannerImage: sanitize(bannerImage),
      tokenSymbol: sanitize(tokenSymbol),
      country: sanitize(country),
      startDate: startDate || null,
      endDate: endDate || null,
      winningDate: winningDate || null,
      cryptocurrencyType: sanitize(cryptocurrencyType),
      tokenQuantity: tokenQuantity ?? 'N/A',
      airdropQuantity: airdropQuantity ?? 'N/A',
      noOfWinners: noOfWinners ?? 'N/A',
      projectWebsite: sanitize(projectWebsite),
      email: sanitize(email),
      partnershipWithUs: sanitize(partnershipWithUs),
      projectDescription: sanitize(projectDescription),
      taskDetails: sanitize(taskDetails),
      projectBasedOn: sanitize(projectBasedOn),
      taskList: sanitize(taskList),
      facebook: sanitize(facebook),
      twitter: sanitize(twitter),
      instagram: sanitize(instagram),
      reddit: sanitize(reddit),
      mediumUrl: sanitize(mediumUrl),
      telegram: sanitize(telegram),
      authorName: sanitize(authorName),
      authorEmail: sanitize(authorEmail),
      authorWhatsapp: sanitize(authorWhatsapp),
      authorTwitter: sanitize(authorTwitter),
      slug: slug
    });
    await newAirdrop.save();
    res.redirect(`/icoUnderProcess/${newAirdrop._id}?message=${"Airdrop"}`);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.influencers = async (req, res) => {
  try {
    const influencerData = (await Influencer.find()).reverse()
    console.log(influencerData)
    res.render("frountend/influencer.ejs", { influencerData: influencerData })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


module.exports.createInfluencer = async (req, res) => {
  try {
    res.render("frountend/createInfluencer.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}


module.exports.createInfluencerSubmit = async (req, res) => {
  try {
    const sanitize = (val) => (val === '' || val === null || val === undefined) ? 'N/A' : val;
    const {
      name,
      facebook,
      twitter,
      instagram,
      reddit,
      telegramHandle,
      telegramChannel,
      linkedIn,
      discord,
      whatsapp,
      youtube
    } = req.body;

    const profileImage = req.files.profileImage ? req.files.profileImage[0]?.location : null;

    //  manage slug

    var slug = name.replace(/\s+/g, '-')
    const influencerData = await Influencer.find({ name: name })
    if (influencerData.length > 0) {
      slug = name.replace(/\s+/g, '-') + Math.floor(100 + Math.random() * 900);
    }

    const newInfluencer = new Influencer({
      name: sanitize(name),
      profileImage: sanitize(profileImage),
      facebook: sanitize(facebook),
      twitter: sanitize(twitter),
      instagram: sanitize(instagram),
      reddit: sanitize(reddit),
      telegramHandle: sanitize(telegramHandle),
      telegramChannel: sanitize(telegramChannel),
      linkedIn: sanitize(linkedIn),
      discord: sanitize(discord),
      whatsapp: sanitize(whatsapp),
      youtube: sanitize(youtube),
      slug: slug
    });
    const saved = await newInfluencer.save();
    // // console.log(req.body)
    // // console.log(req.files)
    res.redirect("/influencers")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}


module.exports.allNews = async (req, res) => {
  try {
    res.render("frountend/news.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports.addNews = async (req, res) => {
  try {
    res.render("frountend/createNews.ejs")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports.addNewsSubmit = async (req, res) => {
  try {
    if (req.files && req.files['file']) {
      const uploadedImage = req.files['file'][0];

      // Return JSON with image URL
      return res.json({
        location: uploadedImage.location, // this is S3 URL from multer-s3
      });
    }

    const {
      title,
      category,
      tags,
      description,
    } = req.body;

    const newsBanner = req.files.newsBanner ? req.files.newsBanner[0]?.location : null;

    //  manage slug

    var slug = title.replace(/\s+/g, '-')
    const influencerData = await Influencer.find({ title: title })
    if (influencerData.length > 0) {
      slug = title.replace(/\s+/g, '-') + Math.floor(100 + Math.random() * 900);
    }

    const newNews = new News({
      title: title,
      category: category,
      tags: tags,
      description: description,
      slug: slug,
      newsBanner: newsBanner,
      status: "approved"
    });
    const saved = await newNews.save();
    res.redirect("/news")
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}


module.exports.DetailIco = async (req, res) => {
  try {
    const slug = req.params.slug
    const icoData = await IcoListing.find({ slug: slug })
    const startDate = new Date(icoData[0].startDate); // aapki db se aayi date
    const formattedStartDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(startDate);

    // console.log(formattedStartDate)
  
    const endDate = new Date(icoData[0].endDate); // aapki db se aayi date
    const formattendDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(endDate);
  //  // console.log(formattendDate)
    icoData[0].formattedStartDate = formattedStartDate
    icoData[0].formattendDate = formattendDate
    res.render("frountend/detailIco.ejs", { icoData: icoData[0] })
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

