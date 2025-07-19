
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Questions = () => {
  return (
    <div className="min-h-screen bg-white font-['Outfit']">
      {/* Main Content */}
      <main className="bg-gradient-to-br from-blue-50 to-red-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl lg_badword_text-4xl font-bold text-center mb-8 text-gray-900">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Last updated: July 20, 2025
            </p>

            <div className="space-y-8">
              {/* 1. Getting Started */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Getting Started</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q1. How do I start learning & earning on EarnScop?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Click “Join Free” and create your account with your name, email, mobile number, and a secure password. Browse courses, enroll in at least one to understand the platform, then activate your Affiliate / Referral Dashboard to start sharing your unique referral links. When someone buys a course using your link, you earn a commission.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q2. Do I have to purchase a course to become an affiliate?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We recommend enrolling in at least one course so you can promote authentically. Some higher-tier commissions may unlock only after your first purchase or verification step.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q3. What devices can I use?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Any modern smartphone, tablet, or desktop with an updated browser. A stable internet connection is recommended for HD video streaming.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Commissions & Earnings */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Commissions & Earnings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q4. How much can I earn per referral?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      You can earn up to ₹2,800 per successful referral or up to 80% commission on eligible course tiers (whichever applies). Actual commission depends on course category, pricing tier, active promos, and your affiliate level.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q5. What is the difference between “Pending” and “Confirmed” commission?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Pending means a sale happened through your referral link but is within the refund/dispute window or still under validation. Confirmed means the order is final (no refund/cancellation) and is now withdrawable.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q6. How long does it take for commission to move from Pending to Confirmed?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Typical confirmation timelines range 7–45 days (longer if extended refund guarantees, bundles, or EMI payments are involved). High-ticket or partner-verified courses may take up to 60 days. Always check the Commission Status column in your dashboard.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q7. Is there an earning limit?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      No formal cap. However, anti-fraud systems may temporarily review unusually high spikes. Maintain genuine traffic sources and accurate disclosures.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. Payments & Withdrawals */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Payments & Withdrawals</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q8. What is the minimum withdrawal amount?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Currently ₹100 Confirmed Commission. Lower thresholds improve user motivation but increase payout frequency—balance operational cost vs. user experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q9. How do I request a payout?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Go to Dashboard → Wallet / Earnings → Request Withdrawal. Enter/confirm bank or UPI details and submit. You’ll receive an email/SMS acknowledgment.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q10. Which payout methods are supported?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Bank Transfer (NEFT/IMPS), UPI, and (optionally) Paytm Wallet if enabled. Add or verify your preferred method under Profile → Payout Settings.
                    </p>
81                    </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q11. How often are payouts processed?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Standard schedule: 3 processing batches per week (e.g., Mon / Wed / Fri) or within 2–4 business days of request. National holidays and banking downtimes may shift this slightly.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q12. Are there any payout fees?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Generally no fees for standard bank/UPI withdrawals above the minimum threshold. Micro-withdrawals below ₹100 (if allowed) or urgent/manual payouts may incur a nominal processing fee.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q13. Do I need a bank account?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Yes, for NEFT/IMPS. For UPI you just need a verified UPI ID linked to an Indian bank account. Ensure the account holder name matches your KYC details.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q14. Will tax (TDS/GST) be deducted?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      If legally required, TDS may be deducted on commissions once thresholds under Indian tax law are crossed. Provide your PAN to avoid higher default withholding. We supply payout statements you can share with your tax advisor. (This is general info, not tax advice.)
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Courses & Access */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Courses & Access</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q15. What kinds of courses does EarnScop offer?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Digital Marketing, SEO, Copywriting, Social Media Growth, Performance Ads, Technology (Web Dev, Automation, WordPress), Cybersecurity Basics, Business Growth, Design, Finance Literacy, AI Tools Productivity, Creator Monetization & more—expanding monthly.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q16. Are courses updated?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Yes. Major updates (e.g., algorithm shifts, new tool interfaces) are rolled out as v2 / v3 modules. You retain access to updates for the stated access period (lifetime or term-based). Release notes appear inside each course.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q17. Do you provide certificates?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Selected courses include EarnScop Certificates after you complete mandatory modules and pass quizzes/projects. These are shareable on LinkedIn or resumes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q18. Can I download content?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Downloadable assets (worksheets, templates, code, checklists) are provided. Streaming video is typically not downloadable to protect creator IP.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Affiliate Links & Tracking */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Affiliate Links & Tracking</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q19. How do I create a referral link?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Inside the dashboard: open a course → click “Generate Referral Link” (or Copy Link). The system appends your unique affiliate ID parameters.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q20. Where should I share my links?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      WhatsApp groups, Telegram channels, Instagram (bio / stories), YouTube descriptions, blogs, newsletters, Facebook groups, LinkedIn posts, Quora answers (value first, then link), and niche communities. Always add a brief value statement before dropping a link.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q21. Why is my referral not tracking?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Common causes: (1) User already had another affiliate cookie. (2) User switched devices / browsers. (3) Incognito mode blocking cookies. (4) Link modified or truncated by a platform. (5) Ad blocker / tracking prevention. (6) Expired cookie window. Provide clean links and encourage immediate enrollment after click.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q22. What is the cookie / attribution window?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Default attribution window: 30 days. If the same user clicks another affiliate’s link later, the last valid click usually gets credit (last-click model unless you implement first-click or hybrid).
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Policy & Compliance */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Policy & Compliance</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q23. Can I run paid ads with my affiliate links?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Allowed only if you follow brand bidding rules. No direct trademark bidding (e.g., bidding on “EarnScop official”) unless explicitly permitted. Cloaking, misleading claims, and spam traffic are prohibited.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q24. Are there content restrictions?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Do not: (a) promise guaranteed income, (b) use fake scarcity, (c) misrepresent course outcomes, (d) plagiarize materials. Violations may result in commission reversal or account suspension.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q25. Can I create coupon or review sites?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Yes, provided reviews are honest and you disclose your affiliate relationship. Fabricated testimonials are not allowed.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q26. Is multi-accounting allowed?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Strictly no. One individual = one account. Detected duplicates may be merged or suspended pending verification.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Support & Account */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Support & Account</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q27. How do I contact support?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Use Support → Create Ticket inside the dashboard or email <a href="mailto:support@earnscop.com" className="text-blue-600 hover:underline">support@earnscop.com</a>. Response target: within 24–48 business hours (Mon–Fri, 10:00–18:00 IST). Priority tickets (payment / access issues) are reviewed faster.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q28. How do I reset my password?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Click “Forgot Password” on login page → enter registered email → follow secure reset link. For security, links expire in 30 minutes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q29. How do I update my bank / UPI details?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Navigate to Profile → Payout Settings. Changes may lock withdrawals for up to 24 hours while we verify ownership to prevent fraud.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. Refunds & Cancellations */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Refunds & Cancellations</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q30. What is your course refund policy?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      7-day conditional refund if under 25% of core content is consumed and actionable reason provided (e.g., duplicate purchase, mismatch of advertised syllabus). Abusive refund patterns can void future affiliate eligibility.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q31. What happens to commission if a course is refunded?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      The related commission stays in Pending until the refund window closes. Refunded or chargebacked orders are voided and no commission is paid.
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Advanced / Growth */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Advanced / Growth</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q32. How do I increase my commission rate?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Hit performance tiers (e.g., 10 sales / month, 30 sales / quarter, or maintain low refund %). Higher tiers unlock boosted % or fixed ₹ bonuses, early access launches & private promos.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q33. Can I build a team or sub-affiliates?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      If you enable a 2-Tier Program, you can earn an override (e.g., 5%) on direct sub-affiliate sales. Make sure to monitor compliance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q34. Do you provide promotional creatives?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Yes—approved banners, social tiles, short form video hooks, and email copy blocks under Resources → Media Kit. Always avoid editing compliance disclaimers.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q35. Do you support API access for advanced affiliates?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Planned. An affiliate API (JSON endpoints for stats, clicks, conversions) is on the roadmap. Beta access may require minimum monthly sales volume.
                    </p>
                  </div>
                </div>
              </section>

              {/* 10. Legal & Transparency */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Legal & Transparency</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q36. Are earnings guaranteed?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      No. Earnings depend on the quality of your traffic, relevance, conversion strategy, and consistency. We discourage unrealistic promises.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q37. What disclosures should I add when promoting?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Include a simple statement like: “I may earn a commission if you purchase through my EarnScop link at no extra cost to you.” This builds trust and aligns with emerging transparency standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q38. How is my data protected?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We use encrypted connections (HTTPS), hashed passwords, role-based access control, and routine audits. Sensitive payout data is stored with compliant payment partners.
                    </p>
                  </div>
                </div>
              </section>

              {/* 11. Troubleshooting */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Troubleshooting</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q39. Videos not loading—what can I do?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Refresh, clear cache, try an alternate browser, disable aggressive ad/script blockers. If unresolved, capture a console screenshot and open a support ticket.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Q40. Dashboard stats not updating?</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Stats sync in near real-time; some metrics batch refresh every 15–60 minutes. If 24 hours delay, contact support.
                    </p>
                  </div>
                </div>
              </section>

              {/* 12. Quick Glossary */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Quick Glossary</h2>
                <div className="space-y-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="text-lg font-medium text-gray-700 border-b py-2">Term</th>
                        <th className="text-lg font-medium text-gray-700 border-b py-2">Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-gray-600 py-2 border-b">Pending Commission</td>
                        <td className="text-gray-600 py-2 border-b">Sale tracked; still within validation/refund window</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 py-2 border-b">Confirmed Commission</td>
                        <td className="text-gray-600 py-2 border-b">Finalized earnings – eligible for withdrawal</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 py-2 border-b">Attribution Window</td>
                        <td className="text-gray-600 py-2 border-b">Time period during which a click can generate credit (e.g., 30 days)</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 py-2 border-b">EPC</td>
                        <td className="text-gray-600 py-2 border-b">Earnings Per Click – performance quality indicator</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 py-2 border-b">Conversion Rate</td>
                        <td className="text-gray-600 py-2 border-b">Percentage of clicks turning into purchases</td>
                      </tr>
                      <tr>
                        <td className="text-gray-600 py-2 border-b">Tier Level</td>
                        <td className="text-gray-600 py-2 border-b">Your affiliate performance bracket unlocking benefits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 13. Need More Help */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Need More Help?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Couldn’t find your answer? Reach out via <a href="mailto:support@earnscop.com" className="text-blue-600 hover:underline">support@earnscop.com</a> or open a live ticket inside the dashboard. We’re here to help you learn better and earn smarter.
                </p>
              </section>

              {/* 14. Disclaimer */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Disclaimer</h2>
                <p className="text-gray-600 leading-relaxed">
                  All timelines, thresholds, and commission figures are subject to change. Always refer to your real-time dashboard & official policy pages for the most current terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Questions;