SpecialScholars
.controller('newprofileController', function($rootScope,$scope, Camera, $localStorage, $cordovaFile, profileService){
            $scope.newprofile = {profilename: null,pictureURL:"img/picture_placeholder.png"};
            $scope.path = null;
            $scope.alertmessage = null;
            $scope.closeModal = function(){
            $scope.newprofilemodal.hide();
            }

            $scope.takePicture = function (options) {
            var width = 100;
            var height = 100;
            var options = {quality : 75, targetWidth: width, targetHeight: height, sourceType: 0};
            Camera.getPicture(options)
            .then(function(sourcePath) {
                  $scope.path = sourcePath;
                  $scope.newprofile.pictureURL= $scope.path;
                                  },function(err) {
                  console.log(err);
            });
            };
            
            $scope.$on('modal.hidden', function(){
                        $scope.path = null;
                       $scope.newprofile = {profilename: null,pictureURL:"img/picture_placeholder.png"};
                       angular.element(document.querySelector("#profileid")).removeClass("highlightempty");
                       angular.element(document.querySelector("#profileimgid")).removeClass("highlightempty");
                       angular.element(document.querySelector("#alertid")).css({display: 'none'});
                       
                       });
            
            $scope.saveNewProfile = function(){
            if(!$scope.newprofile.profilename){
            angular.element(document.querySelector("#profileid")).addClass("highlightempty");
            $scope.alertmessage = "Add Profile Name";
            angular.element(document.querySelector("#alertid")).css({display: 'inline'});
            return;
            }else{
            for (var i=0; i< $localStorage.profiles.length;i++){
            if (($scope.newprofile.profilename).toLowerCase() == ($localStorage.profiles[i].profilename).toLowerCase()){
            angular.element(document.querySelector("#profileid")).addClass("highlightempty");
            $scope.alertmessage = "Profile Already Exits";
            angular.element(document.querySelector("#alertid")).css({display: 'inline'});
            return;
            }
            }
            if(angular.element(document.querySelector("#profileid")).hasClass("highlightempty"))
            angular.element(document.querySelector("#profileid")).removeClass("highlightempty");
            angular.element(document.querySelector("#alertid")).css({display: 'none'});
            }
            if(!$scope.path){
            angular.element(document.querySelector("#profileimgid")).addClass("highlightempty");
            $scope.alertmessage = "Add Profile Picture";
            angular.element(document.querySelector("#alertid")).css({display: 'inline'});
            return;
            
            }else{
            if(angular.element(document.querySelector("#profileimgid")).hasClass("highlightempty"))
            angular.element(document.querySelector("#profileimgid")).removeClass("highlightempty");
            angular.element(document.querySelector("#alertid")).css({display: 'none'});

            }
                var sourceDirectory = $scope.path.substring(0, $scope.path.lastIndexOf('/') + 1);
                var sourceFileName = $scope.path.substring($scope.path.lastIndexOf('/') + 1, $scope.path.length);
            var destinationDirectory=null;
            if(ionic.Platform.isAndroid())
            destinationDirectory = cordova.file.dataDirectory;
            else if (ionic.Platform.isIOS())
            destinationDirectory =cordova.file.documentsDirectory;
            
            window.resolveLocalFileSystemURL(destinationDirectory + $scope.newprofile.profilename, function (dir) {
                                             }, function () {
                                             var fileTransfer = new FileTransfer();
                                             //   var url = cordova.file.applicationDirectory + ("www/" + filename);
                                             var url = encodeURI($scope.path);
                                             fileTransfer.download(url, destinationDirectory + $scope.newprofile.profilename,
                                                                   function (entry) {
                                                                   var tempprofile = {profilename: null,
                                                                   pictureURL: null};
                                                                   var name = $scope.newprofile.profilename;
                                                                   var url = (destinationDirectory + name);
                                                                   tempprofile = {profilename: $scope.newprofile.profilename,
                                                                   pictureURL: url};
                                                                   $localStorage.profiles.push(tempprofile);
                                                                   //$rootScope.profilesupdated = true;
                                                                   profileService.setProfilesChanged($localStorage.profiles);
                                                                   $scope.newprofilemodal.hide();
                                                                   //    urlToUse = entry.toNativeURL();
                                                                   },
                                                                   function (err) {
                                                                   console.log(JSON.stringify(err));
                                                                   })
                                             }, function (e) { console.log(JSON.stringify(e));});
            
            }
           
                          
            });


