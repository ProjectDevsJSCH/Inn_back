"use strict";

var Sequelize = require('sequelize');

var db_cnx = require('../utils/database');

var AllyCategory = db_cnx.define('ally_categories', {
  fk_id_ally: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  fk_id_category: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});
module.exports = AllyCategory;