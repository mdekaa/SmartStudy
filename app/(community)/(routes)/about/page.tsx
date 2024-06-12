"use client"

import React from 'react'
import LandingNavbar from '@/components/landing-navbar'
import AboutContent from '@/components/about-content'

const about = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <div className="text-white font-bold py-10 pt-10 text-center space-y-5 bg-gradient-to-r from-slate-600 to-slate-900">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1 >About Us</h1>

          <p className="text-lg">Welcome to SmartStudy, your trusted companion for academic success!</p>
          <p className="text-lg">
            At SmartStudy, we believe that every student deserves the best tools to achieve their academic goals. Our mission is to provide an intuitive and accurate platform that helps students project their CGPA (Cumulative Grade Point Average) and plan their academic journey with confidence.
          </p>
        </div>
      </div>

      <div className="text-white ">
        <AboutContent />

      </div>
      <div className="text-white font-bold py-36 pt-10 text-center space-y-5 bg-gradient-to-r from-slate-600 to-slate-900">

        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h2 className="text-center text-4xl text-white font-extrabold">
            Our Story
          </h2>
          <p className="text-lg">
            SmartStudy was founded by a group of passionate sudents and tech enthusiasts who recognized the need for a reliable and user-friendly tool to assist students in their academic journey. We combined our expertise in education, data analysis, and software development to create a platform that empowers students to make informed decisions about their studies.
          </p>
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h2 className="text-center text-4xl text-white font-extrabold">
            Join Our Community
          </h2>
          <p className="text-lg">
            Join thousands of students who are already using CGPA Predictor to enhance their academic performance. Whether you're aiming for the top of your class or just trying to stay on track, we're here to help you every step of the way.
          </p>
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h2 className="text-center text-4xl text-white font-extrabold">
            Contact Us
          </h2>
          <p className="text-lg">
            Have any questions or feedback? We'd love to hear from you! Reach out to us at support@smartstudy.com or follow us on social media for the latest updates and tips.
          </p>
        </div>
      </div>
    </div>
  )
}

export default about