"use strict";angular.module("envConfig",[]).constant("ENV",{name:"Production",apiEndpoint:"http://gh-web-services.herokuapp.com/inveo-api/"}),angular.module("ghAngularApp",["ngResource","ngSanitize","ngTouch","envConfig"]),angular.module("ghAngularApp").controller("MainCtrl",["$http","ENV",function(a,b){a.get(b.apiEndpoint+"userData").then(function(){console.log("SUCCESS")},function(){console.error("FAIL")})}]),angular.module("ghAngularApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.c582c4d1.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);