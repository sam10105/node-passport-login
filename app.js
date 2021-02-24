const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const { NODE_ENV } = process.env;
const ONE_HOUR = 1000 * 60 * 60;

function createApp() {
  const app = express();

  // Passport Config
  require('./config/passport')(passport);

  // EJS
  app.use(expressLayouts);
  app.set('view engine', 'ejs');

  // Bodyparser
  app.use(express.urlencoded({ extended: false }));

  // Session
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: ONE_HOUR,
      },
    })
  );

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Connect Flash
  app.use(flash());

  // Global Variables
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

  // Routes
  app.use('/', require('./routes/index'));
  app.use('/users', require('./routes/users'));

  return app;
}

module.exports = {
  createApp,
};
