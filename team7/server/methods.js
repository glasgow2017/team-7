import { Meteor } from 'meteor/meteor';
import { IPLocation } from '../server/imports/IPLocation.js';

Meteor.methods({
  'getClientIP'() {
    return this.connection.clientAddress;
  },

  'getClientIPCountry'() {
    return IPLocation.getClientCountry(this);
  },

  'getClientIPCountryCode'() {
    return IPLocation.getClientCountryCode(this);
  },
});
