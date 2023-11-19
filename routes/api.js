const express = require("express");

const router = express.Router();

const config = require("./../config/config")
const Log = require("../models/logs");
const { v4: uuidv4 } = require('uuid');

//Routes
router.get('/',(req,res)=>{
    res.json({message:"Server is connected!"});
})

router.get('/logs', async (req, res) => {
  Log.find({ })
  .then((data) => {
      res.json(data);
  })
  .catch((error) => {
      console.log("error: ", error);
  })
});

router.get('/search', async (req, res) => {
  try {
    let key = req.query.key;
    const keyword = req.query.keyword;

    const query = {};
    query[key] = new RegExp(keyword, 'i');

    const logs = await Log.find(query);

    res.json({ success: true, logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/save', (req, res) => {
  const dataList = req.body;

  // Check if req.body is an array
  if (!Array.isArray(dataList)) {
    return res.status(400).json({
      msg: 'Invalid request body. It should be an array of objects.'
    });
  }

  for (const data of dataList) {
    if (typeof data !== 'object' || data === null) {
      return res.status(400).json({
        msg: 'Invalid element in the array. Each element should be an object.'
      });
    }
  }

  const savePromises = dataList.map(data => {
    const logger = new Log(data);
    return new Promise((resolve, reject) => {
      logger.save((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  });

  Promise.all(savePromises)
    .then(() => {
      res.json({
        msg: 'Successfully saved all data!'
      });
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.status(500).json({
        msg: 'Sorry, Internal Server error'
      });
    });
});

module.exports = router;