import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-8xl mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            🧭
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Oops! You seem to be lost
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back on track to plan your next adventure!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                Go Home
              </Button>
            </Link>
            <Link to="/planner">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Start Planning
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;