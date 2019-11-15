"use strict";

var Sequelize = require('sequelize');

var sequelize = require('../utils/database');

var Challenge = require('./Challenge');

var Company = sequelize.define('company', {
  id_company: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  company_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  company_description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
}); // Company.hasMany(Challenge, { foreignKey: 'fk_id_company', sourceKey: 'id_company' });

module.exports = Company;