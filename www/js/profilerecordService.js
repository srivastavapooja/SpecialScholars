SpecialScholars
.factory('profilerecordservice', function($q, $cordovaFile, $localStorage) {
         var profilerecord = {};
         
         profilerecord.popover = null;
         
         profilerecord.setPopover = function(popover){
         profilerecord.popover = popover;
         }
         
         profilerecord.getPopover = function(){
         return profilerecord.popover;
         }
         
         profilerecord.save = function(chaptername, correct, incorrect){
         var p = $localStorage.selectedProfile;
                profilerecord.readRecord(p)
         .then(function(resp){
               var totalquestions = correct+incorrect;
               var currdate = new Date();
               currdate = currdate.toUTCString();
               var chapterexists = false;
               var response = JSON.parse(resp);
               if(!response){
               response =[];
               }
               for(var i=0; i< response.length;i++){
               if(chaptername == response[i].chapter){
               
               var newrec = {correctans: correct, total: totalquestions, date: currdate};
               if(response[i].record.length == 5){
               response[i].record.shift();
               }
               response[i].record.push(newrec);
               chapterexists = true;
               }
               }
               if(!chapterexists){
               var newrec = {chapter: chaptername, record:[{correctans: correct, total: totalquestions, date: currdate}]};
               response.push(newrec);
               }
               var text = JSON.stringify(response);
               var filename = $localStorage.selectedProfile + "_record.txt";
               var path = null;
               if(ionic.Platform.isAndroid())
               path = cordova.file.dataDirectory;
               else if (ionic.Platform.isIOS())
               path =cordova.file.documentsDirectory;
               window.resolveLocalFileSystemURL(path, function (dir) {
                                                dir.getFile(filename, { create: true }, function (file) {
                                                            file.createWriter(function (fileWriter) {                                                                //fileWriter.truncate();
                                                                var blob = new Blob([text], { type: 'text/plain'});
                                                                fileWriter.write(blob);
                                                                              });});});
               
               
         
               });
         }
         
         profilerecord.readRecord = function(profile){
         var q = $q.defer();
         var filename = profile + "_record.txt"
         var path = null;
         if(ionic.Platform.isAndroid())
         path = cordova.file.dataDirectory;
         else if (ionic.Platform.isIOS())
         path =cordova.file.documentsDirectory;

         var file = path + filename;
         window.resolveLocalFileSystemURL(file, function (dir) {
                                          dir.file(function (file) {
                                                   var reader = new FileReader();
                                                   reader.onloadend = function (e) {
                                                   q.resolve(this.result);
                                                
                                                   }
                                                   reader.readAsText(file);
                                                   }, function (e) {
                                                   JSON.stringify(e);
                                                   console.log("file doesnt exist");
                                                   q.reject(e);
                                                   });
                                          }, function(e){ console.log("no file");q.resolve(null);});
         
         
         
         return q.promise;
         }
         return profilerecord;
         
         
         });