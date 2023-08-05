import { stationConversions } from "./station-conversions.js";
import { stationAnalytics } from "./station-analytics.js";
import Handlebars from 'handlebars';

Handlebars.registerHelper(stationAnalytics);
Handlebars.registerHelper(stationConversions);