import ScrollMagic from 'scrollmagic';
import 'animation.gsap';
import 'ScrollToPlugin'; 
import serviceManager from '../services/serviceManager';
import resizeService from '../services/resizeService';
import onloadService from '../services/onloadService';

import { u } from 'umbrellajs';

const resizeServiceInstance = serviceManager.use(resizeService); 

const onloadServiceInstance = serviceManager.use(onloadService);

function isMobile() { //credit to http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export default {
    init: function(){
        /* --- LOADING ANIMATION --- */
        var loading = true

        var getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        
        var lastLoad = 0

        function doLoad(){ 
            var messages = ['Mixing awesomesauce', 'Generating experiences', 'Synchronizing passions', 'Revitalizing dreams', 'Building the unbuildable', 'Inspiring innovation', 'Flying to the moon', 'Spreading smiles', 'Filtering memes', 'Feeding puppies', 'Picking up Bobby Tables']
            
            var rand = lastLoad;
            while(rand == lastLoad)
                rand = getRandomInt(0, messages.length-1)
            lastLoad = rand
            
            u('#loader-old-message').remove()
            var nextMessage = u('<div />').text(messages[rand]).attr({class: 'loader-message', id: 'loader-next-message'});
            u('#loader').append(nextMessage);
            u('#loader-main-message').attr({id: 'loader-old-message'});
            
            //allow dom to update so animation can proceed
            setTimeout(() => {
                nextMessage.attr({id: 'loader-main-message'});
            }, 10)
            
            //Rerun every 1.2s
            setTimeout(() => {
                if(loading) doLoad();
            }, 1200)
            return
        }
        setTimeout(() => {
            if(loading) doLoad();
        }, 400)
        onloadServiceInstance.addListener(function(){
            TweenMax.fromTo('#loader', 0.7, {opacity: 1}, {opacity:0, onComplete: function(){
                u('#loader').remove();
            }});
        });


        var controller = new ScrollMagic.Controller();

        /* --- BANNER --- */
        var bannerTimeline = new TimelineMax();
        var bannerScene = new ScrollMagic.Scene({duration: '100%', offset:0, triggerHook: 0, triggerElement: '#banner-background', reverse: true});
        controller.addScene(bannerScene);

        function bannerResizeListener(){
            var h = document.documentElement.clientHeight;
            var w = document.documentElement.clientWidth;
            var bannerVerticalOffset = h - (w*1068)/(1600) + h/8;
            bannerVerticalOffset = bannerVerticalOffset < 0 ? bannerVerticalOffset : 0;
            bannerTimeline.clear();
            bannerTimeline.add([
                TweenMax.fromTo("#banner-background-foreground", 1, {backgroundPosition: "center "+bannerVerticalOffset+"px"}, {backgroundPosition: "center "+(bannerVerticalOffset - 80)+"px", ease: Power0.easeNone}),
                TweenMax.fromTo("#banner-background-background", 1, {backgroundPosition: "center "+bannerVerticalOffset+"px"}, {backgroundPosition: "center "+(bannerVerticalOffset + 160)+"px", ease: Power0.easeNone})
            ]);
            controller.removeScene(bannerScene);
            bannerScene.setTween(bannerTimeline);
            controller.addScene(bannerScene);
        }
        if(!isMobile()){ //ignore mobile browsers
            resizeServiceInstance.addListener("banner", bannerResizeListener);
            bannerResizeListener();
        }

        /* --- ABOUT-- */
        if(!isMobile()){ //ignore mobile browsers
            var aboutTimeline = new TimelineMax();
            var aboutScene = new ScrollMagic.Scene({duration: '90%', offset:0, triggerHook: 1, triggerElement: '#about', reverse: true});
            controller.addScene(aboutScene); 
                aboutTimeline.add([
                    TweenMax.fromTo("#about-iphone-container", 1, {x: "0%"}, {x: "-30%", ease: Power1.easeOut}),
                    TweenMax.fromTo("#about-iphone-img-1", 1, {x: "0%"}, {x: "30%", ease: Power1.easeOut}),
                    TweenMax.fromTo("#about-iphone-img-2", 1, {x: "0%"}, {x: "60%", ease: Power1.easeOut}),
                    TweenMax.fromTo("#about-title", 1, {y: "50px", opacity: 0}, {y: "0%", opacity: 1,  ease: Power1.easeOut}),
                    TweenMax.fromTo("#about-content", 1, {y: "150px", opacity: 0}, {y: "0%", opacity: 1, ease: Power1.easeOut})
                ]);
            aboutScene.setTween(aboutTimeline);
            controller.addScene(aboutScene);
        }

        SyntaxHighlighter.defaults['quick-code'] = false;
        SyntaxHighlighter.all();

        /* --- PROJECTS -- */
        var projectColors = ['#1577E8', '#EA16F5', '#16F516', '#A200FF', '#FFFB00', '#FF0000', '#00FFB3'];
        var projects = [
            {
                'name' : 'Createspace',
                'image' : 'createspace.jpg',
                'subtitle' : 'Promoting creativity in collaboration through humanitarian projects',
                'url' : 'http://ourCreatespace.com'
            },{
                'name' : 'Growth Year',
                'image' : 'growthyear.jpg',
                'subtitle' : 'An intensive growth program for gap year students',
                'url' : 'http://growthyear.org',
            },{
                'name' : 'Ceebos',
                'image' : 'ceebos.jpg',
                'subtitle' : 'Machine Learning based Personal Chef recipe app',
                'url' : 'http://ceebos.com'
            },{
                'name' : 'Faraday Gloves',
                'image' : 'faraday.jpg',
                'subtitle' : 'Sustainable thermal gloves powered by harnessing body energy',
                'url' : 'https://www.youtube.com/watch?v=OgefFNfZlDc&feature=youtu.be'
            },{
                'name' : 'Effect of inhibitors on Zika Virus',
                'image' : 'zika.jpg',
                'subtitle' : 'Research paper written at Western Medical Sciences',
                'url' : 'https://www.dropbox.com/s/ak1a5p7jtlr8bx0/TheEffectof%20NS3Helicase%20InhibitorsonZikaVirusReplication.pdf?dl=0'
            },{
                'name' : 'KisKare Bandages',
                'image' : 'kiskare.jpg',
                'subtitle' : 'Biodegradable bandages innovated at University of Calgary',
                'url' : 'https://www.youtube.com/watch?v=eFNL8nnpY7I&feature=youtu.be'
            }
        ];
        var currentIndex = -1;
        var projectCards = [];
        var projectLinks = [];
        function showItem(index){
            if(index == currentIndex) return;
            var card = projectCards[index].first();
            card.style.position = "absolute";
            card.style.display = "block";
            card.style.zIndex = 10;
            document.getElementById('projects-card-chevron-left').style.display = index == 0 ? "none" : "block";
            document.getElementById('projects-card-chevron-right').style.display = index == projects.length-1 ? "none" : "block";
            u('#projects-card-navigation a.active').removeClass('active');
            projectLinks[index].addClass('active');
            u('#projects-card').first().style.background = 'linear-gradient('+projectColors[index]+', '+projectColors[index+1]+')';
            var currentlyActive = null;
            if(currentIndex != -1){
                currentlyActive = projectCards[currentIndex];
                TweenMax.fromTo(currentlyActive.first(), 0.35, {opacity: 1, }, {opacity: 0, ease: Power2.easeInOut, onComplete: function(){
                    currentlyActive.removeClass('active');
                    currentlyActive.first().style.display = "none";
                }});
            }
            currentIndex = index;
            TweenMax.fromTo(card, 0.35, {opacity: 0, scale: 1.25}, {opacity: 1, scale: 1, ease: Power2.easeInOut, onComplete: (function(index, card){
                projectCards[index].addClass('active');
                card.style.position = "relative";
                card.style.zIndex = null;
                if(currentlyActive != null) currentlyActive.first().style.position = "absolute";
            }).bind(this, index, card)});
        }
        u('#projects-card-chevron-left').on('click', function(){
            showItem(currentIndex - 1);
        });
        u('#projects-card-chevron-right').on('click', function(){
            showItem(currentIndex + 1);
        });
        for(var i = 0; i < projects.length; i++){
            var project = projects[i];
            var link = u('<a href="javascript:void(0);"></a>');
            var card = u('<div class="projects-card-item"><div id="projects-card-image" style="background-image:url(\'/assets/lib/img/sites/'+project.image+'\')"></div><img src="/assets/lib/img/whiteoverlay.png" id="projects-card-overlay"/><div id="projects-card-content"><h1 class="card-title">'+project.name+'</h1><h2 class="card-caption">'+project.subtitle+'</h2><a href="'+project.url+'" class="button" target="_blank">SEE PROJECT</a></div></div>');
            u('#projects-card-navigation').append(link);
            u('#projects-card').prepend(card);
            projectCards.push(card);
            projectLinks.push(link);
            link.on('click', showItem.bind(this, i));
        }
        showItem(0);

        /* --- BLOG-- */
        var blogTimeline = new TimelineMax({paused: true});
        blogTimeline.add([
            TweenMax.fromTo("#blog", 0.25, {opacity: 0}, {opacity: 1, ease: Power1.easeOut}),
            TweenMax.fromTo("#blog .container", 0.5, {y: "100%"}, {y: "0%", ease: Expo.easeOut})
        ]);
        var blogReverseTimeline = new TimelineMax({paused: true, onComplete: function(){
            var blog = u('#blog').first(); 
            blog.style.display = "none";
            blog.style.position = null;
            blog.style.height = null;
            blog.style.overflow = null;
        }});
        blogReverseTimeline.add([
            TweenMax.fromTo("#blog", 0.25, {opacity: 1}, {opacity: 0, ease: Power1.easeOut}),
            TweenMax.fromTo("#blog .container", 0.5, {y: "0%"}, {y: "100%", ease: Power0.easeNone})
        ]);
        function scrollToHash(hash){
            TweenMax.to(window, 0.5, {scrollTo:Math.max(0, document.getElementById(hash.substring(3)+"-target").getBoundingClientRect().top - document.body.getBoundingClientRect().top - 150), ease: Power3.easeOut});
        }
        function openBlog(){
            var blog = u('#blog').first();
            if(blog.style.display != "block"){
                blogTimeline.play(0);
                blog.style.display = "block";
                u('#nav').addClass('blog');
                document.getElementById('home').style.overflow="hidden";
                document.getElementById('home').style.position="absolute";
                document.getElementById('home').style.height=window.innerHeight+"px";
                TweenMax.to(window, 0.25, {scrollTo:0, ease: Power3.easeOut});
            }
        }
        u('.blog-toggle').on('click', openBlog);
        u('#nav a, .quickNav').on('click', function(e){
            if(this.hash && this.hash != '#!/blog'){
                var blog = u('#blog').first();
                if(blog.style.display == "block"){
                    blog.style.position = "absolute";
                    blog.style.height = window.innerHeight+"px";
                    blog.style.overflow = "hidden";
                    blogReverseTimeline.play(0);
                    u('#nav').removeClass('blog');
                    document.getElementById('home').style.position="static";
                    document.getElementById('home').style.overflow="auto";
                    document.getElementById('home').style.height=null;
                }
                scrollToHash(this.hash);
            }
        }); 
        onloadServiceInstance.addListener(function(){
            if(location.hash){
                if(location.hash == "#!/blog") openBlog();
                else scrollToHash(location.hash);
            } 
        });

    }    
}