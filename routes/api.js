const express = require("express");

const router = express.Router();
const axios = require('axios');

const config = require("./../config/config")
const logs = require("../models/logs");
const { Client } = require('@elastic/elasticsearch');
const { v4: uuidv4 } = require('uuid');

// Create an Elasticsearch client instance
const elasticClient = new Client({ node: 'https://localhost:9200' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//Routes
router.get('/',(req,res)=>{
    res.json({message:"Server is connected!"});
})

router.get('/logs', async (req, res) => {
  try {
    const allLogs = await logs.findAll();

    res.json({ success: true, log: allLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/search-logs', async (req, res) => {
    try {
      const { q } = req.query;
  
      res.json(body.hits.hits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Log ingestion endpoint
router.post('/log', async (req, res) => {
  try {
    const logsData = req.body;
    console.log(logsData)
    const savedLogs = await Promise.all(logsData.map(async (logData) => {
      const savedLog = await logs.create({
        id: uuidv4(),
        level: logData.level,
        message: logData.message,
        resourceId: logData.resourceId,
        timestamp: logData.timestamp,
        traceId: logData.traceId,
        spanId: logData.spanId,
        commit: logData.commit,
        parentResourceId: logData.metadata?.parentResourceId || null,
      });
      return savedLog;
    }));

    res.json({ success: true, logs: savedLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;