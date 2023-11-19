const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  // _id: String, 
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    default: 'unknown',
  },
  timestamp: {
    type: String,
    default: Date.now().toString(),
  },
  traceId: {
    type: String,
    default: 'unknown',
  },
  spanId: {
    type: String,
    default: 'unknown',
  },
  commit: {
    type: String,
    default: 'unknown',
  },
  metadata: {
    type: Object,
    default: {
        parentResourceId:{
          type: String              
        }
  },
}
});
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
