import sequelize from "../util/db";
import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";

interface PorductModel extends Model<InferAttributes<PorductModel>, InferCreationAttributes<PorductModel>> {
    id: CreationOptional<number>;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    userId: number;
  }

const Product = sequelize.define<PorductModel>('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Product;