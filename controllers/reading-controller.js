import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";

export const readingController = {
  async index(request, response) {
    try {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: await stationStore.getStationById(stationId),
      reading: await readingStore.getReadingById(readingId),
    };
    response.render("edit-view", viewData);
  }
  catch (error) {
    console.error("Something went wrong", error);
    response.render("error-view");
  }
  },

  async update(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    const updatedReading = {
        date: Number(request.body.date),
        code: Number(request.body.code),
        temperature: Number(request.body.temperature),
        windSpeed: Number(request.body.windSpeed),
        windDirection: Number(request.body.windDirection),
        pressure: Number(request.body.pressure),
    };
    console.log(`Updating Reading ${readingId} from Station ${stationId}`);
    const reading = await readingStore.getReadingById(readingId);
    await readingStore.updateReading(reading, updatedReading);
    response.redirect("/station/" + stationId);
  },
};
