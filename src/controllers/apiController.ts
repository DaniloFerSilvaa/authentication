import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { User } from "../models/name-db";
import dotenv from "dotenv";
import { generateToken } from "../config/passport";

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

            const token = generateToken({ id: newUser.id });
        
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
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password
        console.log('EMAIL E SENHA: ', email, password)

        let user = await User.findOne({
            where: { email, password }
        });
        
        if (user) {
            const token = generateToken({ id: user.id });
            res.json({ status: true, token });
            return;
        } else {
            res.json({ status: false });
            }
    }
}

export const list = async (req:Request, res:Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for (let i in users) {
        list.push( users[i].email );
    }
    res.json({ list });
}