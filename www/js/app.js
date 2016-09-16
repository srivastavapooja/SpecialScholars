var SpecialScholars = angular.module('SpecialScholars', ['ionic', 'ngRoute','ngCordova','ngStorage']);
SpecialScholars.config(['$routeProvider', function($routeProvider){
                     $routeProvider
                     .when('/home', {
                                         templateUrl: 'partials/home.html',
                                         controller: 'SpecialScholarsctrl'
                                         })
                      .when('/grade/:name', {
                            templateUrl: 'partials/grade.html',
                            controller: 'gradecontentctrl',
                            
                            }
                            )
                      .when('/chapter/:name/:url', {
                            templateUrl: 'partials/chapter.html',
                            controller: 'chapterctrl',
                            
                            })
                      .when('/profilerecord', {
                            templateUrl: 'partials/profilerecord.html',
                            controller: 'profilerecordController'
                            
                            })
                     .otherwise({
                                redirectTo: '/home'
                     });
                     }]);

SpecialScholars.controller('SpecialScholarsctrl', function($rootScope,$scope, $localStorage, $location, $ionicModal,$timeout, $ionicPlatform, profileService, $ionicPopover, profilerecordservice){
                        
                         var grades = [{img: "img/beginner.jpg", gradeurl: "#/grade/Beginner"},
                                       {img: "img/advanced.jpg", gradeurl: "#/grade/Advanced"},
                                       {img: "img/genius.jpg", gradeurl: "#/grade/Genius"}];
                   /*      $scope.grades_line1 = [{img: "img/grade1.jpg", gradeurl: "#/grade/1"},
                                                {img: "img/grade2.jpg", gradeurl: "#/grade/2"}];
                         $scope.grades_line2 = [{img: "img/grade3.jpg", gradeurl: "#/grade/3"},
                                                {img: "img/grade4.jpg", gradeurl: "#/grade/4"}];
                         $scope.grades_line3 = [{img: "img/grade5.jpg", gradeurl: "#/grade/5"}];*/
                         $scope.grades = grades;
                         $scope.currentProfile = {picture: null, name: null};
                         $rootScope.profiles =[];
                         $localStorage = $localStorage.$default({
                                                                profiles: [],
                                                                selectedProfile: null
                                                                });
                         
                         $scope.$on("selectedProfileChanged", function(event, newprofile){
                                        if(newprofile){
                                    angular.element(document.querySelector("#profiledisplay")).css({display: 'inline'});
                                    var path = null;
                                    if(ionic.Platform.isAndroid())
                                    path = cordova.file.dataDirectory;
                                    else if (ionic.Platform.isIOS())
                                    path =cordova.file.documentsDirectory;

                                           window.resolveLocalFileSystemURL(path + newprofile,
                                                                            function(fileEntry) {
                                                                            var url = fileEntry.toURL();
                                                                            //alert("url = "+url);
                                                                            $scope.currentProfile.picture = url;
                                                                            $scope.currentProfile.name = newprofile;
                                                                            $timeout(function(){$scope.$apply();});
                                                                            }, function(err){alert("error");});
                                           }
                                           else{
                                           $scope.currentProfile = {picture: null, name: null};
                                        angular.element(document.querySelector("#profiledisplay")).css({display: 'none'});
                                           }
                                           });
                                           
                        $ionicPlatform.ready(function () {
                                       
                                                  var j=0;
                                                var path = null;
                                             if(ionic.Platform.isAndroid())
                                             path = cordova.file.dataDirectory;
                                             else if (ionic.Platform.isIOS())
                                             path =cordova.file.documentsDirectory;

                                                  for (var i=0; i< $localStorage.profiles.length;i++){
                                                  var filename = path + $localStorage.profiles[i].profilename;
                                                  window.resolveLocalFileSystemURL(filename,function(fileEntry) {
                                                                    var url = fileEntry.toURL();
                                                                    $localStorage.profiles[j].pictureURL = url;
                                                                    if($localStorage.selectedProfile == $localStorage.profiles[j].profilename){
                                                                                   profileService.selectProfile($localStorage.selectedProfile);
                    
                                                                                   }
                                                                                   j++;
                                                                                   }, function(err){alert("error");});
                                                  }
                                             
                                           
                                              });
                         $ionicModal.fromTemplateUrl('settings.html', {
                                                     id: 'settings',
                                                     scope: $scope,
                                                     animation: 'slide-in-up'
                                                     }).then(function(modal) {
                                                             $scope.settingsmodal = modal;
                                                             });
                         $ionicModal.fromTemplateUrl('partials/add_deleteprofile.html', {
                                                     id: 'adddelprofile',
                                                     scope: $scope,
                                                     backdropClickToClose: false,
                                                     animation: 'slide-in-up'
                                                     }).then(function(modal) {
                                                             $scope.adddelprofilemodal = modal;
                                                             });

                         $ionicModal.fromTemplateUrl('partials/newprofile.html', {
                                                     id: 'newprofile',
                                                     scope: $scope,
                                                     backdropClickToClose: false,
                                                     animation: 'slide-in-up'
                                                     }).then(function(modal) {
                                                             $scope.newprofilemodal = modal;
                                                             });
                         $ionicModal.fromTemplateUrl('partials/selectprofile.html', {
                                                     id: 'selectprofile',
                                                     scope: $scope,
                                                     backdropClickToClose: false,
                                                     animation: 'slide-in-up'
                                                     }).then(function(modal) {
                                                             $scope.selectprofilemodal = modal;
                                                             });
                         
                         $ionicModal.fromTemplateUrl('partials/help.html', {
                                                     id: 'help',
                                                     scope: $scope,
                                                     backdropClickToClose: false,
                                                     animation: 'slide-in-up'
                                                     }).then(function(modal) {
                                                             $scope.helpmodal = modal;
                                                             });
                         

                         $scope.openModal = function(name) {
                         switch(name){
                         case 'settings':
                         $scope.settingsmodal.show();
                         break;
                         case 'newprofile':
                         $scope.newprofilemodal.show();
                         break;
                         case 'selectprofile':
                         $scope.selectprofilemodal.show();
                         break;
                         case 'adddelprofile':
                         $scope.adddelprofilemodal.show();
                         break;
                         case 'record':
                         $scope.recordmodal.show();
                         break;
                         case 'help':
                         $scope.helpmodal.show();
                         break;
                         }
                         };
                         $scope.closeModal = function(name) {
                         switch(name){
                         case 'settings':
                         $scope.settingsmodal.hide();
                         break;
                         case 'help':
                         $scope.helpmodal.hide();
                         break;
                         }
                         };
                         $ionicPopover.fromTemplateUrl('popover.html', {
                                                       scope: $scope
                                                       }).then(function(popover) {
                                                               $scope.popover = popover;
                                                               });
                         $scope.handleRecordPopover = function($event) {
                         if ($scope.currentProfile.name){
                         profilerecordservice.setPopover($scope.popover);
                         $scope.popover.show($event);
                         }
                         };
                         
                         $scope.closePopover = function() {
                         $scope.popover.hide();
                         };
                         
                         
                        });



SpecialScholars.run(function($ionicPlatform) {
                     
                     $ionicPlatform.ready(function() {
                                          
                                          screen.lockOrientation('landscape');
                                          if(window.cordova && window.cordova.plugins.Keyboard) {
                                          // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                                          // for form inputs)
                                          
                                          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                                          
                                          // Don't remove this line unless you know what you are doing. It stops the viewport
                                          // from snapping when text inputs are focused. Ionic handles this internally for
                                          // a much nicer keyboard experience.
                                          cordova.plugins.Keyboard.disableScroll(true);
                                          }
                                          
                                          if(window.StatusBar) {
                                          StatusBar.hide();
                                          }
                                    });
                  
                     })
