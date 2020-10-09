const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema/index");
const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, "../../variables.env") });
const { rootResolver } = require("./resolvers/index");
const db = require("../models");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient();

const LocalStrategy = require("passport-local").Strategy;

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
    })
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
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        db.user
          .findOne({ where: { email } })
          .then((user) => {
            bcrypt.compare(password, user.password, function (err, res) {
              if (res) {
                done(null, { id: user.id, name: user.name, email: user.email });
              } else {
                done(null, false);
              }
            });
          })
          .catch((e) => done(e, null));
      }
    )
  );

  app.use(passport.initialize());

  app.use(passport.session());

  // app.post("/login", passport.authenticate("local"), function (req, res) {
  //   res.json({ success: true });
  // });
  app.post("/login", function (req, res, next) {
    /* look at the 2nd parameter to the below call */
    passport.authenticate("local", function (err, user, info) {
      // if (err) {
      //   return next(err);
      // }
      console.log("err: ", err);
      console.log("user: ", user);
      if (!user) {
        res
          .status(401)
          .send({ message: "Invalid email or password", success: false });
        return next();
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        console.log("will Login: ", user);
        // return res.redirect("/");
        return res.json({ success: true });
      });
    })(req, res, next);
  });

  app.get("/logout", (req, res) => {
    req.logout();

    res.send({ message: "Successfully logged out!" });
  });

  app.get("/auth/userDetails", (req, res) => {
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

  app.listen(process.env.BACKEND_PORT, () =>
    console.log(`App running on port port ${process.env.BACKEND_PORT}`)
  );
};

start();
