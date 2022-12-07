import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

const fileStorage = multer.diskStorage({
    destination: (
        request: Request,
        file: any,
        callback: DestinationCallback
    ): void => {
        callback(null, 'public/uploads')
    },

    filename: (
        req: Request, 
        file: any, 
        callback: FileNameCallback
    ): void => {
        const fileName = file.originalname.split(' ').join('-');
        const extension = file.mimetype.split('/')[1];
        callback(null, `${fileName}-${Date.now()}.${extension}`)
    }
});

const upload = multer({storage:fileStorage, fileFilter: fileFilter}).any();
export default upload;

// import multer from 'multer';

// const storage = multer.diskStorage({
//     destination: function (req: Request, _file: any, cb: any) {
//         const dir = './uploads/';
//         mkdirp(dir, (err: NodeJS.ErrnoException) => {
//             cb(err, dir)
//         });
//     },
//     filename: function (_req: Request, file: any, cb: any) {
//         cb(null, file.originalname)
//     }
// });

// function mkdirp(dir: string, arg1: (err: NodeJS.ErrnoException) => void) {
//     throw new Error('Function not implemented.');
// }

// const upload = multer({
//     storage: storage
// });

// export default upload;
