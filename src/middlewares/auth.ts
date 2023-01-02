import { Request, Response, NextFunction } from "express";
import { User } from "../models/name-db";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;
        let userData = req.headers.authorization

        if (userData) {
            
            const  [authType, token] = userData.split(' ')
            if (authType === 'Bearer') {
                try {
                        JWT.verify(
                            token,
                            process.env.JWT_SECRET_KEY as string
                        );
                    
                        success = true
                }catch(err){
                }

            }

        }

        if (success) {
            
            next();
        } else{
            res.status(403);
            res.json({ error: "Não autorizado" });
        }
        
    }
}

/*
BASIC Auth

let success = false;
        let userData = req.headers.authorization

  let hash: string = userData.substring(6);
            let decoded: string = Buffer.from(hash, 'base64').toString();
            let data: string[] = decoded.split(':');

            if (data.length === 2) {
                let hasUser = await User.findOne({
                    where: {
                        email: data[0],
                        password: data[1]
                    }
                });
                if (hasUser) {
                    success = true
                }
            }
*/