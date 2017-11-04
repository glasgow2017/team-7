import { dbQuestions } from '/server/imports/dbCollections.js';

fuction getQuestions(){
  return dbQuestions.find({}, {sort: {no: 1}}).fetch();
}

//substituteString("Test %s and %s.", ["3", "coding"]) => "Test 3 and coding."
function substituteString(str, args) {
    var i = 0;
    return str.replace(/%s/g, function() {
        return args[i++];
    });
}
