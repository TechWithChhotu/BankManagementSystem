import express from "express";
import {
  activateAtmCard,
  addEmp,
  blockAtmCard,
  getUserData,
  investInFD,
  investInRD,
  issueAtmCard,
  login,
  transactionRecords,
} from "../controllers/v1_system.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
import isAuthorized from "../middlewares/authorization.middleware.js";
const systemRoute = express.Router();

systemRoute.post(
  "/add-employee",
  isLoggedIn,
  isAuthorized("Admin", "Founder", "Co-Founder"),
  addEmp
);

systemRoute.post("/login", login);
systemRoute.get("/get-account", isLoggedIn, getUserData);
systemRoute.post("/get-transactions", isLoggedIn, transactionRecords);
systemRoute.post("/get-atm-card", isLoggedIn, issueAtmCard);
systemRoute.post("/block-atm-card", isLoggedIn, blockAtmCard);
systemRoute.post("/activate-atm-card", isLoggedIn, activateAtmCard);
systemRoute.post("/invest-fd", isLoggedIn, investInFD);
systemRoute.post("/invest-rd", isLoggedIn, investInRD);

export default systemRoute;
