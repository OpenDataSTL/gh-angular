'use strict';

angular.module('yourStlCourts').controller('HelpCtrl', function (faqData,PageMessage) {
  var ctrl = this;
  ctrl.faqData = faqData;
  PageMessage.setMessage('Get Court Date Reminders on your<br>phone. Text "HELP" to <b>(314) 254-8050</b>');
});
