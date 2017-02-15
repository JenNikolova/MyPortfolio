"use strict";

function extractHash(url) {
    return url.substr(url.lastIndexOf('#'));
}

function getProjectsJSON() {
    function renderProject(project) {
        return '<li><a href="#" class="animated flipInX">' + project.name + '<img src="' + project.img + '" alt="img01" /></a></li>';
    }

    $.get('projects.json', function (result) {
        result.forEach(function (project) {
            $('#portfolio').append(renderProject(project));
        });
    });
}

function setupScrolling() {
    var lastNav = $('#myName');
    var distanceFromScroll = {
        '#myName': 0
    };

    var calm = './images/myImages/my_image_1.jpg';

    var emotions = [
		'./images/myImages/my_vector_version_two.jpg',
		'./images/myImages/my_vector_version_starwars.jpg',
		'./images/myImages/my_vector_version_open_mouth.jpg'
	];

    var current_emotion_index = Math.floor(Math.random() * emotions.length);

    function getAbsoluteDistance(el) {
        return Math.abs($(el).offset().top - $(document).scrollTop());
    }

    function mapDistanceToScroll(i, el) {
        var elId = $(el).attr('id');
        var navElementSelector = (elId === 'header') ? '#myName' : '#nav-' + elId;

        distanceFromScroll[navElementSelector] = getAbsoluteDistance(el);
    }

    function getClosesedNavigation() {
        var keys = Object.keys(distanceFromScroll);
        var smallest = 0;
        for (var i = 0; i < keys.length; i += 1) {
            if (distanceFromScroll[keys[i]] < distanceFromScroll[keys[smallest]]) {
                smallest = i;
            }
        }

        return keys[smallest];
    }

    function toggleLastNav() {
        var newNav = $(getClosesedNavigation());
        if (newNav[0] !== lastNav[0]) {
            lastNav.toggleClass('active');
            newNav.toggleClass('active');
            lastNav = newNav;
        }
    }

    function animateScroll(target, ms) {
        var targetOffset = target.offset().top;
        $('body').animate({
            scrollTop: targetOffset
        }, (ms || 1500));
    }

    function smileForAwhile(ms) {
        $('#my_img').attr('src', emotions[current_emotion_index]);
        setTimeout(function () {
            $('#my_img').attr('src', calm);
        }, (ms || 1500));
    }

    function onScroll(e) {
        $('.jumbotron, #header').each(mapDistanceToScroll);

        toggleLastNav();

        smileForAwhile(1500);
    }

    $(document).scroll(onScroll);

    onScroll();

    $('.nav a, #myName').click(function () {
        current_emotion_index = Math.floor(Math.random() * emotions.length);
        var target = $(extractHash(this.href));
        if (target.length === 1) {
            animateScroll(target);
            return false;
        }
    });

    window.smileForAwhile = smileForAwhile;
}

function setupLangugageSelector() {
    var cookieLanguage = Cookies.get('language');
    if (cookieLanguage && ['en', 'bg'].indexOf(cookieLanguage) > -1) {
        $('html').attr('lang', cookieLanguage);
        $('#langSelect').val(cookieLanguage);
    }

    $('#langSelect').change(function () {
        var lang = $(this).val();
        $('html').attr('lang', lang);
        Cookies.set('language', lang, {
            expires: 7
        });
    });
}

function setupValidation() {
    $('#send-btn').click(function () {});

    /*
    // EMAIL-VALIDATION
    $.validator.methods.email = function (value, element) {
    	return this.optional(element) || /[a-z]+@[a-z]+\.[a-z]+/.test(value);
    }
    */
}

function onReady() {
    setupLangugageSelector();
    setupScrolling();
    setupValidation();
    getProjectsJSON();
};

$(document).ready(onReady);