SpecialScholars
.factory('gradecontentService',  function($cordovaFile,$q, $cordovaFileTransfer ){
         var gradecontentserv ={};
         /*gradecontentserv.server_resources = [{gradenum: "1", res: ["seasons_page1.jpg","seasons_page2.jpg", "seasons_page3.jpg", "seasons_page4.jpg","seasons_page5.jpg","sun_page1.jpg","sun_page2.png", "sun_page3.jpg","sun_page4.png", "sun_page5.jpg",  "plant_page1.jpg","plant_page2.jpg","plant_page3.jpg","plant_page4.jpg","plant_page5.jpg", "plant_page6.jpg","butterfly_page1.jpg","butterfly_page2.jpg","butterfly_page3.jpg","butterfly_page4.jpg","butterfly_page5.jpg","policeman_page1.jpg","policeman_page2.jpg","policeman_page3.jpg","policeman_page4.jpg","policeman_page5.jpg", "teeth_page1.jpg","teeth_page2.jpg","teeth_page3.jpg","teeth_page4.jpg","teeth_page5.jpg", "plantlifecycle_page1.jpg","plantlifecycle_page2.jpg","plantlifecycle_page3.jpg","plantlifecycle_page4.jpg","plantlifecycle_page5.jpg", "family_page1.jpg","family_page2.jpg","family_page3.jpg","family_page4.jpg","family_page5.jpg", "road_safety_page1.jpg","road_safety_page2.jpg","road_safety_page3.jpg","road_safety_page4.jpg","road_safety_page5.jpg","firesafety_page1.jpg","firesafety_page2.jpg","firesafety_page3.jpg","firesafety_page4.jpg","firesafety_page5.jpg","firesafety_page6.jpg","firesafety_page7.jpg"]},
            {gradenum: "2", res: ["landforms_page1.jpg","landforms_page2.jpg","landforms_page3.jpg","landforms_page4.jpg","landforms_page5.jpg","stranger_page1.jpg","stranger_page2.jpg","stranger_page3.jpg","stranger_page4.jpg","stranger_page5.jpg","livingthings_page1.jpg","livingthings_page2.jpg","livingthings_page3.jpg","livingthings_page4.jpg","livingthings_page5.jpg", "ocean_page1.jpg","ocean_page2.png","ocean_page3.jpg","ocean_page4.jpg","ocean_page5.jpg", "ocean_page6.jpg", "watercycle_page2.jpg","watercycle_page3.jpg","watercycle_page4.jpg","watercycle_page5.jpg", "watercycle_page6.jpg", "germs_page1.jpg","germs_page2.jpg","germs_page3.jpg","germs_page4.jpg","germs_page5.jpg", "germs_page6.jpg","matter_page1.jpg","matter_page2.jpg","matter_page3.jpg","matter_page4.jpg","matter_page5.jpg"]},
                {gradenum: "3", res: ["citizens_page1.jpg","citizens_page2.jpg","citizens_page3.jpg","citizens_page4.jpg","citizens_page5.jpg","machines_page1.jpg","machines_page2.jpg","machines_page3.jpg","machines_page4.jpg","machines_page5.jpg","gravity_page1.jpg","gravity_page2.jpg","gravity_page3.jpg","gravity_page4.gif","gravity_page5.jpg","temperature_page1.jpg","temperature_page2.jpg","temperature_page3.jpg","temperature_page4.jpg","temperature_page5.jpg","rocks_page1.jpg","rocks_page2.jpg","rocks_page3.jpg","rocks_page4.jpg","rocks_page5.jpg","rocks_page6.jpg","energy_page1.jpg","energy_page2.jpg","energy_page3.jpg","energy_page4.jpg","energy_page5.jpg","energy_page6.jpg"]}
        ];*/
         gradecontentserv.beginner_content = [{name: "Science",
                                         chapters: [{image: "img/plant_beginner.jpg", url: "#/chapter/Parts Of A Plant/partials_beginner_plants.html"},{image: "img/butterfly_beginner.jpg", url: "#/chapter/Life Of A Butterfly/partials_beginner_butterfly life cycle.html"},{image: "img/plantlifecycle_beginner.jpg", url: "#/chapter/How Plants Grow/partials_beginner_how plants grow.html"}]},
                               {
                                name: "Environmental Studies",
                                         chapters: [{image: "img/weather_beginner.jpg", url: "#/chapter/Seasons And Weather/partials_beginner_weather.html"},{image: "img/sun_beginner.jpg", url: "#/chapter/The Sun/partials_beginner_sun.html"},
                                                    {image: "img/policeman_beginner.jpg", url: "#/chapter/People Around Us - Police Officer/partials_beginner_policeman.html"}, {image: "img/family_beginner.jpg", url: "#/chapter/Families Around The World/partials_beginner_families.html"}]},
                               {
                                name: "Health and Safety",
                                         chapters: [{image: "img/teeth_beginner.jpg", url: "#/chapter/Happy Teeth/partials_beginner_teeth.html"},{image: "img/firesafety_beginner.jpg", url: "#/chapter/Fire Safety/partials_beginner_fire safety.html"}, {image: "img/road_safety_beginner.jpg", url: "#/chapter/Being Safe On Road/partials_beginner_road safety.html"}
                                                    ]}
                                            ];
         gradecontentserv.advanced_content = [{name: "Science",
                                         chapters: [{image: "img/livingthings_advanced.jpg", url: "#/chapter/Living Things/partials_advanced_livingthings.html"},{image: "img/watercycle_advanced.jpg", url: "#/chapter/The Water Cycle/partials_advanced_water cycle.html"},
                                            {image: "img/matter_advanced.jpg", url: "#/chapter/Solid, Liquid and Gases/partials_advanced_solid liquid gases.html"}]},
                                            {
                                             name: "Environmental Studies",
                                         chapters: [{image: "img/ocean_advanced.jpg", url: "#/chapter/The Ocean/partials_advanced_oceans.html"},{image: "img/landforms_advanced.jpg", url: "#/chapter/Earth's Landforms/partials_advanced_landforms.html"}]},
                                            {
                                             name: "Health and Safety",
                                         chapters: [{image: "img/germs_advanced.jpg", url: "#/chapter/Stop The Germs/partials_advanced_germs.html"},{image: "img/stranger_advanced.jpg", url: "#/chapter/Stranger Safety/partials_advanced_stranger safety.html"}
                                                    ]}];
         gradecontentserv.genius_content = [{name: "Science",
                                         chapters: [{image: "img/gravity_genius.jpg", url: "#/chapter/How things Fall - Gravity/partials_genius_gravity.html"}, {image: "img/temperature_genius.jpg", url: "#/chapter/Temperature/partials_genius_temperature.html"}, {image: "img/energy_genius.jpg", url: "#/chapter/Energy/partials_genius_energy.html"}, {image: "img/machines_genius.jpg", url: "#/chapter/Simple Machines/partials_genius_machines.html"}]},
                                            {
                                             name: "Environmental Studies",
                                         chapters: [{image: "img/rocks_genius.jpg", url: "#/chapter/Rocks And Soil/partials_genius_rocks and soil.html"},{image: "img/goodcitizen_genius.jpg", url: "#/chapter/Good Citizens/partials_genius_good citizen.html"}]}
                                            ];
         
         gradecontentserv.getGradeContent = function(grade){
         switch(grade){
         
         case 'Beginner': return this.beginner_content;
         case 'Advanced': return this.advanced_content;
         case 'Genius': return this.genius_content;
         
         }
         }
         
         
        /*gradecontentserv.checkAndDownloadResource = function(res_name,baseurl, basetarget){
         var q = $q.defer();
         var target = basetarget + res_name;
         var url = baseurl+res_name;
        
         window.resolveLocalFileSystemURL(target, function (dir) {
                                                   q.resolve(true);
                                          }, function (err) { q.reject(res_name);
                                          });
         
         
         
         
         return q.promise;

         }*/
         return gradecontentserv;
         });