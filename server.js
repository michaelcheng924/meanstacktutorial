// MEAN Stack RESTful API Tutorial - Contact List App

/**
 * Fast, unopinionated, minimalist web framework
 */
var express = require('express');
var app = express();

/**
 * Module to implement mongodb API
 */
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

/**
 * Parse incoming request bodies
 * @type {Parsers}
 */
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); // Add static directory
app.use(bodyParser.json());

/**
 * GET Method to retrieve all the contacts
 */
app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    // console.log(docs);
    res.json(docs);
  });
});

/**
 * POST Method to update a contact
 */
app.post('/contactlist', function (req, res) {
  // console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

/**
 * POST Method to delete a contact
 */
app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  // console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

/**
 * POST Method to retrieve a contact
 */
app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  // console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

/**
 * POST Method to update a contact
 */
app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  // console.log(req.body.name);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
// console.log("Server running on port 3000");