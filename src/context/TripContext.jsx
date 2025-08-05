import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getAllTrips,
  saveTrip as saveToStorage,
  deleteTrip as deleteFromStorage,
  getTripById,
  validateTrip,
  getPackingList,
  savePackingList,
  addPackingItem as addPackingItemToStorage,
  updatePackingItem as updatePackingItemInStorage,
  deletePackingItem as deletePackingItemFromStorage
} from '../utils/localStorage';


const TripContext = createContext();


const ACTIONS = {
  SET_TRIPS: 'SET_TRIPS',
  ADD_TRIP: 'ADD_TRIP',
  UPDATE_TRIP: 'UPDATE_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
  SET_CURRENT_TRIP: 'SET_CURRENT_TRIP',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_PACKING_LIST: 'SET_PACKING_LIST',
  UPDATE_PACKING_ITEM: 'UPDATE_PACKING_ITEM'
};


const initialState = {
  trips: [],
  currentTrip: null,
  packingLists: {},
  loading: false,
  error: null
};


const tripReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TRIPS:
      return {
        ...state,
        trips: action.payload,
        loading: false
      };
    
    case ACTIONS.ADD_TRIP:
      return {
        ...state,
        trips: [...state.trips, action.payload],
        loading: false
      };
    
    case ACTIONS.UPDATE_TRIP:
      return {
        ...state,
        trips: state.trips.map(trip =>
          trip.id === action.payload.id ? action.payload : trip
        ),
        currentTrip: state.currentTrip?.id === action.payload.id 
          ? action.payload 
          : state.currentTrip,
        loading: false
      };
    
    case ACTIONS.DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter(trip => trip.id !== action.payload),
        currentTrip: state.currentTrip?.id === action.payload ? null : state.currentTrip,
        loading: false
      };
    
    case ACTIONS.SET_CURRENT_TRIP:
      return {
        ...state,
        currentTrip: action.payload
      };
    
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case ACTIONS.SET_PACKING_LIST:
      return {
        ...state,
        packingLists: {
          ...state.packingLists,
          [action.payload.tripId]: action.payload.items
        }
      };
    
    case ACTIONS.UPDATE_PACKING_ITEM:
      const { tripId, itemId, updates } = action.payload;
      const currentItems = state.packingLists[tripId] || [];
      const updatedItems = currentItems.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      );
      
      return {
        ...state,
        packingLists: {
          ...state.packingLists,
          [tripId]: updatedItems
        }
      };
    
    default:
      return state;
  }
};

// Context Provider Component
export const TripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  
  useEffect(() => {
    try {
      const savedTrips = getAllTrips();
      dispatch({ type: ACTIONS.SET_TRIPS, payload: savedTrips });
    } catch (error) {
      console.error('Error loading trips:', error);
      toast.error('Failed to load trips');
    }
  }, []);

  // Action creators
  const actions = {
    // Trip actions
    createTrip: async (tripData) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        
        // Validate trip data
        validateTrip(tripData);
        
        // Save to localStorage
        const savedTrip = saveToStorage(tripData);
        
        if (savedTrip) {
          dispatch({ type: ACTIONS.ADD_TRIP, payload: savedTrip });
          toast.success('Trip created successfully!');
          return savedTrip;
        } else {
          throw new Error('Failed to save trip');
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        toast.error(error.message);
        throw error;
      }
    },

    updateTrip: async (tripId, updates) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        
        const existingTrip = getTripById(tripId);
        if (!existingTrip) {
          throw new Error('Trip not found');
        }
        
        const updatedTripData = { ...existingTrip, ...updates };
        validateTrip(updatedTripData);
        
        const savedTrip = saveToStorage(updatedTripData);
        
        if (savedTrip) {
          dispatch({ type: ACTIONS.UPDATE_TRIP, payload: savedTrip });
          toast.success('Trip updated successfully!');
          return savedTrip;
        } else {
          throw new Error('Failed to update trip');
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        toast.error(error.message);
        throw error;
      }
    },

    deleteTrip: async (tripId) => {
      try {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        
        const success = deleteFromStorage(tripId);
        
        if (success) {
          dispatch({ type: ACTIONS.DELETE_TRIP, payload: tripId });
          toast.success('Trip deleted successfully!');
        } else {
          throw new Error('Failed to delete trip');
        }
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
        toast.error(error.message);
        throw error;
      }
    },

    setCurrentTrip: (trip) => {
      dispatch({ type: ACTIONS.SET_CURRENT_TRIP, payload: trip });
    },

    getTripById: (tripId) => {
      return state.trips.find(trip => trip.id === tripId) || getTripById(tripId);
    },

    // Packing list actions
    loadPackingList: (tripId) => {
      try {
        const items = getPackingList(tripId);
        dispatch({ 
          type: ACTIONS.SET_PACKING_LIST, 
          payload: { tripId, items } 
        });
        return items;
      } catch (error) {
        toast.error('Failed to load packing list');
        return [];
      }
    },

    addPackingItem: async (tripId, item) => {
      try {
        const success = addPackingItemToStorage(tripId, item);
        
        if (success) {
          const updatedItems = getPackingList(tripId);
          dispatch({ 
            type: ACTIONS.SET_PACKING_LIST, 
            payload: { tripId, items: updatedItems } 
          });
          toast.success('Item added to packing list!');
        } else {
          throw new Error('Failed to add item');
        }
      } catch (error) {
        toast.error(error.message);
        throw error;
      }
    },

    updatePackingItem: async (tripId, itemId, updates) => {
      try {
        const success = updatePackingItemInStorage(tripId, itemId, updates);
        
        if (success) {
          dispatch({ 
            type: ACTIONS.UPDATE_PACKING_ITEM, 
            payload: { tripId, itemId, updates } 
          });
          
          // Don't show toast for simple checkbox toggles
          if (Object.keys(updates).length > 1 || !updates.hasOwnProperty('packed')) {
            toast.success('Item updated!');
          }
        } else {
          throw new Error('Failed to update item');
        }
      } catch (error) {
        toast.error(error.message);
        throw error;
      }
    },

    deletePackingItem: async (tripId, itemId) => {
      try {
        const success = deletePackingItemFromStorage(tripId, itemId);
        
        if (success) {
          const updatedItems = getPackingList(tripId);
          dispatch({ 
            type: ACTIONS.SET_PACKING_LIST, 
            payload: { tripId, items: updatedItems } 
          });
          toast.success('Item removed from packing list!');
        } else {
          throw new Error('Failed to delete item');
        }
      } catch (error) {
        toast.error(error.message);
        throw error;
      }
    },

    // Utility actions
    clearError: () => {
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
};

// Custom hook to use the TripContext
export const useTrips = () => {
  const context = useContext(TripContext);
  
  if (!context) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  
  return context;
};

export default TripContext;