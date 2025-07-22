/*
  Eric Brant
  MongoDB Project: Quote Keeper
  Description: Simple Node.js + MongoDB app to store, list, and delete inspirational quotes.
*/

// models/Quote.js
const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  text: String,
  author: String
});

module.exports = mongoose.model('Quote', QuoteSchema);

// routes/quotes.js (Express routes)
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

router.post('/', async (req, res) => {
  const quote = new Quote(req.body);
  await quote.save();
  res.send(quote);
});

router.get('/', async (req, res) => {
  const quotes = await Quote.find();
  res.send(quotes);
});

router.delete('/:id', async (req, res) => {
  await Quote.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted' });
});

module.exports = router;

// server.js (basic setup)
const express = require('express');
const mongoose = require('mongoose');
const quotesRoutes = require('./routes/quotes');

mongoose.con
