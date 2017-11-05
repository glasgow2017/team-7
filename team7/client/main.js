import { Template } from 'meteor/templating';

import './main.html';

let QUESTIONS;

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
        // store the variable somewhere

        console.log(ageGroup);
        console.log(gender);

        // Fetch questions from server
        Meteor.call('getQuestions', (err, result) => {
            if (!err) {
                QUESTIONS = result;
                console.log(QUESTIONS);
                BlazeLayout.render('quiz');
            }
            else {
                alert('Error fetching questions from server');
            }
        });
    },
});
