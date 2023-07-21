import { stationStore } from "../models/station-store.js";
import { accountsController} from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { stationConversions } from "../utils/station-conversions.js";
import { readingStore } from "../models/reading-store.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUserId(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    for (const station of stations) {
      const latestReading = stationAnalytics.getLatestReading(station);
      station.latestReading = latestReading;
    }
    
    const viewData = {
      title: "WeatherTop",
      stations,
    };
    
    response.render("dashboard-view", viewData);
    console.log("dashboard rendering");
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
