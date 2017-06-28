(function () {

    var currentTabID = 1;

    function changeTabs(e) {
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

    document.querySelector("#serviceNavTabs__list").addEventListener('click', function(e){
        changeTabs(e);
    });

    document.querySelector("#menuButton").addEventListener('click', function(){
        if(document.querySelector(".navigation").classList.contains('navigation--open')) {
            document.querySelector(".navigation").classList.remove('navigation--open');
        } else {
            document.querySelector(".navigation").classList.add('navigation--open');
        }
    });

})()