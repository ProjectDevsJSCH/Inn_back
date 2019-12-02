"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../utils/database');

var ChallengeCategory = sequelize.define('challenge_categories', {
  fk_id_challenge: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fk_id_category: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});
module.exports = ChallengeCategory;