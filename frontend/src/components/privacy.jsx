import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-white font-['Outfit']">
            {/* Header */}


            {/* Main Content */}
            <main className="bg-gradient-to-br from-blue-50 to-red-50 py-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-900">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 text-center mb-12">
                            Last updated: June 14, 2025
                        </p>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Welcome to SkillEarn. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you visit or make a purchase from our website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may collect personal information such as your name, email address, phone number, and payment details when you sign up, make a purchase, or refer others. We also collect device and usage data to improve your experience.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Data</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Your information is used to deliver course access, manage your referral earnings, process payments, improve platform performance, and provide customer support. We do not sell or rent your data to third parties.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Protection</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We implement industry-standard security measures to protect your data. While we take every step to ensure safety, no method of transmission or storage is 100% secure, so we encourage you to use strong passwords and protect your login credentials.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Referral and Cashback Privacy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Referral activity, earnings, and cashback details are only visible to the respective users. We do not share your referral performance with others, and your referral data is stored securely.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Cookies and Tracking</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We use cookies and similar technologies to enhance your browsing experience, track referral clicks, and analyze traffic. You can choose to disable cookies in your browser settings, but some site features may not function properly.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Refund Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    All course purchases on SkillEarn are digital and non-refundable. Once a course is purchased and accessed, refunds are not issued under normal circumstances. Refunds may be granted only in cases where technical issues prevent course access and our support team is unable to resolve the problem within 3 business days.
                                    <br /><br />
                                    If you feel you qualify for a refund, contact our support team with proof of the issue. Refunds are processed back to the original payment method within 5–7 business days if approved.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Updates to Policy</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised date. Continued use of SkillEarn after updates implies acceptance of the revised terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    If you have any questions or concerns regarding our privacy practices or refund policy, please reach out:<br />
                                    Email: support@skillearn.com<br />
                                    Phone: +91 98765 43210<br />
                                    Hours: Mon–Fri, 9AM–6PM IST
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