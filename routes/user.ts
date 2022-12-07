import express, { Express ,Request, Response, Router } from 'express';
const router: Router = express.Router();

import { check, validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import _ from 'lodash';
import config from 'config';
import jwt from 'jsonwebtoken';

import User from '../models/users';

router.post(
    '/signup',
    check('email').isEmail().withMessage('Please enter a valid email'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array().map(e => e.msg));
      }
      let info = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    let user = await User.findOne({where: {email: info.email}});
    if (user) return res.status(400).send('User already registered');

    const salt = await bcryptjs.genSalt(10);
    info.password = await bcryptjs.hash(info.password, salt);
    user = await User.create(info);

    res.status(201).send(_.pick(user, ['id', 'name', 'email']));
});

router.post('/login', async (req: Request, res: Response) => {
    let info = {
        email: req.body.email,
        password: req.body.password
    }

    const user = await User.findOne({where: {email: info.email}});
    if (!user) return res.status(400).send('Invalid email or password');

    const isMatch = bcryptjs.compareSync(info.password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({id: user.id}, config.get('jwt_key'));
    res.status(200).send(token);
});

export default router;