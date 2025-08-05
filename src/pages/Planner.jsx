import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTrips } from '../context/TripContext';
import TripForm from '../components/planner/TripForm';

const Planner = () => {
  const navigate = useNavigate();
  const { createTrip, loading } = useTrips();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTrip = async (tripData) => {
    try {
      setIsSubmitting(true);
      const newTrip = await createTrip(tripData);
      
      if (newTrip) {
        // Navigate to the itinerary page for the new trip
        navigate(`/itinerary/${newTrip.id}`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Plan Your Perfect Trip</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a detailed itinerary for your next adventure. Add destinations, 
            activities, and all the important details to make your trip unforgettable.
          </p>
        </motion.div>

        {/* Trip Form */}
        <TripForm
          onSubmit={handleCreateTrip}
          onCancel={handleCancel}
          isLoading={isSubmitting || loading}
        />

        {/* Tips Section */}
        <motion.div
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center gradient-text">
              💡 Planning Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Plan Ahead</h4>
                    <p className="text-gray-600 text-sm">
                      Book flights and accommodations early for better prices and availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Set Priorities</h4>
                    <p className="text-gray-600 text-sm">
                      List your must-see attractions and experiences to make the most of your time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Budget Wisely</h4>
                    <p className="text-gray-600 text-sm">
                      Include a buffer for unexpected expenses and local experiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Stay Flexible</h4>
                    <p className="text-gray-600 text-sm">
                      Leave room for spontaneous discoveries and local recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Planner;