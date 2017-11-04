import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// ============== Route ======================//
FlowRouter.route('/',{
    name: 'home',
    action(params, queryParams){
        BlazeLayout.render('home');
    }
});

FlowRouter.route('/quiz',{
    name: 'quiz',
    action(params, queryParams){
        BlazeLayout.render('basic_info');
    }
});

// =========== Event Handling ===============//
Template.home.events({
    'submit .goto-basic-info'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      FlowRouter.go('/quiz');
    },
});

Template.basic_info.events({
  'submit .submit-basic-info'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    console.log(event.target);
    var ageGroup = event.target.inputAge.value;
    var gender = event.target.genderRadios.value;
    // store the variable somewhere
    BlazeLayout.render('quiz');
    console.log(ageGroup);
    console.log(gender);
  },
});
