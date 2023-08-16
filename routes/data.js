const express = require('express');

const db = require('../models/mongodb/connection');

const route = express.Router();

route.get('/', async function (req, res) {
  let sortBy = req.query.sortBy || '';

  // const results = await User.findAll({ orderBy: sortBy });
  const Users = db.collection('users');
  const allUsers = await Users.find({}).toArray();
  console.log(allUsers);
  res.render('tableData', { data: allUsers });
});

route.get('/:user', async function (req, res) {
  const username = req.params.user;

  const Users = db.collection('users');
  const user = await Users.findOne({ fullname: username });

  res.render('singleUser', {
    _id: user._id,
    name: user.fullname,
    age: user.age,
  });
});

module.exports = {
  dataMiniApp: route,
};
