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
    if(countryCode === 'Unknown') countryCode = 'GB';

    questions = [];
    allQuestions = getQuestions();
    for (i=0; i<allQuestions.length; i++){
      content = allQuestions[i][languageCode];
      if(!content) content = allQuestions[i].EN;

      prompt = substituteString(content.prompt.text, content.prompt.params);

      choices=[]
      for (j=0;j<content.choices.length;j++){
        choices.push({text: substituteString(content.choices[j].text, content.choices[j].params), score: content.choices[j].score})
      }

      sol = substituteString(content.solution.text, content.solution.params);

      questions.push({
        no: allQuestions[i].no,
        prompt: prompt,
        choices: choices,
        solution: sol
      })
    }
    return questions;
  },
}
