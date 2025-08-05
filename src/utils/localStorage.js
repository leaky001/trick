// localStorage utility functions for GlobeTrekker

const STORAGE_KEYS = {
  TRIPS: 'globetrekker_trips',
  PACKING_LISTS: 'globetrekker_packing_lists',
  USER_PREFERENCES: 'globetrekker_preferences'
};

// Generic localStorage functions
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key: ${key}`, error);
    return defaultValue;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage for key: ${key}`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage for key: ${key}`, error);
    return false;
  }
};

// Trip-specific functions
export const getAllTrips = () => {
  return getFromStorage(STORAGE_KEYS.TRIPS, []);
};

export const saveTrip = (trip) => {
  const trips = getAllTrips();
  const tripWithId = {
    ...trip,
    id: trip.id || generateId(),
    createdAt: trip.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const existingIndex = trips.findIndex(t => t.id === tripWithId.id);
  
  if (existingIndex >= 0) {
    trips[existingIndex] = tripWithId;
  } else {
    trips.push(tripWithId);
  }
  
  return saveToStorage(STORAGE_KEYS.TRIPS, trips) ? tripWithId : null;
};

export const getTripById = (id) => {
  const trips = getAllTrips();
  return trips.find(trip => trip.id === id) || null;
};

export const deleteTrip = (id) => {
  const trips = getAllTrips();
  const updatedTrips = trips.filter(trip => trip.id !== id);
  return saveToStorage(STORAGE_KEYS.TRIPS, updatedTrips);
};

// Packing list functions
export const getPackingList = (tripId) => {
  const packingLists = getFromStorage(STORAGE_KEYS.PACKING_LISTS, {});
  return packingLists[tripId] || [];
};

export const savePackingList = (tripId, items) => {
  const packingLists = getFromStorage(STORAGE_KEYS.PACKING_LISTS, {});
  packingLists[tripId] = items.map(item => ({
    ...item,
    id: item.id || generateId(),
    updatedAt: new Date().toISOString()
  }));
  
  return saveToStorage(STORAGE_KEYS.PACKING_LISTS, packingLists);
};

export const addPackingItem = (tripId, item) => {
  const currentItems = getPackingList(tripId);
  const newItem = {
    ...item,
    id: generateId(),
    packed: false,
    createdAt: new Date().toISOString()
  };
  
  return savePackingList(tripId, [...currentItems, newItem]);
};

export const updatePackingItem = (tripId, itemId, updates) => {
  const currentItems = getPackingList(tripId);
  const updatedItems = currentItems.map(item => 
    item.id === itemId 
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );
  
  return savePackingList(tripId, updatedItems);
};

export const deletePackingItem = (tripId, itemId) => {
  const currentItems = getPackingList(tripId);
  const updatedItems = currentItems.filter(item => item.id !== itemId);
  
  return savePackingList(tripId, updatedItems);
};

// User preferences
export const getUserPreferences = () => {
  return getFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    defaultCurrency: 'USD',
    defaultTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    notifications: true
  });
};

export const saveUserPreferences = (preferences) => {
  const currentPrefs = getUserPreferences();
  const updatedPrefs = { ...currentPrefs, ...preferences };
  return saveToStorage(STORAGE_KEYS.USER_PREFERENCES, updatedPrefs);
};

// Utility function to generate unique IDs
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Data validation functions
export const validateTrip = (trip) => {
  const required = ['destination', 'startDate', 'endDate'];
  const missing = required.filter(field => !trip[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  
  if (startDate >= endDate) {
    throw new Error('End date must be after start date');
  }
  
  return true;
};

// Export storage keys for use in other components
export { STORAGE_KEYS };