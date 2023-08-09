import { stationStore } from "../models/station-store.js";
import { accountsController} from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import axios from "axios";

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

  async addreport(request, response) {
    console.log("rendering new report");
    let report = {};
    const lat = request.body.lat;
    const lng = request.body.lng;
    const apiKey = "f44741dd33c15a13279d5477ac2799f4";
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;

      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i=0; i<trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` );
      }
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report
    };
    response.render("dashboard-view", viewData);
  }
};

function alphabetiseStations (stations) { 
  stations.sort((a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
}
