import { DataTypes } from "sequelize";
import sequelize from "../config/pg";


const CodeEditor = sequelize.define('CodeEditor', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Group',
      key: 'id',
    },
  },
  practice_problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PracticeProblem',
      key: 'id',
    },
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});



export default CodeEditor;
