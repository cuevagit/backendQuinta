import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user.js";
import jwt from 'jsonwebtoken'
import {SALTENV} from './config.js'
import {MONGOCONECTION} from './config.js'
import {SECRETKEY} from './config.js'
import {TIPO_USUARIO_POR_DEFECTO} from './config.js'
import loggerInfo from './pinoInfo.js';
import loggerError from './pinoError.js';


export default  function logIn(servidor){

 
	const SALT = SALTENV

	servidor.use(session({

        store: MongoStore.create({
            //En Atlas connect App :  Make sure to change the node version to 2.2.12:
            mongoUrl: MONGOCONECTION,
        }),
        /* ----------------------------------------------------- */
      
        secret: SECRETKEY,
		ttl: 600,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 600000
        },
        rolling: true,
        resave: true,
        saveUninitialized: false
      }))

	  
	  passport.use(
		  "login",
		  new LocalStrategy(
			  {
				  passReqToCallback: true,
			  },
			  (req, username, password, done) => {
				User.findOne({ username: username }, (err, user) => {
					 if (err) return done(err);
					 if (!user) {
						  loggerError("User Not Found with username " + username);
						  return done(null, false);
					  }
					  if (!validatePassword(user, password)) {
						  loggerError("Invalid Password");
						  return done(null, false);
					  }
					  return done(null, user);
				  });
			  }
		  )
	  );
  
  
	  passport.use(
		  "register",
		  new LocalStrategy(
			  {
				  passReqToCallback: true,
			  },
			  function (req, username, password, done) {
					  User.findOne({ username: username }, function (err, user) {
						  if (err) {
							  loggerError("Error in SignUp: " + err);
							  return done(err);
						  }
						  if (user) {
							  loggerError("User already exists");
							  return done(null, false);
						  } else {
							  loggerInfo('User Registration succesful');
			

							  const usuario = {
								  username: username,
								  password: createHash(password),
								  nombre: req.body.nombre,
								  apellido: req.body.apellido,
								  foto: req.body.foto,
								  tipo_usuario: TIPO_USUARIO_POR_DEFECTO
							  }
							  User.create(usuario, (err, userWithId) => {
								if (err) {
								  loggerError('Error in Saving user: ' + err);
								  return done(err);
								}
								loggerInfo("User: " + user + " registered")
								loggerInfo('User Registration succesful');
								return done(null, userWithId);
							  });						 
						  }
					  });
			  }
		  )
	  );
	  
	  const validatePassword = (user, password) => {

		const  objetoOriginal = jwt.verify(user.password, SALT)

		   if(password === objetoOriginal.password)
		     return true;
		   else
		     return null;
	  };
	  
	  var createHash = function (password) {
		  return jwt.sign({password: password}, SALT);  //, { expiresIn: '24h' });
	  };


	  servidor.use(passport.initialize());
	  
	 //Sesiones
	  servidor.use(passport.session());
	  	  
	  passport.serializeUser((user, done) => {
		  done(null, user._id);
	  });
	  
	  passport.deserializeUser((id, done) => {
		  User.findById(id, function (err, user) {
			  done(err, user);
		  });
	  });
	  //Fin Sesiones
	  
}