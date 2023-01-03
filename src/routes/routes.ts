import { Router } from "express";
import * as ApiController from '../controllers/apiController';
import * as EmailController from '../controllers/emailController';
import { Auth } from "../middlewares/auth";
import { privateRoute } from "../config/passport";


const router = Router();

router.get('/', ( req, res ) => {
    res.json({home: true})
})

router.get('/ping', ApiController.ping);

router.post('/register', ApiController.register);
router.post('/login', privateRoute, ApiController.login);

router.get('/list', Auth.private, ApiController.list);//private basic

router.post ('/contato',privateRoute, EmailController.contato)//private com basic passport

export default router;