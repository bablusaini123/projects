import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-['Outfit']">
      {/* Main Content */}
      <main className="bg-gradient-to-br from-blue-50 to-red-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-gray-900">
              About Us
            </h1>
            <p className="text-gray-600 text-center mb-12">
              Last updated: July 20, 2025
            </p>

            <div className="space-y-8">
              {/* 1. Who We Are */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to EarningPay, India’s No. 1 Learn & Earn course platform—launched in 2025 by Anirban Bhattacharjee, Bablu Saini, and Aman Gouri. In a world where digital capability defines opportunity, we exist to help people acquire market-ready skills and convert knowledge into income. We currently offer 100+ expert-crafted digital courses and have already crossed 1,000+ sales—an early validation of our learner-driven, affiliate-powered growth model.
                </p>
              </section>

              {/* 2. Our Mission */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Millions of people in India still struggle with limited job options or stagnant income. EarningPay’s mission is to unlock financial independence by making high-quality, actionable digital education accessible through a smartphone—and pairing it with an elevated affiliate earning structure (up to 80% commission on select courses).
                </p>
              </section>

              {/* 3. Our Philosophy */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Philosophy</h2>
                <ul className="list-disc pl-5 mt-2 text-gray-600 leading-relaxed">
                  <li><strong>Learn Deeply:</strong> Build durable, stackable skills.</li>
                  <li><strong>Earn Transparently:</strong> Clear dashboards & predictable payouts.</li>
                  <li><strong>Share Authentically:</strong> Recommend what you’ve actually used.</li>
                  <li><strong>Grow Collectively:</strong> Community uplift creates compounding impact.</li>
                </ul>
              </section>

              {/* 4. Our 2025 Journey (Foundation Phase) */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our 2025 Journey (Foundation Phase)</h2>
                <ul className="list-disc pl-5 mt-2 text-gray-600 leading-relaxed">
                  <li><strong>Launch:</strong> Rolled out a structured catalog of 100+ proprietary digital skill courses (technology, marketing, business, creative & automation).</li>
                  <li><strong>Early Traction:</strong> Surpassed 1,000 total course purchases—~200 direct platform sales plus the balance through emerging affiliate promoters.</li>
                  <li><strong>Model Validation:</strong> High share of organic referral conversions confirming trust + earning potential.</li>
                </ul>
              </section>

              {/* 5. Founding Team */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Founding Team</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Bablu Saini – Founder & CEO</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Operations & growth specialist with a passion for scaling communities and optimizing user experiences. Oversees platform operations, partner relations, and affiliate network expansion.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">Utkarsh Saini – Founder & CPO</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Product innovator focused on curriculum strategy and learning experience design. Drives the creation of engaging, practical courses that align with market demands and learner goals.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. How EarnScop Works */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">How EarningPay Works</h2>
                <ol className="list-decimal pl-5 mt-2 text-gray-600 leading-relaxed">
                  <li><strong>Discover & Learn:</strong> Browse courses across technology, marketing, business, creative, finance & productivity.</li>
                  <li><strong>Acquire Skills:</strong> Consume structured lessons, complete tasks, pass assessments.</li>
                  <li><strong>Activate Affiliate Access:</strong> After onboarding, get a unique referral link.</li>
                  <li><strong>Share Strategically:</strong> Promote through social media, micro-communities, blogs, YouTube, or messaging groups.</li>
                  <li><strong>Earn Commission:</strong> Receive up to 80% or a fixed referral payout (up to ₹2,800) based on course tier.</li>
                  <li><strong>Withdraw & Reinvest:</strong> Cash out earnings; reinvest in advanced learning paths.</li>
                </ol>
              </section>

              {/* 7. Who It’s For */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who It’s For</h2>
                <p className="text-gray-600 leading-relaxed">
                  Students • Professionals • Freelancers • Homemakers • Career Returnees • Side-Hustlers • Creators • Aspiring Entrepreneurs.
                </p>
              </section>

              {/* 8. What Makes Us Different */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Makes Us Different</h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="text-lg font-medium text-gray-700 border-b py-2">Pillar</th>
                      <th className="text-lg font-medium text-gray-700 border-b py-2">What It Means</th>
                      <th className="text-lg font-medium text-gray-700 border-b py-2">Your Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">Expert-Led Content</td>
                      <td className="text-gray-600 py-2 border-b">Practitioners, not generic narrations</td>
                      <td className="text-gray-600 py-2 border-b">Real-world relevance</td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">Modular Learning Paths</td>
                      <td className="text-gray-600 py-2 border-b">Stackable micro + master courses</td>
                      <td className="text-gray-600 py-2 border-b">Faster progression</td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">High Commission Structure</td>
                      <td className="text-gray-600 py-2 border-b">Up to 80% / ₹2,800 per sale</td>
                      <td className="text-gray-600 py-2 border-b">Meaningful payouts</td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">Early Mover Advantage</td>
                      <td className="text-gray-600 py-2 border-b">Affiliate pool still growing</td>
                      <td className="text-gray-600 py-2 border-b">Less competition now</td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">Data-Driven Feedback</td>
                      <td className="text-gray-600 py-2 border-b">Track progress & conversions</td>
                      <td className="text-gray-600 py-2 border-b">Optimize earnings</td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">Community & Mentorship</td>
                      <td className="text-gray-600 py-2 border-b">Peer support + live sessions</td>
                      <td className="text-gray-600 py-2 border-b">Motivation & clarity</td>
                    </tr>
                    <tr>
                      <td className="text-gray-600 py-2 border-b">Ethical Standards</td>
                      <td className="text-gray-600 py-2 border-b">No hype, only validated methods</td>
                      <td className="text-gray-600 py-2 border-b">Trust & longevity</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* 9. Our Commitment */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
                <p className="text-gray-600 leading-relaxed">
                  We continually refine content, integrate new tools, and listen to learner feedback. Our roadmap includes:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600 leading-relaxed">
                  <li>Advanced certification tracks</li>
                  <li>Creator monetization labs</li>
                  <li>AI-assisted learning recommendations</li>
                  <li>Leaderboards & gamified achievement badges</li>
                  <li>Marketplace for learner-generated mini-courses (curated)</li>
                </ul>
              </section>

              {/* 10. Start Your EarnScop Journey */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Start Your EarningPay Journey</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you want to build skills, create impact, and earn respectfully, you’re in the right place. Invest in a course today, activate your affiliate link, and help others access the same opportunity—while you grow.
                </p>
                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    Join EarningPay & Unlock Your Potential
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;