import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

import './methods.js';

let data = {};
Meteor.startup(() => {
    // code to run on server at startup
});

function fetchData() {
    let result;
    try {
        // female work force percentage
        const currentYear = new Date().getFullYear();
        const response = HTTP.get('http://api.worldbank.org/countries/indicators/SL.TLF.TOTL.FE.ZS?format=json&per_page=10000&date=' + (currentYear - 11) + ':' + (currentYear - 1));
        //response = JSON.parse(response);
        const data = JSON.parse(response.content);
        result = {status: response.statusCode, meta: data[0], content: removeNullValues(data[1])};
        fomatData(result.content);
        // console.log(result);
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

function fomatData(array){
    const size = array.length;
    for (let i = 0; i < size; ++i){
        const countryId = array[i].country.id;
        if (!(countryId in data)){
            data[countryId] = {};
        }
        const date = array[i].date;
        const val = array[i].value;
        data[countryId][date] = val;
    }

}
