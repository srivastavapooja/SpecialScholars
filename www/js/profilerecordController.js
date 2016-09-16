SpecialScholars
.controller('profilerecordController', function($scope, $rootScope, $localStorage, profilerecordservice, profileService, $window){
            var init = function(){
            var popover = profilerecordservice.getPopover();
            popover.hide();
          //  $scope.popover.hide();
            }
            
            $scope.results = [];
            $scope.averages = [];
            $scope.record = [];
            $scope.profile = null;
            $scope.alertdata = null;
            
            
            var currprofile = $localStorage.selectedProfile;
            if(currprofile){
                       $scope.profile = currprofile;
            profilerecordservice.readRecord(currprofile)
            .then(function(response){
                  if(response){
                  $scope.results = JSON.parse(response);
                  for (var i=0; i<$scope.results.length;i++){
                  
                  var sum =0;
                  var questions = $scope.results[i].record[0].total;
                  for(var j=0; j< $scope.results[i].record.length;j++){
                  sum = sum + $scope.results[i].record[j].correctans;
                  }
                  $scope.averages[i] = ((sum/($scope.results[i].record.length*questions))*100).toFixed(1);
                  $scope.record[i] ={data: $scope.results[i], av: $scope.averages[i]};
                  }
                  }
                  else{
                  $scope.results = [];
                  $scope.averages = [];
                  $scope.record = [];
                  angular.element(document.querySelector("#recordalert")).css({display: 'inline'});
                  }
               
            });
            }
            init();
            });
