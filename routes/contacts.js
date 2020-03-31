const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route GET api/contacts
// @desc Get all contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', msg: 'Internal server error' });
  }
});

// @route POST api/contacts
// @desc Add new contact
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        type,
        phone,
        user: req.user.id
      });
      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
);

// @route PUT api/contacts/:id
// @desc Update
// @access Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //
  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (email) contactFields.email = email;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ status: 'error', msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ status: 'error', msg: 'Unauthorized request' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json({ status: 'success', contact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// @route DELETE api/contacts/:id
// @desc Delete a contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      res.status(404).json({ status: 'error', msg: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user.id) {
      res.status(401).json({ status: 'error', msg: 'Unauthorized request' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ status: 'success', msg: 'Contact removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
