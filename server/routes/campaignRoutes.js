const express = require('express');
const router = express.Router();
const Campaign = require('../models/campaign');
const User = require('../models/user'); // Assuming you have a User model

// GET all campaigns (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find({}).populate('templateId', 'name subject'); // Populate template info
    res.status(200).json({ success: true, campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET a single campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id).populate('templateId', 'name subject');
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.status(200).json({ success: true, campaign });
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST create a new campaign
router.post('/', async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    const savedCampaign = await newCampaign.save();
    res.status(201).json({ success: true, campaign: savedCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(400).json({ success: false, message: 'Failed to create campaign', error: error.message });
  }
});

// PUT update a campaign by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCampaign = await Campaign.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedCampaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.status(200).json({ success: true, campaign: updatedCampaign });
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(400).json({ success: false, message: 'Failed to update campaign', error: error.message });
  }
});

// DELETE a campaign by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCampaign = await Campaign.findByIdAndDelete(id);
    if (!deletedCampaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    res.status(200).json({ success: true, message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST to simulate sending a campaign and creating notifications
// This is a simplified example; a real-world email service would be more complex.
router.post('/:id/send', async (req, res) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    // Update campaign status and sent count
    campaign.status = 'active'; // Or 'completed' if it's a one-time send
    campaign.lastSentDate = new Date();

    // Determine target users
    let targetUsers = [];
    if (campaign.targetAudience === 'all_users') {
      targetUsers = await User.find({}, '_id'); // Fetch only IDs
    } else if (campaign.targetAudience === 'specific_users' && campaign.recipientUsers.length > 0) {
      targetUsers = campaign.recipientUsers;
    }
    // Add more complex targeting logic here if needed

    campaign.sentCount = (campaign.sentCount || 0) + targetUsers.length;
    await campaign.save();

    // Create notifications for each targeted user
    const notificationsToCreate = targetUsers.map(user => ({
      userId: user._id,
      type: 'info', // Default type, could be dynamic based on campaign content
      title: `Campaign: ${campaign.name}`,
      message: `You received a message from campaign "${campaign.name}"`, // Or link to template content
      category: 'general', // Default category
      sourceCampaign: campaign._id,
    }));

    // In a real app, you'd send actual emails here using an external service
    // For now, we'll just create Notification entries
    const Notification = require('../models/notification'); // Import here to avoid circular dependency issues if models reference each other heavily
    await Notification.insertMany(notificationsToCreate);

    res.status(200).json({ success: true, message: 'Campaign sent and notifications created', campaign });

  } catch (error) {
    console.error('Error sending campaign:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});


module.exports = router;
