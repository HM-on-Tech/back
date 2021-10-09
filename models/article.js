const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Article extends Model {
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
        allowNull: false,
      },
      viewCount : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      volume : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      issue : {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    }, {
      charset: 'utf8mb4',
      sequelize,
    });
  }
  static associate(db) {
    db.Article.belongsTo(db.User)
    db.Article.belongsTo(db.Publication)
  }
};