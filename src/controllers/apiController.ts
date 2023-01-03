import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { User } from "../models/name-db";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";

dotenv.config();

export const ping = (req:Request, res:Response) => {
    res.json({pong: true})
}

export const register = async (req:Request, res:Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;

        let hasUser = await User.findOne({where: { email }});
        if (!hasUser) {
            let newUser = await User.create({ email, password });

            const token = JWT.sign(
                {  id: newUser.id, email: newUser.email  },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '2h' }
            )

            res.status(201);
            res.json({  id: newUser.id ,  token });
        } else{
            res.json({ error: 'E-mail já existe.' });
        }
    }else{
        res.json({error: "Email ou senha não enviados"})
    }
    
}

export const login = async (req:Request, res:Response) => {
    res.json({ status: true, user: req.user });
}

export const list = async (req:Request, res:Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for (let i in users) {
        list.push( users[i].email );
    }
    res.json({ list });
}