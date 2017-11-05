import { Template } from 'meteor/templating';

import './main.html';

questionNum = new ReactiveVar(0);
questionVar = new ReactiveVar("");
choiceVar = new ReactiveVar([]);
totalScoreVar = new ReactiveVar(0);
solutionVar = new ReactiveVar([]);
qNum = 0;
questionList = [];
totalscore = 0.0;

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

FlowRouter.route('/result',{
    name: 'result',
    action(params,queryParams){
        BlazeLayout.render('result_page')
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
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const ageGroup = event.target.inputAge.value;
        const gender = event.target.genderRadios.value;
        const qLang = event.target.inputLang.value;
        // store the variable somewhere

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
    'submit .quiz-question'(event){ //Check Answer
        console.log('quiz-question')
        event.preventDefault();

        totalscore+=parseFloat(event.target.question1Answer.value);
        totalScoreVar.set(totalscore);
        //Show solution
        solutionVar.set[{a:"aaa"}];
        //Disable btn

    },
    'submit .quiz-next'(event){ //Next Question
        event.preventDefault();
        //Clear solution
        solutionVar.set([]);
        qNum++;
        if (qNum < questionList.length){
          renderQuestion(questionList,qNum);
        } else{
            // go to end page;
            FlowRouter.go('/result');
        }

    },
});

Template.quiz.helpers({
    'solution'(){
        return solutionVar.get();
    },
    'totalScore'(){
        return totalScoreVar.get();
    },
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

Template.result_page.helpers({
    'totalScore'(){
        return totalScoreVar.get();
    }
});

Template.result_page.events({
    'click .back-home'(event){
        console.log('in');
        event.preventDefault();
        FlowRouter.go('home');
    },
});


function renderQuestion(questions,qNum){
    questionNum.set(qNum + 1);
    questionVar.set(questions[qNum].prompt);
    choiceVar.set(questions[qNum].choices);

}
