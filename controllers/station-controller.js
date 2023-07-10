import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { stationConversions } from "../utils/station-conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await 
    stationStore.getStationById(request.params.id);
    const latestReading = 
    stationAnalytics.getLatestReading(station);
    

    const viewData = {
      name: "Station",
      station: station,
      latitude: station.latitude,
      longitude: station.longitude,
      latestReading: latestReading,
      conversions: stationConversions,
      analytics: stationAnalytics,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReading = {
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
