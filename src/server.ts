import  express, { ErrorRequestHandler, Request, Response } from "express";
import path from "path";
import dotenv from 'dotenv';
import mainRouter from './routes/routes'

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(mainRouter)


server.use((req:Request, res:Response) => {
    res.status(404);
    res.json({error: 'endpoint não encontrada'})
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    } else {
        res.status(400); //Bad Request
    }
    if (err.message) {
        res.json({ error: err.message });

    }else {
        res.json({error: 'Ocorreu um erro;'});
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);
