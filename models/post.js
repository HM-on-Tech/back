const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      // id is default
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      charset: 'utf8mb4',
      sequelize,
    });
  }
  static associate(db) {
    db.Post.belongsTo(db.User)
    db.Post.belongsTo(db.Publication)
  }
};