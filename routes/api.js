const express = require("express");

const router = express.Router();

const CartItems = require("../models/logs")

//Routes
router.get('/something',(req,res)=>{
    res.json({message:"something"});
})

// Search logs endpoint
app.get('/search-logs', async (req, res) => {
    try {
      const { q } = req.query;
  
      // Elasticsearch search query
      const { body } = await elasticClient.search({
        index: 'your_index_name',
        body: {
          query: {
            multi_match: {
              query: q,
              fields: ['level', 'message', 'resourceId', 'traceId', 'spanId', 'commit', 'parentResourceId'],
            },
          },
        },
      });
  
      res.json(body.hits.hits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

// Log ingestion endpoint
app.post('/log', async (req, res) => {
    try {
      const { body } = req;
  
      // Save log to SQL database
      const savedLog = await Log.create({
        level: body.level,
        message: body.message,
        resourceId: body.resourceId,
        timestamp: body.timestamp,
        traceId: body.traceId,
        spanId: body.spanId,
        commit: body.commit,
        parentResourceId: body.metadata?.parentResourceId || null,
      });
  
      // Index log in Elasticsearch
      await elasticClient.index({
        index: 'your_index_name',
        body: savedLog.toJSON(),
      });
  
      res.json({ success: true, log: savedLog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;