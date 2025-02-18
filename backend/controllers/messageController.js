const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  try {
    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { recipient: req.user.id }],
    }).populate('sender', 'email').populate('recipient', 'email');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
