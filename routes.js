import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { readingController } from "./controllers/reading-controller.js";
import { profileController } from "./controllers/profile-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);

router.get("/station/:id", stationController.index);
router.post("/station/:id/addreading", stationController.addReading);
router.get("/station/:stationid/deletereading/:readingid", stationController.deleteReading);

router.get("/about", aboutController.index);
router.get("/profile", profileController.index);
router.post("/updateProfile/:id", profileController.updateProfile);

router.get("/station/:stationid/editreading/:readingid", readingController.index);
router.post("/station/:stationid/updatereading/:readingid", readingController.update);

router.get("/station/:stationid/autoGenerateReport", stationController.autoGenerateReading);