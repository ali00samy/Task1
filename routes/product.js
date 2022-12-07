"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const products_1 = __importDefault(require("../models/products"));
const users_1 = __importDefault(require("../models/users"));
const multer_1 = __importDefault(require("../util/multer"));
const router = express_1.default.Router();
router.post('/add-product', multer_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageResult = req.files[0].path;
    let info = {
        title: req.body.title,
        price: req.body.price,
        imageUrl: imageResult,
        description: req.body.description,
        userId: req.body.userId
    };
    const product = yield products_1.default.create(info);
    res.status(201).send(product);
}));
router.get('/get-products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield products_1.default.findAll({
        include: [
            { model: users_1.default, attributes: ['name', 'email'] }
        ]
    });
    res.status(200).send(products);
}));
router.get('/get-product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_1.default.findAll({
        where: { id: req.params.id },
        include: [
            { model: users_1.default, attributes: ['name', 'email'] }
        ]
    });
    if (product) {
        res.status(200).send(product);
    }
    else {
        res.status(404).send("Product not found");
    }
}));
router.put('/update-product/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_1.default.findByPk(req.params.id);
    if (!product)
        return res.status(404).send('Product not found');
    product.update(req.body);
    res.status(200).send(product);
}));
router.delete('/delete-product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_1.default.findByPk(req.params.id);
    if (!product)
        return res.status(404).send('Product not found');
    // if (product.userId !== req.user.id) return res.status(401).send('Access denied');
    product.destroy();
    res.status(200).send('product deleted');
}));
exports.default = router;
