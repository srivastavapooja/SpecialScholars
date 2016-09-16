SpecialScholars
.controller('adddelprofileController', function($scope, $location, $localStorage, $rootScope, $timeout, $cordovaFile, profileService){
             $scope.profileslist = [];
            $scope.closeModal = function(){
            $scope.adddelprofilemodal.hide();
            }
            
            $rootScope.$on("profilesupdated", function(event, profilelist){
                              //$rootScope.profilesupdated = false;
                              var savedprofiles = profilelist;
                              for (var i=0; i< $localStorage.profiles.length;i++){
                              var temp = {profilename: $localStorage.profiles[i].profilename, pictureURL: $localStorage.profiles[i].pictureURL};
                              $scope.profileslist[i] = temp;
                              }
                              for(var i= $localStorage.profiles.length; i<3; i++){
                              var temp = {profilename: null, pictureURL: "img/new_profile.jpg"};
                              $scope.profileslist[i] = temp;
                              }
                              
                              //$scope.$apply();

                              
                              });
            $scope.$on('modal.shown', function() {
                       // Execute action
                      
                  //     var savedprofiles = $localStorage.profiles;
                       
                       for (var i=0; i< $localStorage.profiles.length;i++){
                       var temp = {profilename: $localStorage.profiles[i].profilename, pictureURL: $localStorage.profiles[i].pictureURL};
                       $scope.profileslist[i] = temp;
                       
                       }
                       for(var i= $localStorage.profiles.length; i<3; i++){
                       var temp = {profilename: null, pictureURL: "img/new_profile.jpg"};
                       $scope.profileslist[i] = temp;
                       }
                       
           });
            $scope.addprofile = function(pname){
            if (!pname){
            $scope.openModal('newprofile');
            }
            else {
            angular.element(document.querySelector("#deleteprofileid_"+pname)).css({display: 'none'});
            }
            }
            $scope.hidedeletebtn = function(){
            var btns = document.getElementsByClassName("icon ion-close-circled deleteprofileicon");
            for (var i=0; i< btns.length;i++){
            angular.element(btns[i]).css({display: 'none'});
            }
            }
            $scope.showdeletebtn = function(name){
            if(name){
            var id= "deleteprofileid_"+name;
            //angular.element(document.querySelector(id)).css({display: 'inline'});
            var btns = document.getElementsByClassName("icon ion-close-circled deleteprofileicon");
            for (var i=0; i< btns.length;i++){
            var selectedId = angular.element(btns[i]).attr("id");
            if(selectedId == id){
            angular.element(btns[i]).css({display: 'inline'});
            }
            }
            }
            }
            $scope.deleteprofile = function(data){
            var index=0;
            for (var i=0; i< $localStorage.profiles.length;i++){
            if(data == $localStorage.profiles[i].profilename)
            index = i;
            }
            
            var directory = $localStorage.profiles[index].pictureURL.substring(0, $localStorage.profiles[index].pictureURL.lastIndexOf('/') + 1);
            var fileName = $localStorage.profiles[index].pictureURL.substring($localStorage.profiles[index].pictureURL.lastIndexOf('/') + 1, $localStorage.profiles[index].pictureURL.length);

            $localStorage.profiles.splice(index,1);
            $cordovaFile.removeFile(directory,fileName)
            .then(function(success) {
                  
                  },function(error) {
                  console.log(error);
                  });
            var recordfile = fileName+"_record.txt";
            var basepath = null;
            if(ionic.Platform.isAndroid())
            basepath = cordova.file.dataDirectory;
            else if (ionic.Platform.isIOS())
            basepath =cordova.file.documentsDirectory;
            var path = basepath + recordfile;
            if($cordovaFile.checkFile(basepath,recordfile)){
            window.resolveLocalFileSystemURL(basepath,
                                             function(dir) {
                                             dir.getFile(recordfile, {create: false}, function(fileEntry){
                                                         fileEntry.remove(function(){
                                                                          }, function(e){console.log("recordfile nor deleted");});
                                                         
                                             }, function(e){});
                                             });
            }
            else{
            console.log("recordfile not found");
            }
            if($localStorage.selectedProfile == data){
            //$localStorage.selectedProfile = null;
            //$rootScope.profileSelected = true;
            var profile = null;
            profileService.selectProfile(profile);
            
            }
            //$rootScope.profilesupdated = true;
            profileService.setProfilesChanged($localStorage.profiles);
            }
            });