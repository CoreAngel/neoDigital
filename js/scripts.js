(function () {

    var currentTabID = 1;

    var changeTabs = function(e) {
        e.preventDefault();

        if (e.target && e.target.nodeName == "LI" || e.target.nodeName == "A") {

            var elementLi =  e.target;

            if(e.target.nodeName == "A") {
                elementLi = e.target.parentNode;
            }

            var elementID = elementLi.id;
            var elementNumber = elementID.replace("serviceNavTab-", "");
            var tabID = "serviceTab-" + elementNumber;
            var magicRec = document.querySelector("#magicRec");
            var offsetList = document.querySelector("#serviceNavTabs__list").offsetLeft;
            var offsetListElement = document.querySelector("#"+elementID).offsetLeft;

            magicRec.style.width = elementLi.offsetWidth + "px";
            magicRec.style.left = offsetListElement - offsetList + "px";

            if(currentTabID != elementNumber) {
                document.querySelector("#" + tabID).classList.add("serviceTabs__tab--visible");
                document.querySelector("#" + "serviceTab-" + currentTabID).classList.remove("serviceTabs__tab--visible");

                currentTabID = elementNumber;
            }

        }
    }


    var letVisibleTeam = function (e) {
        let focuedElement = e.target;
        focuedElement.parentNode.parentNode.classList.add("member__container--visible");
    }


    var removeVisibleTeam = function (e) {
        let focuedElement = e.target;
        focuedElement.parentNode.parentNode.classList.remove("member__container--visible");
    }

    var clickCloseMobileMenu = function (e) {
        var navBarElement = document.querySelector("#navBarContainer");
        if(!navBarElement.contains(e.target)) {
            navBarElement.querySelector('.navigation').classList.remove('navigation--open');
        }
    }

    var smoothScroll = function (to, time, e) {
        var directory,
            distance;

        var startScrollTop = document.body.scrollTop
        var tempDistance = to.offsetTop - startScrollTop;

        if(tempDistance < 0) {
            directory = 'up';
            distance = tempDistance * (-1);
        }else if(tempDistance == 0) {
            window.location.hash = e.target.getAttribute("href");
            return;
        } else {
            directory = 'down';
            distance = tempDistance;
        }

        var x = 0;
        var step = 1/time*5;
        if(directory == 'down') {
            var interval = setInterval(function () {
                var number = 3 * Math.pow(x,2) - 2 * Math.pow(x,3);

                x+=step;
                if(x >= 1) {
                    clearInterval(interval);
                    window.location.hash = e.target.getAttribute("href");
                }
                window.scrollTo(0, startScrollTop+(number*distance));
            }, 5)
        } else {
            var interval = setInterval(function () {
                var number = 3 * Math.pow(x,2) - 2 * Math.pow(x,3);

                x+=step;
                if(x >= 1) {
                    clearInterval(interval);
                    window.location.hash = e.target.getAttribute("href");
                }
                window.scrollTo(0, startScrollTop-(number*distance));
            }, 5)
        }


    }


    document.querySelector("#serviceNavTabs__list").addEventListener('click', function(e){
        changeTabs(e);
    });

    document.querySelectorAll(".member__button").forEach(function (button) {
        button.addEventListener('focus', function(e){
            letVisibleTeam(e);
        });
        button.addEventListener('blur', function(e){
            removeVisibleTeam(e);
        });
    })

    document.addEventListener('click', clickCloseMobileMenu);

    document.querySelector("#menuButton").addEventListener('click', function(){
        if(document.querySelector(".navigation").classList.contains('navigation--open')) {
            document.querySelector(".navigation").classList.remove('navigation--open');
            setTimeout(() => document.querySelector(".navigation").classList.add('navigation--invisible'), 100)
        } else {
            document.querySelector(".navigation").classList.remove('navigation--invisible');
            setTimeout(() => document.querySelector(".navigation").classList.add('navigation--open'), 10);
        }
    });

    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(function (button) {
        button.addEventListener('click', function(e){
            e.preventDefault();
            smoothScroll(document.querySelector(button.getAttribute("href")), 500, e);
        });
    })

})()