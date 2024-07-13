import { Employee } from "../models/v1_models.mongoDB.js";

const isAuthorized =
  (...roles) =>
  async (req, res, next) => {
    console.log("Is authorized first check");
    const user = await Employee.findById(req.user.id);
    console.log("req.user.id ====> ");
    console.log(req.user.id);
    console.log("User ===> ");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Employee does not exist",
      });
    }

    if (user.position) {
      const position = user.position;
      if (!roles.includes(position)) {
        return res.status(401).json({
          success: false,
          message: "You do not have permission to view this route",
        });
      }
      console.log("Is Authorized Last Check");
      next();
    }
  };

export default isAuthorized;
//call like authorizedRoles("ADMIN") as like upload.single()
