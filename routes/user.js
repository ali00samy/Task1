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
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const lodash_1 = __importDefault(require("lodash"));
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
router.post('/signup', (0, express_validator_1.check)('email').isEmail().withMessage('Please enter a valid email'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(e => e.msg));
    }
    let info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    let user = yield users_1.default.findOne({ where: { email: info.email } });
    if (user)
        return res.status(400).send('User already registered');
    const salt = yield bcryptjs_1.default.genSalt(10);
    info.password = yield bcryptjs_1.default.hash(info.password, salt);
    user = yield users_1.default.create(info);
    res.status(201).send(lodash_1.default.pick(user, ['id', 'name', 'email']));
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let info = {
        email: req.body.email,
        password: req.body.password
    };
    const user = yield users_1.default.findOne({ where: { email: info.email } });
    if (!user)
        return res.status(400).send('Invalid email or password');
    const isMatch = bcryptjs_1.default.compareSync(info.password, user.password);
    if (!isMatch)
        return res.status(400).send('Invalid email or password');
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.get('jwt_key'));
    res.status(200).send(token);
}));
exports.default = router;
