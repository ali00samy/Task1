import jwt from 'jsonwebtoken';
import config from 'config';

import Product from '../models/products';
import {Express, Request, Response, NextFunction} from 'express';

type myToken = {
    id : number,
    iat : number,
}

async function auth(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwt_key')) as myToken;
        const product = await Product.findByPk(req.params.id);
        console.log(decoded['id']);
        console.log(product?.userId);
        if (product?.userId !== decoded['id']) return res.status(401).send('Access denied');
        next();
    }

    catch(ex) {
        res.status(400).send('invalid token');
    }
}

export default auth;