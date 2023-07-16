import { stationStore } from "../models/station-store.js";
import { accountsController} from "./accounts-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUserId(request);
    const viewData = {
      title: "WeatherTop",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
    };
    console.log("dashboard rendering", request.cookies);
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station called`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },

};
