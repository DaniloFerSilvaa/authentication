import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User } from '../models/name-db'

const notAuthorizedJson = { status: 401, message: 'Não autorizado' }
//Configuração da Strategy
passport.use( new BasicStrategy ( async (email, password, done) => {
     if (email && password) {
          const user = await User.findOne({
               where: { email, password }
          })
          
     }
     return done(notAuthorizedJson, false)
}) );

export default passport