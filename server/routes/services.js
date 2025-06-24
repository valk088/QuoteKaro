const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.get('/:userId/services', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('services');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      services: user.services || [],
      message: 'Services fetched successfully.' 
    });

  } catch (error) {
    console.error('Error fetching user services:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

// POST - Add a new service for a user
router.post('/:userId/services', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, price } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Service name is required.' 
      });
    }

    if (price === undefined || price === null || price < 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid service price is required (must be non-negative).' 
      });
    }

    const newService = {
      name: name.trim(),
      price: parseFloat(price),
      createdAt: new Date()
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { services: newService } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    res.status(201).json({ 
      success: true, 
      message: 'Service added successfully.',
      service: newService,
      services: updatedUser.services 
    });

  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

// PUT - Update a specific service
router.put('/:userId/services/:serviceId', async (req, res) => {
  try {
    const { userId, serviceId } = req.params;
    const { name, price } = req.body;

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Service name is required.' 
      });
    }

    if (price === undefined || price === null || price < 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Valid service price is required (must be non-negative).' 
      });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'services._id': serviceId },
      { 
        $set: { 
          'services.$.name': name.trim(),
          'services.$.price': parseFloat(price),
          'services.$.updatedAt': new Date()
        } 
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User or service not found.' 
      });
    }

    const updatedService = updatedUser.services.id(serviceId);

    res.status(200).json({ 
      success: true, 
      message: 'Service updated successfully.',
      service: updatedService,
      services: updatedUser.services 
    });

  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

// DELETE - Remove a specific service
router.delete('/:userId/services/:serviceId', async (req, res) => {
  try {
    const { userId, serviceId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { services: { _id: serviceId } } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Service deleted successfully.',
      services: updatedUser.services 
    });

  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

// PUT - Update all services at once (bulk update)
router.put('/:userId/services', async (req, res) => {
  try {
    const { userId } = req.params;
    const { services } = req.body;

    // Validate services array
    if (!Array.isArray(services)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Services must be an array.' 
      });
    }

    // Validate each service
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      if (!service.name || !service.name.trim()) {
        return res.status(400).json({ 
          success: false, 
          message: `Service at index ${i} must have a name.` 
        });
      }
      if (service.price === undefined || service.price === null || service.price < 0) {
        return res.status(400).json({ 
          success: false, 
          message: `Service at index ${i} must have a valid price (non-negative).` 
        });
      }
    }

    // Clean and format services
    const cleanedServices = services.map(service => ({
      name: service.name.trim(),
      price: parseFloat(service.price),
      createdAt: service.createdAt || new Date(),
      updatedAt: new Date()
    }));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { services: cleanedServices } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Services updated successfully.',
      services: updatedUser.services 
    });

  } catch (error) {
    console.error('Error updating services:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
});

module.exports = router;