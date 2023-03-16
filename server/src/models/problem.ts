const PracticeProblem = sequelize.define('PracticeProblem', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  solution: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = PracticeProblem;
