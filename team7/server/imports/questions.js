import { dbQuestions } from '/server/imports/dbCollections.js';

export { Questions };

let getQuestions = function(){
  return dbQuestions.find({}, {sort: {no: 1}}).fetch();
}

//substituteString("Test %s and %s.", ["3", "coding"]) => "Test 3 and coding."
function substituteString(str, args) {
    var i = 0;
    return str.replace(/%s/g, function() {
        return args[i++];
    });
}

let Questions = {
  generateQuestions: function (countryCode, languageCode) {
    questions = [];
    //allQuestions = getQuestions();
      questions.push({
        no: 2,
        prompt: "temp prompt",
        choices: [
          {text: "Choice A", score: 1},
          {text: "Choice B", score: 0.5},
          {text: "Choice C", score: 0},
        ]
      })
    console.log(questions);
    return questions;
  },
}
