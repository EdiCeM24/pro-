
import Admin from "../models/admin.model.js";

async function isAdmin(req, res, next) {
  try {
    const { isAdmin } = req.body;

    const user = await Admin.findOne({ isAdmin });

    if (req.user && req.user.isAdmin.role === "admin" && user._id) {
      next();
    } else {
      res.redirect("/login", {
        message: "You are not authorized to access this page! Admin privileges required."});
    }
  } catch (error) {
    res.status(403).json({ message: "Access denied: ", error });
  }
};

export default isAdmin;