import { Meteor } from 'meteor/meteor';
import { IPLocation } from '../server/imports/IPLocation.js';

Meteor.methods({
  'getClientIP'() {
    return this.connection.clientAddress;
  },

  'getClientIPCountry'() {
    ip = this.connection.clientAddress;
    return IPLocation.lookupCountry(ip);
  },
});
