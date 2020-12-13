const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../../variables.env') });
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const { rootResolver } = require('./resolvers/index');
const { typeDefs } = require('./schema/index');

const start = () => {
  const app = express();

  const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000, secure: false },
  };

  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }),
  );

  app.use(session(sessionConfig));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.user.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, { id: user.id, name: user.name, email: user.email });
    } catch (e) {
      done(e);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      ((email, password, done) => {
        db.user
          .findOne({ where: { email } })
          .then((user) => {
            bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                done(null, { id: user.id, name: user.name, email: user.email });
              } else {
                done(null, false);
              }
            });
          })
          .catch((e) => done(e, null));
      }),
    ),
  );

  app.use(passport.initialize());

  app.use(passport.session());

  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (!user) {
        res
          .status(401)
          .send({ message: 'Invalid email or password', success: false });
        return next();
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({
          success: true,
          user: {
            name: user.name,
            email: user.email,
            user: user.id,
          },
        });
      });
    })(req, res, next);
  });

  app.get('/logout', (req, res) => {
    req.logout();

    res.send({ message: 'Successfully logged out!' });
  });

  app.get('/auth/userDetails', (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        user: {
          name: req.user.name,
          email: req.user.email,
          user: req.user.id,
        },
      });
    } else {
      res.json({ success: false });
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    playground: true,
    context: ({ req, res }) => ({
      db,
      req,
      res,
      passport,
    }),
  });

  server.applyMiddleware({
    app,
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  app.listen(process.env.BACKEND_PORT, () => console.log(`App running on port port ${process.env.BACKEND_PORT}`));
};

start();
