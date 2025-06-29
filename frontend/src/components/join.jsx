import { CheckCircle } from 'lucide-react'
import React from 'react'

export default function Join() {
  return (
    <div>  <section className="py-10 bg-gradient-to-r from-blue-600 to-red-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of successful learners and start earning today!
                    </p>
                    <button className="bg-white text-blue-600 px-12 py-4 rounded-lg text-xl font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                        Join SkillEarn Now
                    </button>
                    <div className="mt-8 flex items-center justify-center space-x-8 text-sm">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>No Setup Fee</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>Instant Access</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5" />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </section></div>
  )
}
