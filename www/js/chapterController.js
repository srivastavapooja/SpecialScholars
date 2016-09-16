SpecialScholars
.controller('chapterctrl', function($rootScope, $scope, $routeParams, $window, chapterservice, profilerecordservice, $timeout,$interval, $ionicModal){
            $scope.chaptername = $routeParams.name;
            $scope.chapterurl = chapterservice.getchapterurl($routeParams.url);
            var strend = ($scope.chapterurl).lastIndexOf("/")+1;
            var basetargetPath = null;
            if(ionic.Platform.isIOS()){
            path = cordova.file.documentsDirectory;
            }
            if(ionic.Platform.isAndroid()){
            path = cordova.file.dataDirectory;
            }
            $scope.imgsrc = "img/pages/";
            
            $scope.pagenumber = "page"+chapterservice.getPageNumber();
            $scope.nextBtnText = "";
            $scope.quiz = false;
            $scope.result = {correct:0, incorrect: 0};
            $scope.synthobject = null;
            $scope.questionpages =[];
            $scope.answerattempted = false;
            $scope.ttsEnded = false;
            $scope.ttsarray =[];
            
            var init = function(){
            $timeout(function(){
                     angular.element(document.querySelector("#content")).css({opacity: '0.2'});
                     angular.element(document.querySelector("#previousbtn")).css({display: 'none'});
                     angular.element(document.querySelector("#questionbtn")).css({display: 'none'});
                     angular.element(document.querySelector("#refreshbtn")).css({display: 'none'});
                     angular.element(document.querySelector("#nextbtn")).css({display: 'none'});
                     
                     },100);

            }
        
            $scope.start = function(){
            angular.element(document.querySelector("#startbtndiv")).css({display: 'none'});
            angular.element(document.querySelector("#content")).css({opacity: '1.0'});
            angular.element(document.querySelector("#previousbtn")).css({display: 'none'});
            angular.element(document.querySelector("#questionbtn")).css({display: 'inline'});
            angular.element(document.querySelector("#refreshbtn")).css({display: 'inline'});
            angular.element(document.querySelector("#nextbtn")).css({display: 'inline'});
            if(window.speechSynthesis){
            var texts = document.getElementsByClassName("textclass");
            for(var i=0;i<texts.length;i++){
            var textid = angular.element(texts[i]).attr("id");
            $scope.speakText("#"+textid);
            }
            }else{
            var texts = document.getElementsByClassName("textclass");
            for(var i=texts.length-1;i>=0;i--){
            $scope.ttsarray[texts.length-i-1] = "#"+angular.element(texts[i]).attr("id");
            }
            if($scope.ttsarray.length>=1){
            var textid = $scope.ttsarray.pop();
            $scope.speakText(textid);
            $scope.ttsEnded = false;
            }
            $scope.timer = $interval(function(){
                                     if($scope.ttsEnded){
                                     if($scope.ttsarray.length>=1){
                                     var textid = $scope.ttsarray.pop();
                                     $scope.speakText(textid);
                                     $scope.ttsEnded = false;
                                     if($scope.ttsarray.length == 0){
                                     $interval.cancel($scope.timer);
                                     }
                                     }
                                     }
                                     },300);
            
            }
            };

            $scope.incrementPage = function(){
            if($scope.synthobject){
            $scope.synthobject.cancel();
            $scope.synthobject = null;
            }
            $scope.ttsarray =[];
            angular.element(document.querySelector("#refreshbtn")).css({display: 'inline'});
            $scope.totalpages = angular.element(document.querySelector("#totalpages")).val();
            var currentpage = chapterservice.getPageNumber();
            if(currentpage < $scope.totalpages){
            angular.element(document.querySelector("#previousbtn")).css({display: 'inline'});
            }
            chapterservice.incrementPage();
            $scope.pagenumber = "page"+chapterservice.getPageNumber();
            if(chapterservice.getPageNumber() == $scope.totalpages){
            $scope.nextBtnText = "Skip";
            angular.element(document.querySelector("#questionbtn")).css({display: 'none'});
            angular.element(document.querySelector("#refreshbtn")).css({display: 'none'});
            }
            if(currentpage == $scope.totalpages){
            $scope.goBack();
            }
            $timeout(function(){
                     if(window.speechSynthesis){
                     var texts = document.getElementsByClassName("textclass");
                     for(var i=0;i<texts.length;i++){
                     var textid = angular.element(texts[i]).attr("id");
                     $scope.speakText("#"+textid);
                     }
                     }else{
                     var texts = document.getElementsByClassName("textclass");
                     for(var i=texts.length-1;i>=0;i--){
                     $scope.ttsarray[texts.length-i-1] = "#"+angular.element(texts[i]).attr("id");
                     }
                     if($scope.ttsarray.length>=1){
                     var textid = $scope.ttsarray.pop();
                     $scope.speakText(textid);
                     $scope.ttsEnded = false;
                     }
                     $scope.timer = $interval(function(){
                                              if($scope.ttsEnded){
                                              if($scope.ttsarray.length>=1){
                                              var textid = $scope.ttsarray.pop();
                                              $scope.speakText(textid);
                                              $scope.ttsEnded = false;
                                              if($scope.ttsarray.length == 0){
                                              $interval.cancel($scope.timer);
                                              }
                                              }
                                              }
                                              },300);
                     
                     }
                     },300);
            }
            
            $scope.decrementPage = function(){
            if($scope.synthobject){
            $scope.synthobject.cancel();
            }
            $scope.ttsarray =[];
            angular.element(document.querySelector("#refreshbtn")).css({display: 'inline'});
            angular.element(document.querySelector("#questionbtn")).css({display: 'inline'});
            var currentpage = chapterservice.getPageNumber();
            if(currentpage==2) {
            angular.element(document.querySelector("#previousbtn")).css({display: 'none'});
            angular.element(document.querySelector("#start")).css({display: 'inline'});
            }
            if(currentpage == $scope.totalpages) $scope.nextBtnText = "";
            chapterservice.decrementPage();
            $scope.pagenumber = "page"+chapterservice.getPageNumber();
            
            }

            $scope.refresh = function(){
            if($scope.synthobject){
            $scope.synthobject.cancel();
            }
            $scope.ttsarray =[];
            var texts = document.getElementsByClassName("textclass");
            for(var i=0;i<texts.length;i++){
            var textid = angular.element(texts[i]).attr("id");
            angular.element(document.querySelector("#"+textid)).css({color: 'black'});
            }
            if(window.speechSynthesis){
            var texts = document.getElementsByClassName("textclass");
            for(var i=0;i<texts.length;i++){
            var textid = angular.element(texts[i]).attr("id");
            $scope.speakText("#"+textid);
            }
            }else{
            var texts = document.getElementsByClassName("textclass");
            for(var i=texts.length-1;i>=0;i--){
            $scope.ttsarray[texts.length-i-1] = "#"+angular.element(texts[i]).attr("id");
            }
            if($scope.ttsarray.length>=1){
            var textid = $scope.ttsarray.pop();
            $scope.speakText(textid);
            $scope.ttsEnded = false;
            }
            $scope.timer = $interval(function(){
                                     if($scope.ttsEnded){
                                     if($scope.ttsarray.length>=1){
                                     var textid = $scope.ttsarray.pop();
                                     $scope.speakText(textid);
                                     $scope.ttsEnded = false;
                                     if($scope.ttsarray.length == 0){
                                     $interval.cancel($scope.timer);
                                     }
                                     }
                                     }
                                     },300);
            
            }
            }


            $scope.goBack = function(){
                chapterservice.resetPage();
                $window.history.back();
            $interval.cancel($scope.timer);
            }
            
            $scope.startQuiz = function(){
            $scope.quiz = true;
            $scope.isdisabled = false;
            angular.element(document.querySelector("#previousbtn")).css({display: 'none'});
            angular.element(document.querySelector("#scorediv")).css({display: 'inline'});
            angular.element(document.querySelector("#spinner")).css({display: 'none'});
            if($scope.questionpages.length==0){
            var questionpages =[];
            
            for (var i=1; i<$scope.totalpages;i++){
            questionpages[i-1] = "page"+i+"_question";
            }
            $scope.questionpages = questionpages;
            }
            var index = Math.floor(Math.random()*$scope.questionpages.length);
            
            var currentpage = ($scope.questionpages.splice(index,1)).toString();
            
            if($scope.questionpages.length==0){
            $scope.nextBtnText = "End";
            }
            $scope.pagenumber = currentpage;
            $timeout(function(){
                     if(window.speechSynthesis){
                     $scope.speakText("#pagetext");
                     $scope.speakText("#choice1");
                     $scope.speakText("#or_text");
                     $scope.speakText("#choice2");
                    }else{
                     $scope.ttsarray =["#choice2","#or_text","#choice1","#pagetext"];
                     var textid = $scope.ttsarray.pop();
                     $scope.speakText(textid);
                     
                     $scope.ttsEnded = false;
                     $scope.timer = $interval(function(){
                                              if($scope.ttsEnded){
                                              var textid = $scope.ttsarray.pop();
                                              $scope.speakText(textid);
                                              $scope.ttsEnded = false;
                                              if($scope.ttsarray.length == 0){
                                              $interval.cancel($scope.timer);
                                              }
                                              
                                              }
                                              },300);
                     }

                     },300);
            
            }
            
            $scope.askQuestion = function(){
            $scope.isdisabled = false;
            if($scope.synthobject){
            $scope.synthobject.cancel();
            }
            $scope.ttsarray=[];
            angular.element(document.querySelector("#incorrectsign")).css({display: 'none'});
            angular.element(document.querySelector("#correctsign")).css({display: 'none'});
            angular.element(document.querySelector("#spinner")).css({display: 'none'});
            angular.element(document.querySelector("#refreshbtn")).css({display: 'none'});
                var currentpage = chapterservice.getPageNumber();
                $scope.pagenumber = "page"+currentpage+"_question";
                $timeout(function(){
                        if(window.speechSynthesis){
                         $scope.speakText("#pagetext");
                         $scope.speakText("#choice1");
                         $scope.speakText("#or_text");
                         $scope.speakText("#choice2");
                         }else{
                         $scope.ttsarray =["#choice2","#or_text","#choice1","#pagetext"];
                         if($scope.ttsarray.length>=1){
                         var textid = $scope.ttsarray.pop();
                         $scope.speakText(textid);
                       
                         $scope.ttsEnded = false;
                         }
                         $scope.timer = $interval(function(){
                                   if($scope.ttsEnded){
                                   if($scope.ttsarray.length>=1){
                                   var textid = $scope.ttsarray.pop();
                                   $scope.speakText(textid);
                                   $scope.ttsEnded = false;
                                    if($scope.ttsarray.length == 0){
                                    $interval.cancel($scope.timer);
                                    }
                                    }
                                   }
                                   },300);
                         
                         }
                     },300);
            }
            
            $scope.answerQuestion = function(id, iscorrect){
            $scope.isdisabled = true;
            if($scope.answerattempted)
            return;
            if($scope.synthobject){
            $scope.synthobject.cancel();
            }
            if($scope.ttsarray.length){
            return;
            }
            
            var text = angular.element(document.querySelector(id)).text();
            $scope.answerattempted = true;
            if(iscorrect == true){
            $scope.speakText(id);
            $scope.result.correct = $scope.result.correct+1;
            angular.element(document.querySelector("#correctsign")).css({display: 'inline'});
            if($scope.quiz)
            angular.element(document.querySelector("#spinner")).css({display: 'inline'});
            }else{
            if(window.speechSynthesis){
            $scope.speakText(id);
            $scope.speakText("#incorrect_text");
            }else{
            $scope.ttsarray =["#incorrect_text", id];
            var textid = $scope.ttsarray.pop();
            $scope.speakText(textid);
            $scope.ttsEnded = false;
            $scope.timer = $interval(function(){
                                     if($scope.ttsEnded){
                                     var textid = $scope.ttsarray.pop();
                                     $scope.speakText(textid);
                                     $scope.ttsEnded = false;
                                     if($scope.ttsarray.length == 0){
                                     $interval.cancel($scope.timer);
                                     }
                                     
                                     }
                                     },300);

            }
            $scope.result.incorrect = $scope.result.incorrect+1;
            angular.element(document.querySelector("#incorrectsign")).css({display: 'inline'});
            $timeout(function(){
                     angular.element(document.querySelector("#incorrectsign")).css({display: 'none'});
                     angular.element(document.querySelector("#correctsign")).css({display: 'inline'});
                     if($scope.quiz)
                     angular.element(document.querySelector("#spinner")).css({display: 'inline'});
                     },2000);
            }
            $timeout(function(){
            $scope.answerattempted = false;
            if($scope.quiz){
                     
                     if($scope.questionpages.length==0){
                     $scope.result1 = $scope.result;
                     $ionicModal.fromTemplateUrl('partials/quizresult.html', {
                                                 id: 'quizresult',
                                                 scope: $scope,
                                                 backdropClickToClose: true,
                                                 animation: 'slide-in-up'
                                                 }).then(function(modal) {
                                                         $scope.quizresultmodal = modal;
                                                          $scope.quizresultmodal.show();
                                                        // $scope.openModal($scope.result);
                                                         });

                     }else{
            $scope.startQuiz();
            }
                     }
                     },3500);
            }
            
            $scope.saveresult = function(){
            var corr = $scope.result1.correct;
            var incorr = $scope.result1.incorrect;
            profilerecordservice.save($scope.chaptername, corr, incorr);
            $scope.result = {correct:0, incorrect: 0};
            $scope.quizresultmodal.remove()
            }

            
            $scope.speakText = function(id) {
                $scope.text = angular.element(document.querySelector(id)).text();
            
            
                var synth = window.speechSynthesis;
            $scope.synthobject = synth;
                if(synth){
            //alert("SpeechSynthesis found");
                    var voices = synth.getVoices();
                    var utterThis = new SpeechSynthesisUtterance($scope.text);
                    utterThis.rate = 0.9;
                    utterThis.pitch = 1;
            if(voices.length != 0)
            utterThis.voice = voices.filter(function(voice) { return voice.name == 'Samantha'; })[0];
            else
            utterThis.voice = { name: "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", lang: "id-ID", localService: true, "default": true };
            
                      utterThis.onstart = function(event){

                     angular.element(document.querySelector(id)).css({color: 'red'});
                     }
                    $scope.synthobject.speak(utterThis);
            
                }
                else {
            //alert("SpeechSynthesis not found. Using Text to Speech");
            var rate = 1;
            angular.element(document.querySelector(id)).css({color: 'red'});
            if(ionic.Platform.isIOS())
               rate = 1.3;
            else
               rate = 0.8;
            
                TTS
                .speak({
                       text: $scope.text,
                       locale: 'en-GB',
                       rate: rate
                       }, function ()
                       {
                       $scope.ttsEnded = true;
                       angular.element(document.querySelector(id)).css({color: 'black'});
                       
                       }, function (reason) {alert("TTS rejected: reason = "+reason);});
            
                }
            
            }
            
            
            $scope.openModal = function(r){
            $scope.result.correct = r.correct;
            $scope.result.incorrect = r.incorrect;
            $scope.quizresultmodal.show();
            }
            
            $scope.closeModal = function(){
            $scope.result = {correct:0, incorrect: 0};
            $scope.quizresultmodal.remove();
            }
            
            init();
            });

