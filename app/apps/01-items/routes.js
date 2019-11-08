var express = require("express");
var router = express.Router();

const mongoose = require('mongoose');

// Connect to MongoDB
function connectDB() {
  console.log('connecting to mongodb...')
  mongoose
    .connect(
      'mongodb://mongo:27017/items', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => {
      dbConnected = true;
      console.log('MongoDB Connected')
    })
    .catch(err => console.log(err));
}

setTimeout(() => {
  console.log('Connect to MongoDB.');
  connectDB();
}, 3000);

const Item = require('./models/Item');

router.get('/test', (req, res) => {
  res.status(404).json({
    msg: 'No items found'
  })
});

router.get('/', (req, res) => {
  
  if (!dbConnected) {
    connectDB()
  }

  if (dbConnected) {
    Item.find()
      .then(items => res.render('index', {
        items
      }))
      .catch(err => res.status(404).json({
        msg: 'No items found'
      }));
  } else {
    res.status(500).json({
      msg: 'Database not ready.'
    })
  }

  // const items = [
  //   { name: "Orange" }
  // ];
  // res.render('index', {
  //   items
  // });
  // res.send("hi");
});

router.post('/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/item'));
});


console.log('items router.js done.')
module.exports = router;