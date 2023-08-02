import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { stationConversions } from "../utils/station-conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await 
    stationStore.getStationById(request.params.id);
    const latestReading = stationAnalytics.getLatestReading(station);
      station.latestReading = latestReading;
    
    const viewData = {
      station: station,
      name: station.name,
      latitude: station.latitude,
      longitude: station.longitude,
      readings: station.readings,
      latestReading: latestReading,
    };
    response.render("station-view", viewData);
    console.log("station rendering")
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
    await readingStore.deleteReading(request.params.readingId);
    response.redirect("/station/" + stationId);
  },
};
