'use strict';

angular.module('yourStlCourts').controller('FooterCtrl', function (Contact) {
  var ctrl = this;
  ctrl.email = Contact.email;

  ctrl.copyRightYears = function(){
    var startingYear = 2016;
    var crStmt = startingYear;
    var today = new Date();
    var year = today.getFullYear();
    if (year > startingYear)
      crStmt = startingYear + "-" + year;
    return crStmt;
  }
});
