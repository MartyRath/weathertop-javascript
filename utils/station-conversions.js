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
          100: 'arcticons:weather',
          200: 'ri:soundcloud-fill', 
          300: 'zondicons:cloud',
          400: 'wi:showers',
          500: 'fa6-solid:cloud-showers-heavy',
          600: 'carbon:rain',
          700: 'bi:snow',
          800: 'mdi:thunder',
        };
    
        const icon = iconMap[weatherCode];
        return icon;
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
