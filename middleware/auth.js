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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const products_1 = __importDefault(require("../models/products"));
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header('x-auth-token');
        if (!token)
            return res.status(401).send('Access denied. No token provided');
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwt_key'));
            const product = yield products_1.default.findByPk(req.params.id);
            console.log(decoded['id']);
            console.log(product === null || product === void 0 ? void 0 : product.userId);
            if ((product === null || product === void 0 ? void 0 : product.userId) !== decoded['id'])
                return res.status(401).send('Access denied');
            next();
        }
        catch (ex) {
            res.status(400).send('invalid token');
        }
    });
}
exports.default = auth;
