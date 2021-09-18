const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Publication extends Model {
  static init(sequelize) {
    return super.init({
      // id is default
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }},
      {
      charset: 'utf8mb4',
      sequelize
    });
  }
  static associate(db) {
    db.Publication.hasMany(db.Post)
  }
};