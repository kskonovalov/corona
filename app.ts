// import express from "express";
// import config from "config";
// import path from "path";
// import cors from "cors";

const express = require('express');
const { Request: ExpressRequest, Response: ExpressResponse } = require('express');
const config = require('config');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// app.use(express.json({ extended: true }));cd

app.use('/api', require('./routes/api.routes'));

// Node to serve static files
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req: typeof ExpressRequest, res: typeof ExpressResponse) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.error('Server Error', e.message);
    process.exit(1);
  }
}

start();
