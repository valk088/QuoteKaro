const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const User = require('../models/user');
const mongoose = require('mongoose'); // Import mongoose to use isValidObjectId

// GET all notifications (for admin dashboard, general overview)
// This route does NOT take a userId parameter.
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching all notifications for admin:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET notifications for a specific user (for client panel or user-specific admin view)
// /api/notifications/user/:userId
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // FIX: Add validation for userId to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid User ID format. Must be a valid ObjectId.' });
    }

    // Check if the user exists (optional, but good for validation)
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }); // Newest first
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST create a new notification (e.g., triggered by system events, or admin manually)
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json({ success: true, notification: savedNotification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(400).json({ success: false, message: 'Failed to create notification', error: error.message });
  }
});

// PATCH update notification status (read/unread)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedNotification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, notification: updatedNotification });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(400).json({ success: false, message: 'Failed to update notification', error: error.message });
  }
});

// DELETE a single notification
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST bulk update notifications (e.g., mark all as read)
router.post('/bulk-update', async (req, res) => {
  try {
    const { ids, updateFields } = req.body;

    if (!Array.isArray(ids) || !ids.length || !updateFields) {
      return res.status(400).json({ success: false, message: 'Invalid bulk update request' });
    }

    const result = await Notification.updateMany({ _id: { $in: ids } }, { $set: updateFields });
    res.status(200).json({ success: true, message: 'Notifications updated successfully', result });
  } catch (error) {
    console.error('Error performing bulk update:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST bulk delete notifications
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ success: false, message: 'Invalid bulk delete request' });
    }

    const result = await Notification.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: 'Notifications deleted successfully', result });
  } catch (error) {
    console.error('Error performing bulk delete:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
