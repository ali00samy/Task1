import sequelize from "../util/db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>;
    name: string;
    email: string;
    password: string;
  }

const User = sequelize.define<UserModel>('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default User;