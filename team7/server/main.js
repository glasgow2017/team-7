import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { dataFetcher } from '../server/imports/fetchDataSources.js';

import './methods.js';

Meteor.startup(() => {
    // code to run on server at startup
    dataFetcher.fetch();
});
