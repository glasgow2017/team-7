import { Template } from 'meteor/templating';

import './main.html';

questionNum = new ReactiveVar(0);
questionVar = new ReactiveVar("");
choiceVar = new ReactiveVar([]);
qNum = 0;
questionList = [];

// ============== Route ======================//
FlowRouter.route('/', {
    name: 'home',
    action(params, queryParams) {
        BlazeLayout.render('home');
    }
});

FlowRouter.route('/quiz', {
    name: 'quiz',
    action(params, queryParams) {
        BlazeLayout.render('basic_info');
    }
});

// =========== Event Handling ===============//
Template.home.events({
    'submit .goto-basic-info'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        console.log('home event');

        //Get client location based on IP
        //   Meteor.call('getClientIPCountry', (err, result) => {
        //       if(!err) {
        //           console.log(result === 'Unknown' ? 'n/a' : result);
        //       }
        //   });

        // Get value from form element
        FlowRouter.go('/quiz');
    },
});

Template.basic_info.events({
    'submit .submit-basic-info'(event) {
        console.log('basic_info event');
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const ageGroup = event.target.inputAge.value;
        const gender = event.target.genderRadios.value;
        const qLang = event.target.inputLang.value;
        // store the variable somewhere

        console.log(ageGroup);
        console.log(gender);
        console.log(qLang);

        // Fetch questions from server
        Meteor.call('getQuestions', "GB", qLang, (err, result) => {
            if (!err) {
                qNum = 0;
                questionList = result;
                renderQuestion(questionList,qNum);
                BlazeLayout.render('quiz');
            }
            else {
                alert('Error fetching questions from server');
            }
        });
    },
});

Template.quiz.events({
    'submit'(event){
        console.log('quiz event');
        event.preventDefault();
        qNum++;
        if (qNum < questionList.length){
            renderQuestion(questionList,qNum);
        }else{
            // go to end page;
            console.log('end');
        }

    },
});

Template.quiz.helpers({
    'questionNum'(){
        return questionNum.get();
    },
    'question'(){
            return questionVar.get();
    },
    'choice'(){
        return choiceVar.get();
    },
});


function renderQuestion(questions,qNum){
    const size = questions.length;
    /*
    console.log(size);
    temp = []
    for (let i = 0; i< size;++i){
        temp.push(questions[i].choice);
    }*/
    questionNum.set(qNum + 1);
    questionVar.set(questions[qNum].prompt);
    choiceVar.set(    questions[qNum].choices );


}
