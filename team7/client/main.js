import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// ============== Route ======================//
FlowRouter.route('/basic_info', {
  name: 'basic.info',
  action(params, queryParams) {
     BlazeLayout.render('basic_info');
  }
});

FlowRouter.route('/',{
    name: 'home',
    action(params, queryParams){
        console.log('home');
        BlazeLayout.render('home');
    }
});

// =========== Event Handling ===============//
Template.home.events({
    'submit .goto-basic-info'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      FlowRouter.go('/basic_info');
    },
});

Template.basic_info.events({
  'submit .submit-basic-info'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var age = event.target.inputAge.value;
    var gender = event.target.genderRadios.value;
    console.log(age);
    console.log(gender);
  },
});
