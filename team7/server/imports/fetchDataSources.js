import { HTTP } from 'meteor/http';

const TOPICS = ['SL.TLF.TOTL.FE.ZS', 'SG.VAW.1549.ZS', 'SE.SEC.ENRL.FE.ZS'];
const LIMIT = 10000;
const YEAR_RANGE = 10;
const YEAR_L = new Date().getFullYear() - (1 + YEAR_RANGE);
const YEAR_U = new Date().getFullYear() - 1;

let DATA = {};


function fetchData() {
    try {
        for (let i = 0; i < TOPICS.length; i++) {
            const response = HTTP.get(`http://api.worldbank.org/countries/indicators/${TOPICS[i]}?format=json&per_page=${LIMIT}&date=${YEAR_L}:${YEAR_U}`);
            const parseResponse = JSON.parse(response.content);
            const result = {
                status: response.statusCode,
                meta: parseResponse[0],
                content: removeNullValues(parseResponse[1])
            };
            formatData(TOPICS[i], result.content);
            // console.log(result);
        }
        console.log(DATA);
    } catch (e) {
        console.log(e);
    }
}

function removeNullValues(array) {
    let formattedArray = [];
    const size = array.length;
    for (let i = 0; i < size; i++) {
        if (array[i].value !== null) {
            formattedArray.push(array[i]);
        }
    }
    return formattedArray;
}

function formatData(topic, array) {
    const size = array.length;
    let data = {};
    for (let i = 0; i < size; ++i) {
        const countryId = array[i].country.id;
        if (!(countryId in data)) {
            data[countryId] = {};
        }
        data[countryId][array[i].date] = array[i].value;
    }
    DATA[topic] = data;
}


let dataFetcher = {
    fetch: fetchData,
    data: DATA,
    topic: TOPICS
};

export { dataFetcher };
