import { stationStore } from "../models/station-store.js";
import { accountsController} from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUserById(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    alphabetiseStations(stations);

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
    console.log(`deleting station`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },

};

function alphabetiseStations (stations) { 
  stations.sort((a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  if (nameA < nameB) {
    return -1; // a should come before b in the sorted order
  }
  if (nameA > nameB) {
    return 1; // a should come after b in the sorted order
  }
  return 0; // names are equal, maintain their relative order
});
}
