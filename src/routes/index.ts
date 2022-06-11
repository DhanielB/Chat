import { Router } from 'express';
import morgan from 'morgan';
import createController from '../controller';

const router = Router();
router.use(morgan('dev'))

const controller = new createController();

const { sendMessage, loginPage, registerPage } = controller;

router.get('/', (_, res) => {
    res.send('<h1>Chat</h1>')
})
router.all('/api/v1/sendMessage', sendMessage);
router.all('/api/v1/login', loginPage);
router.all('/api/v1/register', registerPage);

export default router;
