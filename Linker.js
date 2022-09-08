// ==UserScript==
// @name         Link Selector
// @version      1.4
// @description  quick link selectors
// @author       Arekusei
// @include      *://pixelplanet.fun/#*
// @include      *://fuckyouarkeros.fun/*
// @updateURL    https://github.com/Arsenicus/Linker/raw/main/Linker.user.js
// @downloadURL  https://github.com/Arsenicus/Linker/raw/main/Linker.user.js

// ==/UserScript==
if ( ! /#/.test(location.hash) ) return;
(function() {

var loadedLinks = JSON.parse(window.localStorage.getItem('Linker'));
var storeLinks = [];
if ((loadedLinks !== "") && (loadedLinks !== null)) {
    storeLinks = loadedLinks;
    console.log(storeLinks);
} else {
    console.log("No links found.")
}

// console.log(loadedLinks);
var foldState = window.localStorage.getItem('LinkerFold');
foldState = foldState == null ? "block" : foldState;
fold = foldState == "block" ? '⇩' : "⇧";
var div = document.createElement('div');
div.setAttribute('id', 'Linker');
div.style.cssText = "left: 185px; color: #FF8000;  position:absolute; z-index: 1; bottom:16px; border: 2px solid rgb(255, 128, 0); ";

div.innerHTML = `
    <div  id="linkView" style=" top: 0em; background-color: rgba(0, 0, 0, 0.99);
    color: rgb(255, 128, 0); text-align: left;  height: 200px; overflow-y: scroll;
    font-size: 70%; clear:both; display: ${foldState} ;">

    </div>
    <div  style="background-color: rgba(0, 0, 0, 0.90); display: flex;
    color: rgb(255, 128, 0); text-align: left; 
    font-size: 70%; clear:both;"/>
    <input type="text" placeholder="Description" style=" max-width: 107px; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);" id="linkInput"></input>
    <input type="submit" value="✚" id="subLink" style=" width: 20pt; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);"></input>
    <input type="submit" value="${fold}" id="fold" style=" width: 20pt; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);">
    </div>`;

document.body.appendChild(div);
addStyle(`
    div#Linker a{
        color:rgb(255, 128, 0);
        margin-left: 5px;
        word-wrap: break-word;
        font-size: 14px; 
    }
    div#Linker .remove{
        float: right; 
        width: 18pt; 
        background-color: black; 
        border-color: #ff8000; 
        color: rgb(255, 128, 0);
        word-wrap: break-word;
        margin-right: 2px;
        padding-inline: inherit;
    }
    div#Linker p{
        overflow: auto;
        background: #d2691e1a;
        margin-block: 5px;

    }
    ::-webkit-scrollbar {
        background-color: #1b1a1a;
        color: #aba499;
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #454a4d;
    }
    #linkView p.hint { background: #d2691e40; }
    #linkView p.active { background: #e40202b8; }

    #linkView .over { background: #e40202b8;}

    #linkView p:hover:after {
      opacity: 1;
      transform: translate(0);
    }



    `)


var linkList = document.querySelector("#linkView");
var oLinks = "";
if (loadedLinks !== null) {

    loadedLinks.forEach(item => {
        var p = document.createElement("p");
        p.setAttribute("draggable", "true");
        //p.style.cssText = `overflow: auto; background: #d2691e3d;margin-block: 5px;`;
        p.innerHTML += '<a  href=' + item[1] + '>' + item[0] + '</a>';

        var span = document.createElement("BUTTON");
        span.classList.add("remove");
        span.textContent = "✖";
        span.addEventListener("click", removeSkill);
        p.appendChild(span); // Add the span to the bullet
        linkList.appendChild(p); // Add the bullet to the list
    })
} else {
    console.log("Couldn't load.")
}

var newSkill = document.querySelector("#linkInput");
var btnSetLink = document.getElementById("subLink");
btnSetLink.addEventListener("click", addLink);

document.getElementById("fold").onclick = function() {
    var state = document.getElementById("linkView").style.display
    var fold;
    state = state == "block" ? "none" : "block";
    fold = state == "block" ? '⇩' : '⇧';
    document.getElementById("fold").value = fold;
    document.getElementById("linkView").style.display = state;
    window.localStorage.setItem('LinkerFold', state);
    //console.log(state);
};

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

function addLink() {
    //console.log("test");
    // if (newSkill.value == "") {
    //     newSkill.value = window.location.hash;
    // }
    newSkill.value = newSkill.value || window.location.hash || "Link";
    storeLinks.push([newSkill.value, document.URL]);
    console.log(storeLinks);
    window.localStorage.setItem('Linker', JSON.stringify(storeLinks));

    // Don't build new HTML by concatenating strings. Create elements and configure them as objects
    var p = document.createElement("p");
    var attr = document.createAttribute('draggable');
    attr.value = 'true';
    p.setAttributeNode(attr);

    //p.style.cssText = `overflow: auto; background: #d2691e3d;margin-block: 5px;`;
    p.innerHTML += '<a href=' + document.URL + '>' + newSkill.value + '</a>';

    // Only use hyperlinks for navigation, not to have something to click on. Any element can be clicked
    var span = document.createElement("BUTTON");
    span.classList.add("remove");
    span.textContent = "✖";
    //span.style.cssText = 'float: right; width: 15%; background-color: black; border-color: #8b4000; color: rgb(255, 128, 0);';
    span.addEventListener("click", removeSkill);
    p.appendChild(span); // Add the span to the bullet
    linkList.appendChild(p); // Add the bullet to the list
    addEventsDragAndDrop(p);
    newSkill.value = "";
    var x = document.getElementById("linkView");
    x.scrollTop = x.scrollHeight - x.clientHeight;

}

function removeSkill() {
    console.log("Clicked");
    // Just remove the closest <li> ancestor to the <span> that got clicked
    var g = document.getElementById('linkView');
    for (var i = 0, len = g.children.length; i < len; i++) {

        (function(index) {
            g.children[i].onclick = function() {
                //alert(index);
                storeLinks.splice(index, 1);
                window.localStorage.setItem('Linker', JSON.stringify(storeLinks));
                console.log(storeLinks);

            }
        })(i);

    }
    console.log(this);
    linkList.removeChild(this.closest("p"));
    //slist("linkView");
}

function changePos(x) {
    if (x.matches) { // If media query matches
        document.getElementById("Linker").style.left = "60px";
        document.getElementById("Linker").style.bottom = "100px";
    } else {
        document.getElementById("Linker").style.left = "185px";
        document.getElementById("Linker").style.bottom = "16px";
    }
}

var x = window.matchMedia("(max-width: 900px)")
changePos(x) // Call listener function at run time
x.addListener(changePos) // Attach listener function on state changes



function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
};

function dragEnter(e) {
    this.classList.add('over');
}

function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
    if (dragSrcEl != this) {
        // dragSrcEl.innerHTML = this.innerHTML;
        //console.log(dragSrcEl);
        // dragSrcEl.children[1].addEventListener("click", removeSkill);

        //Transfer before setting event
        // this.innerHTML = e.dataTransfer.getData('text/html');
        this.children[1].addEventListener("click", removeSkill);
        var first = getElementIndex(dragSrcEl),
            second = getElementIndex(this);
        //swapArrayElements(storeLinks,first,second); 
        storeLinks.move(first, second);
        window.localStorage.setItem('Linker', JSON.stringify(storeLinks));
        // console.log(this.parentNode);

        if (first < second) {
            this.parentNode.insertBefore(dragSrcEl, this.nextSibling);
        } else {
            this.parentNode.insertBefore(dragSrcEl, this);
        }

        // console.log(storeLinks);
        // console.log(first,second);
    }
    return false;
}

function dragEnd(e) {
    var listItens = document.querySelectorAll('#linkView p');
    [].forEach.call(listItens, function(item) {
        item.classList.remove('over');
    });
    this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('#linkView p');
// listItens.forEach.call(listItens, function(item) {
//   addEventsDragAndDrop(item);
// });    

listItens.forEach(item => {
    addEventsDragAndDrop(item);
    // console.log(item);
})

function addNewItem() {
    var newItem = document.querySelector('.input').value;
    if (newItem != '') {
        document.querySelector('.input').value = '';
        var li = document.createElement('li');
        var attr = document.createAttribute('draggable');
        var ul = document.querySelector('ul');
        li.className = 'draggable';
        attr.value = 'true';
        li.setAttributeNode(attr);
        li.appendChild(document.createTextNode(newItem));
        ul.appendChild(li);
        addEventsDragAndDrop(li);
    }
}

function getElementIndex(element) {
    return [].indexOf.call(element.parentNode.children, element);
}
Array.prototype.move = function(from, to) {
    return this.splice(to, 0, this.splice(from, 1)[0]);
};

function arrayMove(array, from, to) {
    return array.splice(to, 0, array.splice(from, 1)[0]);
}
var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};

})();
