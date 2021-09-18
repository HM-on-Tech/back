const Sequelize = require('sequelize');
const post = require('./post');
const user = require('./user');
const publication = require('./publication')

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
console.log("sequelize", sequelize)


// making new tables
db.Post = post;
db.User = user;
db.Publication = publication;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
});

// creating associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;