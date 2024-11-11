const mongoose = require('mongoose');
const { Schema } = mongoose;

// Student Schema
const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  scholarId: {
    type: String,
    required: true,
    unique: true
  },
  branch: {
    type: String,
    required: true
  }
});

// Comment Schema
const commentSchema = new Schema({
  askedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  childrenIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Resource Schema
const resourceSchema = new Schema({
  semester: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  subjects: [{
    title: {
      type: String,
      required: true
    },
    linkToDrive: {
      type: String,
      required: true
    }
  }]
});

// Models
const Student = mongoose.model('Student', studentSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = { Student, Comment, Resource };
