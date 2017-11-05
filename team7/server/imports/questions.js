import { dbQuestions } from '/server/imports/dbCollections.js';
import { dataFetcher } from '/server/imports/fetchDataSources.js';

export { Questions };

let getQuestions = function(){
  return dbQuestions.find({}, {sort: {no: -1}}).fetch();
};

function selectRandom(cc) {
  const topic = dataFetcher.topic[Math.floor(Math.random() * dataFetcher.topic.length)];
  if(dataFetcher.data[topic][cc].length === 0) { cc = 'GB'; }
  const year = Object.keys(dataFetcher.data[topic][cc])[Math.floor(Math.random() * Object.keys(dataFetcher.data[topic][cc]).length)];
  return {topic: topic, year: year, country: cc};
}

//substituteString("Test %s and %s.", ["3", "coding"]) => "Test 3 and coding."
function substituteString(str, args, settings) {
    let i = 0;
    return str.replace(/%s/g, function() {
        if (args[i] == "CorrectAnswer") {
          i++;
          return Math.round(dataFetcher.data[settings.topic][settings.country][settings.year]);
        }
        if(args[i]=="randomTopic"){
          i++;
          return dataFetcher.topicFullName[settings.topic];
        }

        if(args[i]=="randomYear"){
          i++;
          return settings.year;
        }
        return args[i++];
    });
}

let Questions = {
  generateQuestions: function (countryCode, languageCode) {
    if(countryCode === 'Unknown') { countryCode = 'GB'; }

    questions = [];
    allQuestions = getQuestions();
    for (i=0; i<5; i++){
      content = allQuestions[0][languageCode];
      if(!content) content = allQuestions[i].EN;

      settings = selectRandom(countryCode);
      console.log(settings);

      prompt = substituteString(content.prompt.text, content.prompt.params, settings);

      choices=[];
      for (j=0;j<content.choices.length;j++){
        choices.push({text: substituteString(content.choices[j].text, content.choices[j].params, settings), score: content.choices[j].score})
      }

      sol = substituteString(content.solution.text, content.solution.params, settings);

      questions.push({
        no: allQuestions[0].no+JSON.stringify(settings),
        prompt: prompt,
        choices: choices,
        solution: sol
      })
    }
    return questions;
  },
};
