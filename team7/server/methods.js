import { Meteor } from 'meteor/meteor';
import { IPLocation } from '../server/imports/IPLocation.js';
import { Questions } from '../server/imports/questions.js';
import { recordResponses } from '../server/imports/recordResponses.js';

Meteor.methods({
  'getClientIP'() {
    return this.connection.clientAddress;
  },

  'getClientIPCountry'() {
    return IPLocation.lookupCountry(this.connection.clientAddress);
  },

  'getClientIPCountryCode'() {
    return IPLocation.getClientCountryCode(this);
  },

  'getQuestions'(countryCode, languageCode) {
    return Questions.generateQuestions(countryCode, languageCode);
  },

  'saveResponse'(data) {
    recordResponses.record(data);
  },
});
