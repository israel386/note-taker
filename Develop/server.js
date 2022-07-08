const fs = rewuire('fs');
const path = require('path');
const express = require('.express');
const dbJson = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app use(express.json());