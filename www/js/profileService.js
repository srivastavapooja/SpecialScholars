SpecialScholars
.factory('profileService', function($localStorage, $rootScope) {
         var currentprofile = {};
         
         currentprofile.selectProfile = function(name){
         $localStorage.selectedProfile = name;
         $rootScope.$broadcast("selectedProfileChanged", name);
         }
         currentprofile.setProfilesChanged = function(profilelist){
         $rootScope.$broadcast("profilesupdated");
         }
         
         return currentprofile;
         
         
         });