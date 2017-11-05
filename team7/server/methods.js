import { Meteor } from 'meteor/meteor';
import { IPLocation } from '../server/imports/IPLocation.js';
import { Questions } from '../server/imports/questions.js';

Meteor.methods({
  'getClientIP'() {
    return this.connection.clientAddress;
  },

  'getClientIPCountry'() {
    return IPLocation.lookupCountry(this.connection.clientAddress);
  },

  'getQuestions'() {
      return true;
  },

  'getClientIPCountryCode'() {
    return IPLocation.getClientCountryCode(this);
  },

  'getQuestions'(countryCode, languageCode) {
    return Questions.generateQuestions(countryCode, languageCode);
  },
});
