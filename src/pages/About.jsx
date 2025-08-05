import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About GlobeTrekker</span>
          </h1>
          <p className="text-xl text-gray-600">
            Your companion for planning unforgettable adventures
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              GlobeTrekker was created to make travel planning simple, organized, and enjoyable. 
              We believe that the excitement of travel should start from the moment you begin planning, 
              not just when you arrive at your destination.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our tool helps you create detailed itineraries, manage packing lists, and keep all 
              your travel information in one beautiful, easy-to-use interface. Best of all, 
              everything is stored locally on your device, so your data stays private and 
              accessible even when you're offline.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2">🎯</span>
                Simple & Intuitive
              </h3>
              <p className="text-gray-600">
                Clean, modern interface that makes trip planning a breeze. 
                No complicated features or overwhelming options.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2">🔒</span>
                Private & Secure
              </h3>
              <p className="text-gray-600">
                Your travel plans stay on your device. No accounts, no servers, 
                no data collection. Complete privacy guaranteed.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2">📱</span>
                Works Everywhere
              </h3>
              <p className="text-gray-600">
                Responsive design that works perfectly on desktop, tablet, 
                and mobile. Plan at home, access on the go.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <span className="mr-2">💝</span>
                Free Forever
              </h3>
              <p className="text-gray-600">
                No subscriptions, no premium features, no hidden costs. 
                GlobeTrekker is completely free to use, always.
              </p>
            </Card>
          </div>

          <Card className="p-8 text-center bg-gradient-to-r from-primary-50 to-secondary-50">
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of travelers who trust GlobeTrekker to plan their perfect trips.
            </p>
            <div className="text-4xl">✈️ 🌍 🎒</div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;