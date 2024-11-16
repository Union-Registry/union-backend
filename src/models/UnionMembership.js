const mongoose = require('mongoose');

const unionMembershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  unionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Union',
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACTIVE', 'INACTIVE'],
    default: 'PENDING'
  },
  contractSigned: {
    type: Boolean,
    default: false
  }
});

// Compound index to ensure a user can only be in a union once
unionMembershipSchema.index({ userId: 1, unionId: 1 }, { unique: true });

module.exports = mongoose.model('UnionMembership', unionMembershipSchema);