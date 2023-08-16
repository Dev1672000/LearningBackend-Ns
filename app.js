const express = require('express');

const { dataMiniApp } = require('./routes/data');
const { userRoutes } = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/data', dataMiniApp);

let PORT = 5345;
app.listen(PORT);
