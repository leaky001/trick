import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Packing = () => {
  const { tripId } = useParams();

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
            <span className="gradient-text">Packing List</span>
          </h1>
          <p className="text-xl text-gray-600">
            Coming soon! Organize what to pack for your trip.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8 text-center">
            <div className="text-6xl mb-6">🎒</div>
            <h2 className="text-2xl font-bold mb-4">Packing Checklist</h2>
            <p className="text-gray-600 mb-6">
              This page will show your customizable packing checklist with categories 
              and the ability to check off items as you pack for trip ID: {tripId}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/trips">
                <Button className="w-full sm:w-auto">
                  View All Trips
                </Button>
              </Link>
              <Link to="/planner">
                <Button variant="outline" className="w-full sm:w-auto">
                  Plan New Trip
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Packing;