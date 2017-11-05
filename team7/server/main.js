import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import './methods.js';

Meteor.startup(() => {
    // code to run on server at startup
    fetchData();
});

function fetchData() {
    let result;
    try {
        const response = HTTP.get('http://api.worldbank.org/countries/indicators/SL.TLF.TOTL.FE.ZS?format=json&per_page=20&date=2006:2016');
        //response = JSON.parse(response);
        const data = JSON.parse(response.content);
        result = {status: response.statusCode, meta: data[0], content: removeNullValues(data[1])};
        console.log(result);
    } catch(e) {
        console.log(e);
    }
}

function removeNullValues(array) {
    let formattedArray = [];
    const size = array.length;
    for (let i = 0; i < size; i++) {
        if(array[i].value !== null) {
            formattedArray.push(array[i]);
        }
    }
    return formattedArray;
}