const app = require("../app")
const connection = app.query
console.log("qqq", connection)




module.exports.getPageDetails = async (req, res) => {

    try {

        // get page 

        const createPageMasterSql = `SELECT * FROM createpage_master where id = 6`
        var createPageMaster = await connection(createPageMasterSql)
        console.log("page", createPageMaster)

         // get header by id 

         const findHeaderSql = `SELECT * FROM header_master where generateId = '${createPageMaster[0].header}'`
         var findHeader = await connection(findHeaderSql)
         console.log("header========",findHeader)

         // logo section

         const findLogoSectionSql = `SELECT * FROM logo_master where generateId = '${findHeader[0].logoSection}'`
         var findLogoSection = await connection(findLogoSectionSql)
         console.log("logo========",findLogoSection)
         findHeader[0].logoSection = findLogoSection
         createPageMaster[0].header = findHeader

        // menu section

        const findMenuSectionSql = `SELECT * FROM menu_master where generateId = '${findHeader[0].menuSection}'`
        var findMenuSection = await connection(findMenuSectionSql)
        console.log("menu========",findMenuSection)

         var findMenuArray = []

         const menus = findMenuSection[0].menu;
         console.log(menus)
         var arr = menus.split(",")
         for (let j = 0; j < arr.length; j++) {
             const element1 = arr[j];
             const findMenuDataSql = `SELECT * FROM menu_list where generateId ='${element1}'`
             const findMenuData = await connection(findMenuDataSql)
             findMenuArray.push(findMenuData[0])
         };
         findMenuSection[0].menu = findMenuArray
         console.log("menu2========",findMenuSection)
         findHeader[0].menuSection = findMenuSection
         createPageMaster[0].header = findHeader
         findMenuArray = []

        // get slider by id 

        const findSliderSql = `SELECT * FROM slaider_master where generateId = '${createPageMaster[0].slider}'`
        var findSlider = await connection(findSliderSql)
        var findSliderArray = []
        const element = findSlider[0].slaiders;
      //  console.log(element)
        var arr = element.split(",")
        for (let j = 0; j < arr.length; j++) {
            const element2 = arr[j];
            const findSliderDataSql = `SELECT * FROM slider where generateId ='${element2}'`
            const findSliderData = await connection(findSliderDataSql)
            findSliderArray.push(findSliderData[0])
        };
        findSlider[0].slaiders = findSliderArray
        createPageMaster[0].slider = findSlider
        findSliderArray = []


        // get client by id 

        const findClientSql = `SELECT * FROM clients_master where generateId = '${createPageMaster[0].client}'`
        var findClient = await connection(findClientSql)
        var findClientArray = []
        const clients = findClient[0].clients;
      //  console.log(clients)
        var arr2 = clients.split(",")
        for (let j = 0; j < arr2.length; j++) {
            const clientsId = arr2[j];
            const findClientsDataSql = `SELECT * FROM our_clients where generateId ='${clientsId}'`
            const findClientsData = await connection(findClientsDataSql)
            findClientArray.push(findClientsData[0])
        };
        findClient[0].clients = findClientArray
        createPageMaster[0].client = findClient
        findClientArray = []


        // get success story by id 

        const findSuccessStorySql = `SELECT * FROM successstory_master where generateId = '${createPageMaster[0].successStory}'`
        var findSuccessStory = await connection(findSuccessStorySql)
        var findSuccessStoryArray = []
        const successStory = findSuccessStory[0].successStory;
      //  console.log(successStory)
        var arr3 = successStory.split(",")
        for (let j = 0; j < arr3.length; j++) {
            const successStoryId = arr3[j];
            const findSuccessStoryDataSql = `SELECT * FROM success_strories where generateId ='${successStoryId}'`
            const findSuccessStoryData = await connection(findSuccessStoryDataSql)
            findSuccessStoryArray.push(findSuccessStoryData[0])
        };
        findSuccessStory[0].successStory = findSuccessStoryArray
        createPageMaster[0].successStory = findSuccessStory
        findSuccessStoryArray = []

        // get technologies story by id 

        const findTechnologiesSql = `SELECT * FROM technologies_master where generateId = '${createPageMaster[0].technologies}'`
        var findTechnologies = await connection(findTechnologiesSql)
        var findTechnologiesArray = []
        const technologies = findTechnologies[0].technologies;
      //  console.log(technologies)
        var arr4 = technologies.split(",")
        for (let j = 0; j < arr4.length; j++) {
            const technologiesId = arr4[j];
            const findTechnologiesDataSql = `SELECT * FROM technologies_list where generateId ='${technologiesId}'`
            const findTechnologiesData = await connection(findTechnologiesDataSql)
            findTechnologiesArray.push(findTechnologiesData[0])
        };
        findTechnologies[0].technologies = findTechnologiesArray
        createPageMaster[0].technologies = findTechnologies
        findTechnologiesArray = []

        // get offering story by id 

        const findOfferingSql = `SELECT * FROM offering_master where generateId = '${createPageMaster[0].offering}'`
        var findOffering = await connection(findOfferingSql)
        var findOfferingArray = []
        const offering = findOffering[0].offering;
       // console.log(offering)
        var arr5 = offering.split(",")
        for (let j = 0; j < arr5.length; j++) {
            const offeringId = arr5[j];
            const findOfferingDataSql = `SELECT * FROM offering where generateId ='${offeringId}'`
            const findOfferingData = await connection(findOfferingDataSql)
            findOfferingArray.push(findOfferingData[0])
        };
        findOffering[0].offering = findOfferingArray
        createPageMaster[0].offering = findOffering
        findOfferingArray = []

         // get industries story by id 

         const findIndustriesSql = `SELECT * FROM industries_master where generateId = '${createPageMaster[0].industries}'`
         var findIndustries = await connection(findIndustriesSql)
         var findIndustriesArray = []
         const industries = findIndustries[0].industries;
       //  console.log(industries)
         var arr6 = industries.split(",")
         for (let j = 0; j < arr6.length; j++) {
             const industriesId = arr6[j];
             const findIndustriesDataSql = `SELECT * FROM industries where generateId ='${industriesId}'`
             const findIndustriesData = await connection(findIndustriesDataSql)
             findIndustriesArray.push(findIndustriesData[0])
         };
         findIndustries[0].industries = findIndustriesArray
         createPageMaster[0].industries = findIndustries
         findIndustriesArray = []

          // get awards story by id 

          const findAwardsSql = `SELECT * FROM awards_master where generateId = '${createPageMaster[0].award}'`
          var findAwards = await connection(findAwardsSql)
          var findAwardsArray = []
          const awards = findAwards[0].awards;
        //  console.log("awards",awards)
          var arr7 = awards.split(",")
          for (let j = 0; j < arr7.length; j++) {
              const awardsId = arr7[j];
              const findAwardsDataSql = `SELECT * FROM awards where generateId ='${awardsId}'`
              const findAwardsData = await connection(findAwardsDataSql)
              findAwardsArray.push(findAwardsData[0])
          };
          findAwards[0].awards = findAwardsArray
          createPageMaster[0].award = findAwards
          findAwardsArray = []

            // get blog story by id 

            const findBlogSql = `SELECT * FROM blogs_master where generateId = '${createPageMaster[0].blog}'`
            var findBlog = await connection(findBlogSql)
            var findBlogArray = []
            const blogs = findBlog[0].blogs;
          //  console.log("blogs",blogs)
            var arr8 = blogs.split(",")
            for (let j = 0; j < arr8.length; j++) {
                const blogId = arr8[j];
                const findBlogDataSql = `SELECT * FROM blogs where generateId ='${blogId}'`
                const findBlogData = await connection(findBlogDataSql)
                findBlogArray.push(findBlogData[0])
            };
            findBlog[0].blogs = findBlogArray
            createPageMaster[0].blog = findBlog
            findBlogArray = []

            
           let count =[{
            headerSr:createPageMaster[0].headerSr,
            sliderSr:createPageMaster[0].sliderSr,
            clientSr:createPageMaster[0].clientSr,
            successStorySr:createPageMaster[0].successStorySr,
            technologiesSr:createPageMaster[0].technologiesSr,
            offeringSr:createPageMaster[0].offeringSr,
            industriesSr:createPageMaster[0].industriesSr,
            awardsSr:createPageMaster[0].awardsSr,
            blogSr:createPageMaster[0].blogSr,
           }]
           createPageMaster[0].Count = count

        res.status(200).json({ message: createPageMaster })
    } catch (error) {
        res.status(200).json({ error: error })
    }
}
