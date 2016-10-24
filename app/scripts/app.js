'use strict';

angular.module('yourStlCourts', ['ngResource', 'ngSanitize', 'ngTouch', 'envConfig', 'ui.router', 'esri.map', 'toaster',
  'ui.bootstrap', 'ui.select', 'jcs-autoValidate','ui-leaflet']);

angular.module('yourStlCourts').config(function($stateProvider, $urlRouterProvider, $locationProvider, ENV, $httpProvider, uiSelectConfig) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as ctrl',
      resolve: {
        municipalities: function(Courts){
          return Courts.findAll();
        }
      }
    })
    .state('error',{
      url: '/error',
      templateUrl: 'views/error.html',
      controller: 'ErrorCtrl as ctrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html'
    })
    .state('help', {
      url: '/help',
      templateUrl: 'views/help.html'
    })
    .state('info', {
      url: '/info',
      templateUrl: 'views/info.html'
    })
    .state('legal', {
          url: '/legal',
          templateUrl: 'views/legal.html'
    })
    .state('privacy', {
          url: '/privacy',
          templateUrl: 'views/privacy.html'
    })
    .state('ticketSearch', {
      url: '/tickets/search',
      templateUrl: 'views/ticketSearch.html',
      controller: 'ticketSearchCtrl as ctrl',
      resolve: {
        municipalities: function(Courts){
          return Courts.findAll();
        }
      }
    })
    .state('courtSearchInfo', {
      url: '/courts/{courtId}',
      templateUrl: 'views/courtSearchInfo.html',
      controller: 'CourtSearchInfoCtrl as ctrl',
      params: {
        court: {value: undefined}
      },
      resolve: {
        court: function ($stateParams,Courts,Error) {
          if ($stateParams.courtId == "") {
            throw Error.errorObject(ErrorCode.BAD_REQUEST, "No Court was found with the url you provided.");
          } else {
            return (Courts.findById($stateParams.courtId)
              .then(function (court) {
                return court;
              },function(){
                throw Error.errorObject(ErrorCode.NOT_FOUND, "No Court was found with the url you provided.");
              }))
          }
        }
      }
    })
    .state('citationInfo', {
      url: '/tickets/info',
      templateUrl: 'views/citationInfo.html',
      controller: 'citationInfoCtrl as ctrl',
      params: {
        citations: { value : undefined }
      },
      resolve: {
        citations: function($stateParams) {
          return $stateParams.citations;
        }
      }
    })
    .state('paymentOptions', {
      url: '/paymentOptions/:citationId',
      templateUrl: 'views/PaymentOptions.html',
      controller: 'PaymentOptionsCtrl as ctrl',
      resolve: {
        citation: function($stateParams, Citations) {
          return Citations.getByCitationId($stateParams.citationId);
        }
      }
    })
    .state('communityService',{
      url: '/communityService',
      templateUrl: 'views/CommunityService.html'
      //controller: 'CommunityServiceCtrl as ctrl'
    })
    .state('opportunityDetails', {
      url: '/opportunityDetails',
      templateUrl: 'views/opportunityDetails.html',
      controller: 'OpportunityDetailsCtrl as ctrl'
    })
    .state('sponsorLogin', {
      url: '/sponsorLogin',
      templateUrl: 'views/sponsorLogin.html',
      controller: 'SponsorLoginCtrl as ctrl'
    })
    .state('sponsorMgmt', {
      url: '/sponsorMgmt',
      templateUrl: 'views/sponsorManagement.html',
      controller: 'SponsorMgmtCtrl as ctrl',
      resolve: {
        opportunities: function(Opportunities, Auth){
          return Opportunities.findBySponsorId(Auth.getAuthenticatedSponsor().id);
        },
        courts: function(Courts){
          return Courts.findAll();
        }
      }
    });

  $httpProvider.interceptors.push(function(){
    return {
      request: function(config) {
        // prepend base url
        if(config.url.indexOf('.html') < 0) {
          config.url = ENV.apiEndpoint + config.url;
        }
        return config;
      }
    };
  });

  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;
  uiSelectConfig.closeOnSelect = true;
  uiSelectConfig.searchEnabled = true;
});

angular.module('yourStlCourts').run(function ($rootScope,$state,validator, validationElementModifier, errorMessageResolver) {
    validator.registerDomModifier(validationElementModifier.key, validationElementModifier);
    validator.setDefaultElementModifier(validationElementModifier.key);
    validator.setValidElementStyling(false);
    validator.setErrorMessageResolver(errorMessageResolver.resolve);
    $rootScope.$on('$stateChangeError',function(event, toState,toParams,fromState,fromParams,error){
      event.preventDefault();
      $state.go('error');
    });
  }
);
