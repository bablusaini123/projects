import React from 'react'

export default function Footer() {
    return (

        <footer className = "bg-gray-900 text-white py-16" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-4">
                            EarnScop
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Learn new skills and earn money by sharing knowledge with others.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                                <span className="text-sm font-bold">f</span>
                            </div>
                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                                <span className="text-sm font-bold">t</span>
                            </div>
                            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-800 transition-colors">
                                <span className="text-sm font-bold">in</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Courses</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact</h4>
                        <div className="text-gray-400 space-y-2">
                            <p>support@skillearn.com</p>
                            <p>+91 98765 43210</p>
                            <p>Mon-Fri: 9AM-6PM IST</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 SkillEarn. All rights reserved.</p>
                </div>
            </div>
      </footer >
  )
}
