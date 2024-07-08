import express from "express";
const userRoute = express.Router();
/*---------------------->>All custom imports<<----------------------*/

import {
  addBranch,
  getAllBranches,
} from "../controllers/v1_system.controller.js";
import { createBranchTable } from "../controllers/test.js";
import {
  createATMTable,
  // createEmployeesTable,
  createLoansTable,
} from "../controllers/v1_static.controller.js";
import { scanToPay } from "../controllers/v1_user.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";

userRoute.get("/create-branch-table", createBranchTable);
userRoute.get("/create-loans-table", createLoansTable);
userRoute.get("/create-atm-table", createATMTable);

userRoute.get("/getAllBranches", getAllBranches);
userRoute.post("/add-branch", addBranch);
userRoute.post("/scan-to-pay", isLoggedIn, scanToPay);

export default userRoute;
