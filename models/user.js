const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      email: {
        type:DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: false,
        allowNull: false,
      },
    }, {
      charset: 'utf8mb4',
      sequelize,
    });
  }
  static associate(db) {
    db.User.hasMany(db.Article);
    db.User.belongsToMany(db.Publication, {through: 'UserPublication' });
  }
};