import { Router } from "express";
import * as ApiController from '../controllers/apiController';
import * as EmailController from '../controllers/emailController';
import { Auth } from "../middlewares/auth";


const router = Router();

router.get('/', ( req, res ) => {
    res.json({home: true})
})

router.get('/ping', ApiController.ping);

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list', Auth.private, ApiController.list);

router.post ('/contato', EmailController.contato)

export default router;