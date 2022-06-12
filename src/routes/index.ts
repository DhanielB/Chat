import { Router } from 'express';
import morgan from 'morgan';
import createController from '../controller';

const router = Router();
router.use(morgan('dev'));

const controller = new createController();

const { sendMessage, loginPage, registerPage, verifyCode } = controller;

router.all('/api/v1/sendMessage', sendMessage);
router.all('/api/v1/login', loginPage);
router.all('/api/v1/register', registerPage);
router.all('/api/v1/verify/:code', verifyCode);

export default router;
