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
        const weatherCodeDescriptions = {
          200: "Thunderstorm with light rain",
          201: "Thunderstorm with rain",
          202: "Thunderstorm with heavy rain",
          210: "Light thunderstorm",
          211: "Thunderstorm",
          212: "Heavy thunderstorm",
          221: "Ragged thunderstorm",
          230: "Thunderstorm with light drizzle",
          231: "Thunderstorm with drizzle",
          232: "Thunderstorm with heavy drizzle",
          300: "Light intensity drizzle",
          301: "Drizzle",
          302: "Heavy intensity drizzle",
          310: "Light intensity drizzle rain",
          311: "Drizzle rain",
          312: "Heavy intensity drizzle rain",
          313: "Shower rain and drizzle",
          314: "Heavy shower rain and drizzle",
          321: "Shower drizzle",
          500: "Light rain",
          501: "Moderate rain",
          502: "Heavy intensity rain",
          503: "Very heavy rain",
          504: "Extreme rain",
          511: "Freezing rain",
          520: "Light intensity shower rain",
          521: "Shower rain",
          522: "Heavy intensity shower rain",
          531: "Ragged shower rain",
          600: "Light snow",
          601: "Snow",
          602: "Heavy snow",
          611: "Sleet",
          612: "Light shower sleet",
          613: "Shower sleet",
          615: "Light rain and snow",
          616: "Rain and snow",
          620: "Light shower snow",
          621: "Shower snow",
          622: "Heavy shower snow",
          701: "Mist",
          711: "Smoke",
          721: "Haze",
          731: "Dust/sand whirls",
          741: "Fog",
          751: "Sand",
          761: "Dust",
          762: "Volcanic ash",
          771: "Squalls",
          781: "Tornado",
          800: "Clear sky",
          801: "Few clouds: 11-25%",
          802: "Scattered clouds: 25-50%",
          803: "Broken clouds: 51-84%",
          804: "Overcast clouds: 85-100%",
        };

        return weatherCodeDescriptions[weatherCode];
      },

      weatherCodeToIcon(weatherCode) {
        const iconMap = {
            200: "11d",
            201: "11d",
            202: "11d",
            210: "11d",
            211: "11d",
            212: "11d",
            221: "11d",
            230: "11d",
            231: "11d",
            232: "11d",
            300: "09d",
            301: "09d",
            302: "09d",
            310: "09d",
            311: "09d",
            312: "09d",
            313: "09d",
            314: "09d",
            321: "09d",
            500: "10d",
            501: "10d",
            502: "10d",
            503: "10d",
            504: "10d",
            511: "13d",
            520: "09d",
            521: "09d",
            522: "09d",
            531: "09d",
            600: "13d",
            601: "13d",
            602: "13d",
            611: "13d",
            612: "13d",
            613: "13d",
            615: "13d",
            616: "13d",
            620: "13d",
            621: "13d",
            622: "13d",
            701: "50d",
            711: "50d",
            721: "50d",
            731: "50d",
            741: "50d",
            751: "50d",
            761: "50d",
            762: "50d",
            771: "50d",
            781: "50d",
            800: "01d",
            801: "02d",
            802: "03d",
            803: "04d",
            804: "04d",
        };
    
        const icon = iconMap[weatherCode];
        const iconWithUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        return iconWithUrl;
      },

      temperatureIcons(temperature) {
        if (temperature <= 5)
          return "fa-solid:temperature-low"
        else if (temperature <= 15)
        return "fluent:temperature-16-filled"
        else if (temperature > 15)
          return "fa-solid:temperature-high"
        else null;
      },

      windIcons(windSpeed) {
        if (windSpeed <= 5)
          return "fa-solid:temperature-low"
        else if (windSpeed <= 15)
        return "fluent:temperature-16-filled"
        else if (windSpeed > 15)
          return "fa-solid:temperature-high"
        else null;
      },

};
