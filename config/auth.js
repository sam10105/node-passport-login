function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error_msg', 'Log in first');
  res.redirect('/users/login');
}

module.exports = {
  ensureAuthenticated,
};
