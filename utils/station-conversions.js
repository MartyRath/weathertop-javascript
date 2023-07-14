import { stationAnalytics } from "../utils/station-analytics.js";

export const stationConversions = {
    convertTemperatureCToF(temperature) {
        let fahrenheit = temperature * 9 / 5 + 32;
        return fahrenheit;
      },

      convertToWindChill(temperature, windSpeed) {
        let result = Math.pow(windSpeed, 0.16);
        let windChill = 13.12 + 0.6215 * temperature - 11.37 * result + 0.3965 * temperature * result;
        let windChillToOneDecimalPlace = Math.round(windChill * 10) / 10;
        return windChillToOneDecimalPlace;
      },      

      convertWindSpeedKMToBeaufort(windSpeed) {
        let beaufort = 0;
        if (windSpeed <= 1) {
          return 0;
        } else if (windSpeed <= 5) {
          return 1;
        } else if (windSpeed <= 11) {
          return 2;
        } else if (windSpeed <= 19) {
          return 3;
        } else if (windSpeed <= 28) {
          return 4;
        } else if (windSpeed <= 38) {
          return 5;
        } else if (windSpeed <= 49) {
          return 6;
        } else if (windSpeed <= 61) {
          return 7;
        } else if (windSpeed <= 74) {
          return 8;
        } else if (windSpeed <= 88) {
          return 9;
        } else if (windSpeed <= 102) {
          return 10;
        } else if (windSpeed <= 117) {
          return 11;
        }
        return beaufort;
      },

      convertDegreesToCompassDirection(degrees) {
        const directions = ["North", "North North East", "North East", "East North East", "East",
            "East South East", "South East", "South South East", "South", "South South West", "South West",
            "West South West", "West", "West North West", "North West", "North North West"];
    
        if (degrees < 0) {
          degrees += 360;
        }
    
        let index = Math.round(((degrees % 360) / 22.5));
        index = index % 16;
        return directions[index];
      },

      weatherCodeToString(weatherCode) {
        switch (weatherCode) {
          case 100:
            return "Clear";
          case 200:
            return "Partial Clouds";
          case 300:
            return "Cloudy";
          case 400:
            return "Light Showers";
          case 500:
            return "Heavy Showers";
          case 600:
            return "Rain";
          case 700:
            return "Snow";
          case 800:
            return "Thunder";
        }
        return null;
      },


};