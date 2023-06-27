export const stationAnalytics = {
    getLatestReading(station) {
        let latestReading = null;
        if (station.readings.length > 0) {
            latestReading = station.readings[station.readings.length - 1];
        }
        return latestReading;
    },
};
