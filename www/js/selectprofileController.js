SpecialScholars
.controller('selectprofileController', function($scope, $location, $localStorage, profileService, $timeout){
            $scope.selected = {profilename: null};
            
            $scope.selectProfile = function(value){
            profileService.selectProfile($scope.selected.profilename);
            $timeout(function(){
            $scope.selectprofilemodal.hide();
                     }, 300);
            }
            $scope.closeModal = function(){
            $scope.selectprofilemodal.hide();
            }
            $scope.$on('modal.shown', function() {
                       // Execute action
                       $scope.profiles = $localStorage.profiles;
                       
                       var j=0;
                       var selection = $localStorage.selectedProfile;
                       for (var i=0; i<$scope.profiles.length;i++){
                       
                       if(selection == $scope.profiles[i].profilename)
                       $scope.selected.profilename = selection;
                       var path=null;
                       if(ionic.Platform.isAndroid())
                       path = cordova.file.dataDirectory;
                       else if (ionic.Platform.isIOS())
                       path =cordova.file.documentsDirectory;
                       

                       window.resolveLocalFileSystemURL(path + $scope.profiles[i].profilename, function(fileEntry) {
                                                        var url = fileEntry.toURL();
                                                       // $scope.profiles[j].profilepic = url;
                                                        $scope.profiles[j].pictureURL = url;
                                                                                                              j++;
                                                        }, $scope.fail);
                       }
                       });
            $scope.fail = function(){
            }
                 });