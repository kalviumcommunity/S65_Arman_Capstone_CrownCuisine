import Reservation from '../models/Reservation.js';
import Restaurant from '../models/Restaurant.js';

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const { restaurantId, date, time, partySize, tableNumber, specialRequests } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Check if table exists
    const table = restaurant.tables.find(t => t.tableNumber === parseInt(tableNumber));
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    // Check if table is already reserved for this time
    const existingReservation = await Reservation.findOne({
      restaurant: restaurantId,
      date: new Date(date),
      time,
      tableNumber,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'Table is already reserved for this time' });
    }

    // Create reservation
    const reservation = await Reservation.create({
      user: req.user._id,
      restaurant: restaurantId,
      date: new Date(date),
      time,
      partySize,
      tableNumber,
      specialRequests,
      status: 'pending'
    });

    // Mark table as reserved
    table.isReserved = true;
    await restaurant.save();

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Create reservation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations for a user
export const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate('restaurant', 'name location images')
      .sort({ date: 1, time: 1 });

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Get user reservations error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations for a restaurant
export const getRestaurantReservations = async (req, res) => {
  try {
    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Get query parameters
    const { date, status } = req.query;
    
    // Build filter
    const filter = { restaurant: restaurant._id };
    if (date) filter.date = new Date(date);
    if (status) filter.status = status;

    const reservations = await Reservation.find(filter)
      .populate('user', 'name phoneNumber')
      .sort({ date: 1, time: 1 });

    res.status(200).json(reservations);
  } catch (error) {
    console.error('Get restaurant reservations error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update reservation status
export const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'confirmed', 'canceled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Find manager's restaurant
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find reservation
    const reservation = await Reservation.findOne({
      _id: id,
      restaurant: restaurant._id
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update status
    reservation.status = status;
    await reservation.save();

    // If canceled or completed, free up the table
    if (['canceled', 'completed'].includes(status)) {
      const table = restaurant.tables.find(t => t.tableNumber === reservation.tableNumber);
      if (table) {
        table.isReserved = false;
        await restaurant.save();
      }
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error('Update reservation status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel a reservation (for customer)
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find reservation
    const reservation = await Reservation.findOne({
      _id: id,
      user: req.user._id
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if reservation can be canceled
    if (['canceled', 'completed'].includes(reservation.status)) {
      return res.status(400).json({ 
        message: `Reservation already ${reservation.status}` 
      });
    }

    // Update status
    reservation.status = 'canceled';
    await reservation.save();

    // Free up the table
    const restaurant = await Restaurant.findById(reservation.restaurant);
    if (restaurant) {
      const table = restaurant.tables.find(t => t.tableNumber === reservation.tableNumber);
      if (table) {
        table.isReserved = false;
        await restaurant.save();
      }
    }

    res.status(200).json({ message: 'Reservation canceled', reservation });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get available tables for a restaurant on a specific date and time
export const getAvailableTables = async (req, res) => {
  try {
    const { restaurantId, date, time } = req.query;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Find reserved tables
    const reservedTables = await Reservation.find({
      restaurant: restaurantId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    }).select('tableNumber');

    // Get array of reserved table numbers
    const reservedTableNumbers = reservedTables.map(r => r.tableNumber);

    // Filter available tables
    const availableTables = restaurant.tables.filter(
      table => !reservedTableNumbers.includes(table.tableNumber)
    );

    res.status(200).json(availableTables);
  } catch (error) {
    console.error('Get available tables error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get reservation details
export const getReservationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find reservation
    const reservation = await Reservation.findById(id)
      .populate('restaurant', 'name location images openingHours')
      .populate('user', 'name phoneNumber');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if user is authorized to view this reservation
    if (
      reservation.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'manager'
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error('Get reservation details error:', error);
    res.status(500).json({ message: error.message });
  }
}; 