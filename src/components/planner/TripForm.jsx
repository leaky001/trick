import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import Card from '../common/Card';

const TripForm = ({ initialData = null, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    destination: initialData?.destination || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    budget: initialData?.budget || '',
    currency: initialData?.currency || 'USD',
    travelers: initialData?.travelers || 1,
    tripType: initialData?.tripType || 'leisure',
    notes: initialData?.notes || '',
    activities: initialData?.activities || []
  });

  const [newActivity, setNewActivity] = useState('');
  const [errors, setErrors] = useState({});

  const tripTypes = [
    { value: 'leisure', label: '🏖️ Leisure' },
    { value: 'business', label: '💼 Business' },
    { value: 'adventure', label: '🏔️ Adventure' },
    { value: 'cultural', label: '🏛️ Cultural' },
    { value: 'family', label: '👨‍👩‍👧‍👦 Family' },
    { value: 'romantic', label: '💕 Romantic' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (formData.budget && isNaN(parseFloat(formData.budget))) {
      newErrors.budget = 'Budget must be a valid number';
    }

    if (formData.travelers < 1) {
      newErrors.travelers = 'Number of travelers must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, { id: Date.now(), name: newActivity.trim() }]
      }));
      setNewActivity('');
    }
  };

  const handleRemoveActivity = (activityId) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== activityId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            {initialData ? 'Edit Trip' : 'Plan Your Trip'}
          </h2>
          <p className="text-gray-600">
            Fill in the details below to create your perfect travel itinerary
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className={`input-field ${errors.destination ? 'border-red-500' : ''}`}
                placeholder="Where are you going?"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
              )}
            </div>

            <div>
              <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-2">
                Trip Type
              </label>
              <select
                id="tripType"
                name="tripType"
                value={formData.tripType}
                onChange={handleInputChange}
                className="input-field"
              >
                {tripTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`input-field ${errors.startDate ? 'border-red-500' : ''}`}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`input-field ${errors.endDate ? 'border-red-500' : ''}`}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <div className="input-field bg-gray-50 text-gray-600">
                {calculateDuration() > 0 ? `${calculateDuration()} days` : 'Select dates'}
              </div>
            </div>
          </div>

          {/* Budget and Travelers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Budget (Optional)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`input-field ${errors.budget ? 'border-red-500' : ''}`}
                placeholder="0"
                min="0"
                step="0.01"
              />
              {errors.budget && (
                <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
              )}
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="input-field"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                className={`input-field ${errors.travelers ? 'border-red-500' : ''}`}
                min="1"
                max="20"
              />
              {errors.travelers && (
                <p className="mt-1 text-sm text-red-600">{errors.travelers}</p>
              )}
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activities & Interests
            </label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddActivity())}
                className="input-field flex-1"
                placeholder="Add an activity or interest..."
              />
              <Button
                type="button"
                onClick={handleAddActivity}
                variant="outline"
                disabled={!newActivity.trim()}
              >
                Add
              </Button>
            </div>
            
            {formData.activities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.activities.map((activity) => (
                  <motion.span
                    key={activity.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {activity.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveActivity(activity.id)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes & Special Requirements
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="input-field resize-none"
              placeholder="Any special requirements, preferences, or notes about your trip..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              loading={isLoading}
              className="flex-1 sm:flex-none"
            >
              {initialData ? 'Update Trip' : 'Create Trip'}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default TripForm;