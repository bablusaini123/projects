import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white font-['Outfit']">
      {/* Main Content */}
      <main className="bg-gradient-to-br from-blue-50 to-red-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Last updated: July 20, 2025
            </p>

            <div className="space-y-8">
              {/* 1. Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  EarnScop Private Limited (“We”, “Our”, “EarnScop”, or “Us”) owns and/or operates the website and mobile application EarnScop.com (“Website”, “Our Website”, “Site”). This Privacy Policy explains how we collect, use, share, and protect personal information of the Users of the Services (jointly and severally referred to as “You”, “Your”, “Yourself”, or “User” in this Privacy Policy). We have created this Privacy Policy to ensure our steady commitment to the privacy of information of the Users who interact with our Services. Your use of and access to the Services is subject to this Privacy Policy and our Terms and Conditions.
                </p>
              </section>

              {/* 2. Definitions */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Definitions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Any information that relates to a natural person, which, either directly or indirectly, in combination with other information available or likely to be available to a body corporate, is capable of identifying such person, as defined in Rule 2(1)(i) of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Sensitive Personal Data or Information</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Personal Information relating to passwords, financial information (e.g., bank accounts, credit/debit card details, or other payment instrument details), physical, physiological, and mental health condition, sexual orientation, medical records and history, biometric information, information received under lawful contract or otherwise, visitor details provided at registration or thereafter, and call data records.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">You, Your, Yourself, User</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Natural and legal individuals and entities who visit and/or use the Services, including those who avail of the Services by submission of details by another person.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Third Parties</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Any website, application, company, or individual apart from the User and EarnScop.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Services</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The Website (https://earnscop.com/) and Mobile Application (EarnScop) and contextual information transmitted to/received from Users via various communication channels including but not limited to e-mail, SMS, WhatsApp, phone calls, website chat, IVR. We are primarily engaged in the business of allowing Users to share customized links for products and services across our partner network, driving sales to e-commerce websites, and enabling Users to earn cashback or affiliate rewards.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">User Information</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Personal Information and Sensitive Personal Data or Information.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Platform</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Collectively refers to the EarnScop Website, Application, and/or App available on the Android Play Store or iOS App Store.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Why This Privacy Policy? */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Why This Privacy Policy?</h2>
                <p className="text-gray-600 leading-relaxed">
                  This Privacy Policy is published in compliance with Section 43A of the Information Technology Act, 2000, Regulation 4 of the SPI Rules, and Regulation 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011. It outlines:
                  <ul className="list-disc pl-5 mt-2">
                    <li>The type of information collected from Users, including Sensitive Personal Data or Information;</li>
                    <li>The purpose, means, and modes of usage of such information;</li>
                    <li>How and to whom we will disclose such information.</li>
                  </ul>
                </p>
              </section>

              {/* 4. General */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. General</h2>
                <p className="text-gray-600 leading-relaxed">
                  The User unequivocally agrees that this Policy and the Terms and Conditions constitute a legally binding agreement between the User and EarnScop. The User shall be subject to the rules, guidelines, policies, terms, and conditions applicable to any service provided by EarnScop, and the same shall be deemed incorporated into the Terms and Conditions. This document is an electronic record in terms of the Information Technology Act, 2000 and rules thereunder, as applicable, and the amended provisions pertaining to electronic records in various statutes. This electronic record is generated by a computer system and does not require physical or digital signatures. EarnScop retains the right to amend or modify this Policy and Terms without prior notice to the User. Any such changes shall come into effect immediately upon being updated on the Platform. Users are advised to review the Policy periodically. Continued use of the Services constitutes consent to the updated terms.
                </p>
              </section>

              {/* 5. Collection and Handling of Personal Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Collection and Handling of Personal Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  EarnScop may collect, store, and process the following information:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Contact data (such as email address and phone number);</li>
                    <li>Username and passwords;</li>
                    <li>Demographic data (such as name, gender, age, and pin code);</li>
                    <li>Transaction data from your interactions with the Platform;</li>
                    <li>Banking or payment-related details (e.g., account number, IFSC code);</li>
                    <li>Device data, browser patterns, and clicks on/from EarnScop;</li>
                    <li>Other information voluntarily provided (e.g., feedback, screenshots of transactions).</li>
                  </ul>
                  The information collected shall constitute ‘Personal Information’ or ‘Sensitive Personal Data or Information’ as per applicable laws.
                </p>
              </section>

              {/* 6. Privacy Statements */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Privacy Statements</h2>
                <p className="text-gray-600 leading-relaxed">
                  EarnScop may:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Track User activities on the Platform to analyze usage trends and enhance services;</li>
                    <li>Store personal correspondence like emails, chats, or calls for operational purposes;</li>
                    <li>Send transactional, promotional, or referral-based communications. Users may opt-out by contacting <a href="mailto:support@earnscop.com" className="text-blue-600 hover:underline">support@earnscop.com</a>;</li>
                    <li>Conduct optional surveys to understand customer preferences;</li>
                    <li>Request reviews or feedback, which may be displayed publicly with User consent.</li>
                  </ul>
                  Users are responsible for ensuring the accuracy of their information. Incorrect or outdated data may result in suspension of services.
                </p>
              </section>

              {/* 7. Use of Your Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Use of Your Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your data may be used for:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Providing and improving our Services;</li>
                    <li>Generating cashback, affiliate commissions, and payment tracking;</li>
                    <li>Marketing and promotional campaigns (Users can opt-out);</li>
                    <li>Market research and analytics;</li>
                    <li>Detecting fraud or unauthorized activity;</li>
                    <li>Compliance with legal obligations or judicial requirements.</li>
                  </ul>
                  EarnScop may share data with trusted third parties (e.g., payment gateways, analytics providers, or partner retailers) in compliance with this Policy.
                </p>
              </section>

              {/* 8. Confidentiality and Security */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Confidentiality and Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  User data is stored securely using industry-standard practices, including encryption, firewalls, and access controls. However, EarnScop is not liable for unauthorized access caused by User negligence (e.g., weak passwords). Users must notify us of any suspicious account activity at <a href="mailto:support@earnscop.com" className="text-blue-600 hover:underline">support@earnscop.com</a>.
                </p>
              </section>

              {/* 9. Retention of Data */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Retention of Data</h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain data only as long as necessary for fulfilling the purposes outlined in this Policy or as required by law.
                </p>
              </section>

              {/* 10. User Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. User Rights</h2>
                <p className="text-gray-600 leading-relaxed">
                  You may:
                  <ul className="list-disc pl-5 mt-2">
                    <li>Request a copy of your data;</li>
                    <li>Ask for corrections or updates;</li>
                    <li>Request account deletion or data removal by contacting <a href="mailto:support@earnscop.com" className="text-blue-600 hover:underline">support@earnscop.com</a>.</li>
                  </ul>
                </p>
              </section>

              {/* 11. Children’s Privacy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Children’s Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our Services are not intended for minors under 18 years. Parental supervision is strongly advised.
                </p>
              </section>

              {/* 12. Cookies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  EarnScop uses cookies to track User interactions and transactions for cashback or affiliate purposes. Users can disable cookies via browser settings but doing so may affect cashback eligibility.
                </p>
              </section>

              {/* 13. Affiliate Commission */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Affiliate Commission</h2>
                <p className="text-gray-600 leading-relaxed">
                  EarnScop acts as an intermediary between retailers and Users. Cashback or commissions are subject to confirmation by partner retailers and may be cancelled in cases like order returns or policy violations.
                </p>
              </section>

              {/* 14. Amendments */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Amendments</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy at any time. Significant changes will be communicated via email or Platform notifications.
                </p>
              </section>

              {/* 15. Contact */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Contact</h2>
                <p className="text-gray-600 leading-relaxed">
                  For privacy-related queries or grievances, contact:<br />
                  Data Protection Officer<br />
                  EarnScop Private Limited<br />
                  [Your Company Address]<br />
                  Email: <a href="mailto:support@earnscop.com" className="text-blue-600 hover:underline">support@earnscop.com</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;