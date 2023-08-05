import { stationAnalytics } from "./station-analytics";
import { stationConversions } from "./station-conversions";
import Handlebars from 'handlebars';

export const handlebarsHelpers = { 
    registerHelpers () {
        Handlebars.registerHelper(stationAnalytics);
        Handlebars.registerHelper(stationConversions);
    },
};