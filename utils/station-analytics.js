import { readingStore } from "../models/reading-store.js";

export const stationAnalytics = {
    getLatestReading(station) {
        let latestReading = null;
        if (station.readings.length > 0) {
            latestReading = station.readings[station.readings.length - 1];
        }
        return latestReading;
    },

    getMaxValue(readings, property) {
        let maxValue = Number.MIN_SAFE_INTEGER;
        for (let reading of readings) {
            if (reading[property] > maxValue) {
                maxValue = reading[property];
            }
        }
        return maxValue;
    },

    getMinValue(readings, property) {
        let minValue = Number.MAX_SAFE_INTEGER;
        for (let reading of readings) {
            if (reading[property] < minValue) {
                minValue = reading[property];
            }
        }
        return minValue;
    },

    getTrends(readings, property) {
        if (readings.length < 3) {
            return null;
        }

        const lastReading = readings[readings.length - 1];
        const secondLastReading = readings[readings.length - 2];
        const thirdLastReading = readings[readings.length - 3];

        const last = lastReading[property];
        const secondLast = secondLastReading[property];
        const thirdLast = thirdLastReading[property];

        if (last > secondLast && secondLast > thirdLast) {
            return "bxs:up-arrow";  //rising arrow
        } else if (last < secondLast && secondLast < thirdLast) {
            return "bxs:down-arrow"; //falling arrow
        }
        return null;
    },

};

