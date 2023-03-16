import { DataTypes } from "sequelize";
import sequelize from "../config/pg";

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.fn('NOW'),
  },
});

export default Group;
