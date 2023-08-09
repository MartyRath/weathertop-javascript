import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import axios from "axios";

export const stationController = {
  async index(request, response) {
    const station = await 
    stationStore.getStationById(request.params.id);
    const latestReading = stationAnalytics.getLatestReading(station);
      station.latestReading = latestReading;
    
    const viewData = {
      title: station.name + " station",
      station: station,
      name: station.name,
      latitude: station.latitude,
      longitude: station.longitude,
      readings: station.readings,
      latestReading: latestReading,
    };
    
    console.log("station rendering")
    response.render("station-view", viewData);
    
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const timeStamp = Date.now();
    const date = new Date(timeStamp);

    const newReading = {
      date: date.toLocaleString(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding new reading`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },

  async autoGenerateReading(request, response) {
    const stationId = request.params.stationid;
    const station = await stationStore.getStationById(stationId);

    const timeStamp = Date.now();
    const date = new Date(timeStamp);

    console.log("auto-generating new report");
    let report = {};
    const lat = station.latitude;
    const lng = station.longitude;
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
    
    const newReading = {
      date: date.toLocaleString(),
      code: report.code,
      temperature: report.temperature,
      windSpeed: report.windSpeed,
      windDirection: report.windDirection,
      pressure: report.pressure,
    };
    
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },

  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from station ${stationId}`);
    await readingStore.deleteReading(readingId);
    response.redirect("/station/" + stationId);
  },
};
