import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";


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
    console.log(`adding reading ${newReading.code}`);
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
