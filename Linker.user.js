// ==UserScript==
// @name         Link Selector
// @version      1.2
// @description  quick link selectors
// @author       Arekusei
// @include      *://pixelplanet.fun/*
// @include      *://fuckyouarkeros.fun/*
// @updateURL    https://github.com/Arsenicus/Linker/raw/main/Linker.user.js
// @downloadURL  https://github.com/Arsenicus/Linker/raw/main/Linker.user.js

// ==/UserScript==

window.addEventListener('load', function() {

    var loadedLinks = JSON.parse(window.localStorage.getItem('Linker'));
    var storeLinks = [];
    if (loadedLinks !== null) {
        storeLinks = loadedLinks;
    }

    console.log(loadedLinks);
    var foldState = window.localStorage.getItem('LinkerFold'); //window.localStorage.setItem('LinkerFold', storeLinks);
    foldState = foldState == null ? "block" : foldState;

    var div = document.createElement('div');
    div.setAttribute('id', 'Linker');
    div.style.cssText = "left: 185px; color: #FF8000;  position:absolute; bottom:16px; border: 2px solid rgb(255, 128, 0); ";

    div.innerHTML =
        '<div  id="linkView" style=" top: 0em; background-color: rgba(0, 0, 0, 0.90);' +
        'color: rgb(255, 128, 0); text-align: left; width: 15em; height: 200px; overflow-y: scroll;' +
        `font-size: 70%; clear:both; display:` + foldState + `;">` +
        //oLinks +
        '</div>' +
        '<div  style="background-color: rgba(0, 0, 0, 0.90); display: flex;' +
        'color: rgb(255, 128, 0); text-align: left; width: 15em; ' +
        'font-size: 70%; clear:both;"/>' +
        '<input type="text" style="width: 50%; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);" id="linkInput"></input>' +
        '<input type="submit" value="Add" id="subLink" style="width: 30%; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);"></input>' +
        '<input type="submit" value="^" id="fold" style="width: 20%; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);">' +
        '</div>';

    document.body.appendChild(div);

    var skillList = document.querySelector("#linkView");
    var oLinks = "";
    if (loadedLinks !== null) {
        console.log("null place");
        for (var i = 0; i < Object.keys(loadedLinks).length; i++) {
            //oLinks += `<p><a href="` + loadedLinks[i][1] + `">` + loadedLinks[i][0] + `</a></p>`;
            //addEventListener("click", removeSkill);
            var p = document.createElement("p");
            p.innerHTML += '<a style="font-size: small;" href=' + loadedLinks[i][1] + '>' + loadedLinks[i][0] + '</a>';

            var span = document.createElement("BUTTON");
            span.classList.add("remove");
            span.textContent = "X";
            span.style.cssText = 'float: right; width: 15%; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);';
            span.addEventListener("click", removeSkill);
            p.appendChild(span); // Add the span to the bullet
            skillList.appendChild(p); // Add the bullet to the list
        }
    }

    var newSkill = document.querySelector("#linkInput");
    var btnAddSkill = document.getElementById("subLink");
    btnAddSkill.addEventListener("click", addSkill);

    document.getElementById("fold").onclick = function() {
        var state = document.getElementById("linkView").style.display;
        state = state == "block" ? "none" : "block";

        document.getElementById("linkView").style.display = state;
        window.localStorage.setItem('LinkerFold', state);
        console.log(state);
    };



    function addSkill() {
        console.log("test");
        if (newSkill.value == "") {
            newSkill.value = window.location.hash;
        }

        storeLinks.push([newSkill.value, document.URL]);
        console.log(storeLinks);
        window.localStorage.setItem('Linker', JSON.stringify(storeLinks));

        // Don't build new HTML by concatenating strings. Create elements and configure them as objects
        var p = document.createElement("p");
        p.innerHTML += '<a style="font-size: small;" href=' + document.URL + '>' + newSkill.value + '</a>';

        // Only use hyperlinks for navigation, not to have something to click on. Any element can be clicked
        var span = document.createElement("BUTTON");
        span.classList.add("remove");
        span.textContent = "X";
        span.style.cssText = 'float: right; width: 15%; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);';
        span.addEventListener("click", removeSkill);
        p.appendChild(span); // Add the span to the bullet
        skillList.appendChild(p); // Add the bullet to the list
        newSkill.value = "";
        var x = document.getElementById("linkView");
        x.scrollTop = x.scrollHeight - x.clientHeight;
    }

    function removeSkill() {
        // Just remove the closest <li> ancestor to the <span> that got clicked
        var g = document.getElementById('linkView');
        for (var i = 0, len = g.children.length; i < len; i++) {

            (function(index) {
                g.children[i].onclick = function() {
                    //alert(index);
                    storeLinks.splice(index, 1);
                    window.localStorage.setItem('Linker', JSON.stringify(storeLinks));

                }
            })(i);

        }
        skillList.removeChild(this.closest("p"));
    }

}, false);
