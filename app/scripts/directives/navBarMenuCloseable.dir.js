 'use strict';

  angular.module('yourStlCourts').directive('navBarMenuCloseable', function($document){
    return{
      restrict: 'A',
      link: function($scope,element,attrs){
        $document.on('click',function (event) {
          var clickover = $(event.target);
          var _opened = $(".navbar-collapse").hasClass("collapse in");
          if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
          }
        });

        element.on('$destroy',function(){
          $document.off('click');
        });
      }
    }
  });

