const db = require("../config/db");
const { DataTypes } = require('sequelize');

const Projects = db.define('projects', {
    date: {
      type: DataTypes.STRING,
      defaultValue: db.NOW
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(1000)
    },
    github: {
      type: DataTypes.STRING
    },
    external: {
      type: DataTypes.STRING
    },  
  }, {
    timestamps: false
});

const Languages = db.define('langs', {
    lang: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    timestamps: false
});
     
Projects.belongsToMany(Languages, { 
  through: "project_lang",
  as: 'langs',
});

Languages.belongsToMany(Projects, { 
  through: "project_lang",
  as: 'projects', 
});   

module.exports = { Projects, Languages }