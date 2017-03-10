'use strict';

angular.module('yourStlCourts').controller('HomeCtrl', function (TicketFinder, $state, municipalities, courts, PageMessage) {
  var ctrl = this;
  PageMessage.setMessage('Get Court Date Reminders on your<br>phone. Text "HELP" to <b>(314) 254-8050</b>');
  ctrl.citySearchGroups = [];
  ctrl.municipalities = municipalities;
  ctrl.selectedCitySearchGroup = null;
  ctrl.finderSelected = TicketFinder.TicketFinderToSelect.NONE;

  ctrl.updateFinderSelected = function(ticketFinderToSelect){
    ctrl.finderSelected = ticketFinderToSelect;
  };

  ctrl.clearTicketFinder = function(){
    ctrl.finderSelected = TicketFinder.TicketFinderToSelect.NONE;
  };

  ctrl.onCitySearchGroupSelected  = function(){
    $state.go('courtSearchInfo', {courtId : ctrl.selectedCitySearchGroup.court.id});
  };

  ctrl.groupCourts = function(citySearchGroup) {
    return citySearchGroup.municipalityCourtCount > 1 ? citySearchGroup.municipalityName : undefined; //undefined causes no group to be made
  };

  function populateCitySearchGroups() {
    var groups = [];
    municipalities.forEach(function(municipality) {
      municipality.courts.forEach(function(courtId) {
        groups.push({
          municipalityName: municipality.name,
          municipalityCourtCount: municipality.courts.length,
          court: _.find(courts, {id: parseInt(courtId)})
        });
      });
    });

    ctrl.citySearchGroups = groups;
  }

  populateCitySearchGroups();
});
