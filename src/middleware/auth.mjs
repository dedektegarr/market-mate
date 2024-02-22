import passport from "passport";

const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (!user || err)
      return res
        .status(401)
        .send({ status: "unauthorized", code: 401, message: "Unauthorized" });
    req.user = user;

    next();
  })(req, res, next);
};

export default requireAuth;
