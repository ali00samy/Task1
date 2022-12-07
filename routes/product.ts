import express, { Express ,Request, Response, Router } from 'express';
interface MulterRequest extends Request {
    files: any;
}

import auth from '../middleware/auth';
import Product from '../models/products';
import User from '../models/users';
import upload from '../util/multer'


const router: Router = express.Router();

router.post('/add-product', upload ,async (req: Request, res: Response) => {
    const imageResult  = (req as MulterRequest).files[0].path as any ;

    let info = {
        title : req.body.title,
        price : req.body.price,
        imageUrl : imageResult,
        description : req.body.description,
        userId: req.body.userId
    }
    
    const product = await Product.create(info);
    res.status(201).send(product);
});

router.get('/get-products', async (req: Request, res: Response) => {
    const products = await Product.findAll({
        include: [
            {model: User , attributes: ['name', 'email']}
        ]
    });
    res.status(200).send(products);
});

router.get('/get-product/:id' ,async (req: Request, res: Response) => {
    const product = await Product.findAll({
        where: {id : req.params.id},
        include : [
            {model: User, attributes: ['name', 'email']}
        ]
    })
    if (product) {
        res.status(200).send(product);
    } else {
        res.status(404).send("Product not found");
    }
});

router.put('/update-product/:id', auth ,async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) return res.status(404).send('Product not found');
    product.update(req.body);
    res.status(200).send(product);
});


router.delete('/delete-product/:id', async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if(!product) return res.status(404).send('Product not found');
    // if (product.userId !== req.user.id) return res.status(401).send('Access denied');
    product.destroy();
    res.status(200).send('product deleted');
});

export default router;
