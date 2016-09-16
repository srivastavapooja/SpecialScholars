SpecialScholars
.controller('gradecontentctrl', function($scope, $routeParams, $window, $cordovaFileTransfer, $ionicPlatform, $timeout, gradecontentService){
            $scope.gradename = $routeParams.name;
            console.log("routeParams = ",+$routeParams);
            $ionicPlatform.ready(function(){
            if(window.cordova){
            /*var url, targetPath, baseurl, basetargetPath = null;
            $scope.server_res=[];
            if(ionic.Platform.isIOS()){
                                 basetargetPath = cordova.file.documentsDirectory;
            }
            if(ionic.Platform.isAndroid()){
            basetargetPath = cordova.file.dataDirectory;
            }

            switch($scope.gradename){
            case "Beginner":
            baseurl = "http://avadhlaw.com/pooja/SpecialScholars/Beginner/images/";
            basetargetPath = basetargetPath + "beginner/images/";
            $scope.server_res = gradecontentService.server_resources[0].res;
            break;
            case "Advanced":
            baseurl = "http://avadhlaw.com/pooja/SpecialScholars/Advanced/images/";
            basetargetPath = basetargetPath + "advanced/images/";
            $scope.server_res = gradecontentService.server_resources[1].res;
            break;
            case "Genius":
            baseurl = "http://avadhlaw.com/pooja/SpecialScholars/Genius/images/";
            basetargetPath = basetargetPath + "genius/images/";
            $scope.server_res = gradecontentService.server_resources[2].res;
            break;
            }
            
            var trustHosts = true;
            var options = {};

                         var j=0;
            for(var i=0; i< $scope.server_res.length;i++){
                                 url = baseurl + $scope.server_res[i];
                                 targetPath = basetargetPath + $scope.server_res[i];
            
                                 
            gradecontentService.checkAndDownloadResource($scope.server_res[i],baseurl,basetargetPath).then(function(result){
                                                                                                                                
                                        },function(filename){
                                                                                                           url = baseurl + filename;
                                                                                                           targetPath = basetargetPath + filename;                                        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                                                                                                           .then(function(result) {
                                                                                                                 $scope.filepath=targetPath;
                                                                                                                 console.log("download success");
                                                                                                                 }, function(err) {
                                                                                                                 console.log("file download error = "+JSON.stringify(err));
                                                                                                                 }, function (progress) {
                                                                                                                 $timeout(function () {
                                                                                                                          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                                                                                                                          });
                                                                                                                 });
                                        });
                                 
                       }*/
            
            }else{
            alert("cordova not found");
            }
            
            $scope.gradecontent = gradecontentService.getGradeContent($scope.gradename);
            $scope.goBack = function(){
                $window.history.back();
                         
            }
                                 });
            
            });
