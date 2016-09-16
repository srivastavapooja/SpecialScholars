SpecialScholars
.factory('Camera', function($q, $cordovaFile) {
         var cameraobj = {};
         
         cameraobj.getPicture = function(options) {
         var q = $q.defer();
         
         navigator.camera.getPicture(function(result) {
                                     q.resolve(result);
                                     }, function(err) {
                                     q.reject(err);
                                     }, options);
         
         return q.promise;
         }
         
        return cameraobj;
         

        });