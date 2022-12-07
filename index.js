"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./models/products"));
const product_1 = __importDefault(require("./routes/product"));
const user_1 = __importDefault(require("./routes/user"));
const users_1 = __importDefault(require("./models/users"));
const db_1 = __importDefault(require("./util/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 666;
products_1.default.belongsTo(users_1.default, { constraints: true, onDelete: 'CASCADE' });
users_1.default.hasMany(products_1.default);
db_1.default
    .sync({ force: false })
    .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch(err => {
    console.log(err);
});
app.use('/api/product', product_1.default);
app.use('/api/user', user_1.default);
