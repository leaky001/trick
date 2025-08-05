import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const SavedTrips = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Trips</span>
          </h1>
          <p className="text-xl text-gray-600">
            Coming soon! View and manage all your saved trips.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 text-center">
            <div className="text-6xl mb-6">🗂️</div>
            <h2 className="text-2xl font-bold mb-4">Saved Trips</h2>
            <p className="text-gray-600 mb-6">
              This page will display all your saved trips in a beautiful grid layout 
              with options to view, edit, or delete each trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planner">
                <Button className="w-full sm:w-auto">
                  Plan New Trip
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  Go Home
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SavedTrips;