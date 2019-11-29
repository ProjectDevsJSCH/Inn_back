const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const CompanyCategory = sequelize.define('al_categories', {
   id_category: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
   },
   category_name: {
      type: Sequelize.STRING,
      allowNull: false
   }
}, {
   timestamps: true,
   updatedAt: 'updated_at',
   createdAt: 'created_at'
});

module.exports = CompanyCategory;