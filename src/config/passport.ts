import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { User } from '../models/name-db';
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';


dotenv.config()

const notAuthorizedJson = { status: 401, message: 'Não autorizado do not' };

const options = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: process.env.JWT_SECRET_KEY as string
};

passport.use(new JWTStrategy(options, async (payload, done) => {
     const user = await User.findByPk(payload.id);
     console.log(user);
     if (user) {
          return done(null, user);
     } else {
          return done(notAuthorizedJson, false)
     }
}));

//GERAR TOKEN
export const generateToken = (data: object) => {
     return jwt.sign( data, process.env.JWT_SECRET_KEY as string )
}

//PRIVAR ROTA
export const privateRouteJwt = (req:Request, res:Response, next:NextFunction) => {
     passport.authenticate('jwt', (err, user) => {
          req.user = user
          console.log(user)
          return user ? next() : next(notAuthorizedJson);
     })(req, res, next);
}
















/*BASIC AUTH
import { Request, Response, NextFunction } from "express";
import { BasicStrategy } from "passport-http";
import { User } from '../models/name-db'

const notAuthorizedJson = { status: 401, message: 'Não autorizado' }

//Configuração da Strategy

#### AUTH BASIC
passport.use( new BasicStrategy ( async (email, password, done) => {
     if (email && password) {
          const user = await User.findOne({
               where: { email, password }
          });
          if (user) {
               return done(null, user)
          }

     }
     return done(notAuthorizedJson, false)
}) );

export const privateRoute = (req: Request, res: Response, next:NextFunction) => {
     passport.authenticate('basic', (err, user) => {
          req.user = user;
          return user ? next() : next(notAuthorizedJson);
     })(req, res, next);
}
*/

export default passport;
