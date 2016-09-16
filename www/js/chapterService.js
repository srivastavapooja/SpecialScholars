SpecialScholars.factory('chapterservice', function($q, $window, $ionicPopup){
                      var factory ={};
                      factory.currentpage =1;
                      factory.getchapterurl = function(params){
                      
                      var tempurl = params.replace(/_/g,"/");
                      
                      return tempurl;
                      }
                      factory.incrementPage = function(){
                      this.currentpage++;
                      }
                      factory.decrementPage = function(){
                      this.currentpage--;
                      }
                      factory.resetPage = function(){
                      this.currentpage = 1;
                      }
                      
                      factory.getPageNumber = function(){
                      return this.currentpage;
                      }
                      factory.speackText = function(id){
                      
                      }
                       
                       /* factory.checkImagesloaded = function(chapter){
                        var q = $q.defer();
                        var path = null;
                        var strend = chapter.lastIndexOf("/")+1;
                        if(ionic.Platform.isIOS()){
                        path = cordova.file.documentsDirectory;
                        }
                        if(ionic.Platform.isAndroid()){
                        path = cordova.file.dataDirectory;
                        }

                        window.resolveLocalFileSystemURL(path +chapter.substr(9,strend-9)+"images/", function (dir) {
                                                         var baseurl = dir.toURL();
                                                         q.resolve(baseurl);
                                                         }, function () {
                                                        // alert("file not found");
                                                         var alertPopup = $ionicPopup.alert({
                                                                                            title: 'Oops! Content Locked',
                                                                                            template: 'Chapters in this level are not yet available. Connect to internet to download content.',
                                                                                                okText: 'OK',                                        okType: 'button-assertive'
                                                                                            });
                                                         
                                                         alertPopup.then(function(res) {
                                                                         console.log('Check your internet connection');
                                                                         });
                                                         $window.history.back();
                                                         q.reject(null);
                                                         });
                        return q.promise;
                        }*/
                      return factory;
                      });