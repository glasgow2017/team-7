export { IPLocation };

/*
Usage:
import { IPLocation } from '/server/imports/IPLocation.js'
IPLocation.lookupCountry('130.209.241.197'); //returns "GB"

Not very accurate but good enough for this case.
*/

let geoip = require('geoip-lite');
let IPLocation = {
  lookupCountry: function (ip) {
    return geoip.lookup(ip).country;
  },

}
