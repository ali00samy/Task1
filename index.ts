import express, { Express ,Request, Response } from 'express';
import Product from './models/products';
import ProductRoute from './routes/product';
import UserRoute from './routes/user';
import User from './models/users';
import sequelize from './util/db';

const app: Express = express();

app.use(express.json());

const port = 666;

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
    .sync({force: false})
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

app.use('/api/product', ProductRoute);
app.use('/api/user', UserRoute);