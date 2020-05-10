$ = jQuery.noConflict();
var app = {};
var new_url;
app.ajax = null;
path = "https://osmandemirci.design/"; // oruspu çocu template
base_url = "https://osmandemirci.design/";
errmsg = '<div class="error-info animated fadeInUp"> <span><span>O</span>ps!</span> <p>Bir Hata ile Karşılaştık Lütfen Sonra Dene</p> </div>'

msg1 = "Lütfen gerekli tüm alanları doldurun";
msg2 = "Lütfen bekle. İşleniyor";
msg3 = "E-postanız başarıyla gönderildi. Teşekkür ederim!";
msg4 = "Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin veya doğrudan benimle iletişime geçin osmanndmrc@gmail.com";
msg5 = "Unutmayın, görüntülerin bir kısmı ekran dışında, bu tasarım stili.";
msg6 = "Sadece kod.";
msg7 = "Daha fazla öğe eklemek için çift tıklayın.";
msg8 = "Yakınlaştırmak / uzaklaştırmak için kaydırın.";
$(document).ready(function() {
    'use strict';
    var current_page = window.location.pathname.split("/").pop();
    $(".navbar-link").each(function() {
        if ($(this).attr('rel') == current_page)
            $(this).addClass('active');
    });

    app.ui.navMenu();
    app.ui.particles();

    if (Modernizr.localstorage) {
        if (localStorage.getItem("color") == "white") {
            $('body').addClass('white');
        }
    }


    app.ui.mobileMenu();
});
app.ui = {
    navMenu: function() {
        $(document).on('click', '#nav_bar nav a,.flat-button, a.logo', function() {
            if ($(this).attr('rel') == 'settings') {
                $(".language-dropdown").toggle('fast');
            } else {
                if (!$(this).hasClass('active')) {
                    if (app.ui.pageLoad($(this).attr('href'), $(this).attr('rel'))) {
                        $('#nav_bar nav a.active').removeClass('active');
                        $(this).addClass('active');
                        window.history.pushState("", "", $(this).attr('href'));
                    }
                    new_url = $(this).attr('href');
                }

                $('a.logo').removeClass('active');

            }
            return false;
        });
    },
    pageLoad: function(url, rel) {
        if (app.ajax !== null) {
            return false;
        } else {
            app.ui.preloader.preloaderInit(rel);
            app.ajax = $.ajax({
                type: 'POST',
                url: url
            });

            app.ajax.done(function(msg) {
                var cont = $(msg).filter("#page");
                var cnt = cont.contents();
                $("#page").html(cnt);
                app.ajax = null;
            });
            app.ajax.fail(function(jqXHR, textStatus) {
                $("#page").html(errmsg);
            });
            return true;
        }
    },
    particle: false,
    particles: function() {
        if ($('body').hasClass('white')) {
            nb = 85;
        } else {
            nb = 95;
        }
        particlesJS('particles-js', {
            particles: {
                color: '#fff',
                color_random: false,
                shape: 'circle', // "circle", "edge" or "triangle"
                opacity: {
                    opacity: 0.1,
                    anim: {
                        enable: true,
                        speed: 3,
                        opacity_min: 0,
                        sync: false
                    }
                },
                size: 2,
                size_random: true,
                nb: nb,
                line_linked: {
                    enable_auto: true,
                    distance: 200,
                    color: '#515152',
                    opacity: 1,
                    width: 1,
                    condensed_mode: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 600
                    }
                },
                anim: {
                    enable: true,
                    speed: 2
                }
            },
            interactivity: {
                enable: true,
                mouse: {
                    distance: 300
                },
                detect_on: 'window', // "canvas" or "window"
                mode: 'grab', // "grab" of false
                line_linked: {
                    opacity: .5
                },
                events: {
                    onclick: {
                        enable: true,
                        mode: 'push', // "push" or "remove"
                        nb: 2
                    },
                    onresize: {
                        enable: true,
                        mode: 'out', // "out" or "bounce"
                        density_auto: false,
                        density_area: 900 // nb_particles = particles.nb * (canvas width *  canvas height / 1000) / density_area
                    }
                }
            },
            /* Retina Display Support */
            retina_detect: true
        });
    },
    mobileMenu: function() {
        $('#mobile-link').click(function() {
            $('#nav_bar nav').toggleClass('show');
            return false;

        });
    }
}

app.ui.preloader = {
    preloaderInit: function(rel) {
        $('.preloader').show();
        $('.preloader').css('left', '-100%');
        $('.preloader').velocity({ left: 0 }, {
            duration: 500,
            easing: "easeOutQuad",
            complete: function(elements) {
                $('.progress-bar_bg div').width();
                var a = 0;
                var loader = setInterval(function() {
                    ++a;
                    $('.progress-bar > span').text(a);
                    $('.progress-bar > span').css('width', a + '%');
                    $('.progress-bar_bg div').css('width', a + '%');
                    window.location = new_url;
                    if (a == 100) {
                        clearInterval(loader);
                        //sprawdza czy ajax request sie skonczyl
                        var checkLoaded = setInterval(function() {
                            if (app.ajax === null) {
                                //zamyka loader
                                app.ui.preloader.preloaderHide(rel);
                                clearInterval(checkLoaded);
                            }

                        }, 200);
                    }
                }, 7);
            }
        });
    },
    preloaderHide: function(rel) {
        //aktuwuje odpowiednie JSy
        if (rel == 'index') {
            Modernizr.load({
                load: [path + 'js/app/app-home.js'],
                complete: function() {
                    if (app.home) {
                        app.home.init();
                    }
                }
            });
        } else if (rel == 'about') {
            Modernizr.load({
                load: [path + 'js/vendor/magnetic.js', path + 'js/app/app-about.js'],
                complete: function() {
                    if (app.about) {
                        app.about.init();
                    }
                }
            });
        } else if (rel == 'skills') {
            Modernizr.load({
                load: [path + 'js/vendor/tagcanvas.js', path + 'js/app/app-skills.js'],
                complete: function() {
                    if (app.skills) {
                        app.skills.init();
                    }
                }
            });
        } else if (rel == 'gallery') {
            Modernizr.load({
                load: [path + 'js/vendor/magicwall.js', path + 'js/app/app-gallery.js'],
                complete: function() {
                    if (app.gallery) {
                        app.gallery.init();
                    }
                }
            });
        } else if (rel == 'contact') {
            //contact
            Modernizr.load({
                load: [path + 'js/app/app-contact.js'],
                complete: function() {
                    if (app.contact) {
                        app.contact.init();
                    }
                }
            });
        }
        $('#page').show();
        $('.preloader').velocity({ left: '100%' }, {
            duration: 500,
            easing: "easeInQuad",
            complete: function(elements) {
                $('.progress-bar > span').text(0);
                $('.progress-bar > span').css('width', '0%');
                $('.progress-bar_bg div').css('width', '0%');
                $('.preloader').hide();
            }
        });
    }
}

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

//HOME PAGE
Modernizr.load({
    test: $('.container.home-page').size() > 0,
    yep: [path + 'js/app/app-home.js'],
    complete: function() {
        if (app.home) {
            $("#page").show();
            app.home.init();

        }
    }
});

//ABOUT
Modernizr.load({
    test: $('.container.about').size() > 0,
    yep: [path + 'js/vendor/magnetic.js', path + 'js/app/app-about.js'],
    complete: function() {
        if (app.about) {
            $("#page").show();
            app.about.init();
        }
    }
});

//CONTACT
Modernizr.load({
    test: $('.container.contact').size() > 0,
    yep: [path + 'js/app/app-contact.js'],
    complete: function() {
        if (app.contact) {
            $("#page").show();
            app.contact.init();

        }
    }
});

//SKILLS
Modernizr.load({
    test: $('.container.skills').size() > 0,
    yep: [path + 'js/vendor/tagcanvas.js', path + 'js/app/app-skills.js'],
    complete: function() {
        if (app.skills) {
            $("#page").show();
            app.skills.init();

        }
    }
});

//GALLERY
Modernizr.load({
    test: $('.container.gallery').size() > 0,
    yep: [path + 'js/vendor/magicwall.js', path + 'js/app/app-gallery.js'],
    complete: function() {
        if (app.gallery) {
            $("#page").show();
            app.gallery.init();
        }
    }
});


