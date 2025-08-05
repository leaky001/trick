import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/common/Card';

const Settings = () => {
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
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-xl text-gray-600">
            Coming soon! Customize your GlobeTrekker experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 text-center">
            <div className="text-6xl mb-6">⚙️</div>
            <h2 className="text-2xl font-bold mb-4">App Settings</h2>
            <p className="text-gray-600 mb-6">
              This page will include options for default currency, time zone preferences, 
              data export/import, and other customization options.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;