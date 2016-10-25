'use strict';

angular.module('yourStlCourts').controller('SponsorLoginCtrl', function ($state, toaster, Sponsor, Auth) {
  var ctrl = this;
  if(Auth.isAuthenticated()){
    $state.go('sponsorMgmt');
  }

  // Setup form binding object/fields
  ctrl.credentials = {};
  ctrl.credentials.userId = "";
  ctrl.credentials.password = "";

  // Function for form submit
  ctrl.DoSponsorLogin = function (sponsorLoginFrm) {
    if (sponsorLoginFrm.$valid) {
      Sponsor.Login(ctrl.credentials).then(function (response) {
        Auth.authenticate(response.data);
        toaster.pop('success', 'Welcome back ' + response.data.name);
        $state.go('sponsorMgmt');
      }, function () {
        toaster.pop('error', 'There was an error logging in.');
      });
    } else {
      toaster.pop('error', 'Please provide the required information');
    }
  };
});
