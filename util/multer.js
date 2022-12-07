"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
const fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.split(' ').join('-');
        const extension = file.mimetype.split('/')[1];
        callback(null, `${fileName}-${Date.now()}.${extension}`);
    }
});
const upload = (0, multer_1.default)({ storage: fileStorage, fileFilter: fileFilter }).any();
exports.default = upload;
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
