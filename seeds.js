var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "xижа Безбог", 
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Bezbog/hija-bezbog-image-9",
        description: "  "
    },
    {
        name: "xижа Бъндерица", 
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Bunderica/picture.jpg",
        description: "Разположена е на левия бряг на р.Бъндерица. Новата хижа е масивна триетажна сграда с капацитет 95 места с външни и вътрешни санитарни възли и умивални. Електрифицирана е , отоплението е централно. Старата хижа е масивна двуетажна сграда с капацитет 73 места с външни санитарни възли и умивални. Електрифицирана и водоснабдена, има туристическа кухня и столова. В района се ползват и бунгала с капацитет 30 легла. Санитарните възли и умивални са външни. Електрифицирани са , отоплението е с електрически печки. Има паркинг. Съседни туристически обекти:- Байкушевата мура - 0.10ч.- пещерата Хана - 0.15ч.- вр.Вихрен - 3.00ч.- х.Вихрен - 0.30ч.- засл.Казана - 2.00ч.- вр.Кутело - 3.30ч.- засл.Кончето - 4.00ч.Изходно място: Гр.Банско - 14км. асфалтово шосе /4.00ч. по маркирана пътека/. "
    },
    {
        name: "xижа Демяница", 
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/Demianica/picture.jpg",
        description: "Разположена е на водослива на реките Стражишка, Валявишка и Василашка, сред иглолистна гора. Предаставлява масивна двуетажна сграда. Допълнително има и 14 бунгала. Общият капацитет е 217 места. Разполага с туристическа кухня, столова и лафка. Санитарните възли са външни. Хижата е електрифицирана от агрегат и ВЕЦ и водоснабдена, отоплението е с печки на твърдо гориво. Съседни туристически обекти:- Валявишки езера - 2.00ч.- Рибно Василашко езеро - 0.45ч.- езера Тодорини очи - 2.30ч.- Превалски езера - 1.45ч.- х.Вихрен - 4.30ч.- х.Яне Сандански - 5.30ч.- х.Каменица - 6.00ч.- засл.Тевно езеро - 3.00ч.- х.Пирин - 5.30ч.- х.Безбог - 5.00ч.- вр.Малък Типиц - 2.30ч.- в.Изворец - 2.30ч.- Горно Стражишко езеро - 2.30ч.- Стражите - 3.00ч.- вр. Полежан/2851м./ - 4.00ч. Изходно място: Гр.Банско - 4.30ч. по маркирана пътека. "
    },
    {
        name: "xижа Гоце Делчев", 
        image: "http://www.bulgarian-mountains.com/Huts/Pirin/GoceDelchev/hija-goce-delchev-image-2",
        description: "Разположена е в м.Логовото. Предаставлява масивна двуетажна сграда с капацитет 36 места с вътрешни санитарни възли и бани. Бунгалата са с капацитет 70 места с външни санитарни възли. Хижата е електрифицирана и водоснабдена, отоплението е с печки на твърдо гориво. Има паркинг за автомобили.Съседни туристически обекти: - х.Безбог - 2.30ч. или 0.30ч. с лифт. - тур.база Голямата Мочара - 1.00ч. Пътеките са маркирани.Изходно място: с.Добринище - 11км. по асфалтово шосе или 2.30ч. по маркирана пътека.   "
    }

]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // Comment.remove({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
             //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("added a campground");
            //             //create a comment
                        // Comment.create(
                        //     {
                        //         text: "This place is great, but I wish there was internet",
                        //         author: "Homer"
                        //     }, function(err, comment){
                        //         if(err){
                        //             console.log(err);
                        //         } else {
                        //             campground.comments.push(comment);
                        //             campground.save();
                        //             console.log("Created new comment");
                        //         }
                        //     });
                    // }
        //         });
        //     });
        // });
    }); 
    //add a few comments
}
 
module.exports = seedDB;