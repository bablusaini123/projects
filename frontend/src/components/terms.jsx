import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-white font-['Outfit']">
            {/* Header */}


            {/* Main Content */}
            <main className="bg-gradient-to-br from-blue-50 to-red-50 py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-900">
                            Terms and Conditions
                        </h1>
                        <p className="text-gray-600 text-center mb-12">
                            Last updated: June 14, 2025
                        </p>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Welcome to SkillEarn. These Terms and Conditions govern your use of our website, courses, and referral system. By using our platform, you agree to all the terms described here. If you do not agree, please do not use the platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Responsibilities</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Users must provide accurate personal and payment details during registration. You are responsible for securing your account login details and ensuring no unauthorized person accesses your account.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Course Purchases</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All course purchases made on SkillEarn are final. Once purchased, no refund will be issued except in special cases where technical issues prevent course access. Cashback is processed as per the referral rules explained below.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Referral and Cashback Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    You can earn up to 80% cashback by referring others to buy courses from SkillEarn. The cashback rate is based on the course value: ₹1000 = 60%, ₹2000 = 65%, ₹5000 = 80%. Only direct referrals are rewarded. No cashback is given for second-level referrals. Cashback is processed only for valid and confirmed purchases, and any misuse or fake referrals will result in account suspension.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Earning Unlock Levels</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    When a user successfully refers 3 verified course purchases, a new level is unlocked and the user becomes eligible for special rewards, badges, or exclusive offers. SkillEarn may change or discontinue levels and rewards at its discretion.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    SkillEarn is not liable for indirect or incidental losses resulting from the use of our platform. We do not guarantee any income or results from referrals or course participation. Cashback and earnings depend entirely on user activity and validity.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Changes to Terms</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    SkillEarn reserves the right to update these Terms at any time. Updated terms will be posted here and your continued use of the platform implies your acceptance of the revised conditions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have any questions, feedback, or disputes regarding these Terms and Conditions, feel free to reach us at:<br />
                                    Email: support@skillearn.com<br />
                                    Phone: +91 98765 43210<br />
                                    Hours: Mon–Fri, 9AM to 6PM IST
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>



        </div>
    );
};

export default TermsAndConditions;