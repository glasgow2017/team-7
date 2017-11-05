import { dbResponses } from '/server/imports/dbCollections.js';

export { recordResponses };

let recordResponses = {
  record: function (data) {
    //validate data
    dbResponses.insert(data);
  },
}
