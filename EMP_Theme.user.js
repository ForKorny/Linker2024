// ==UserScript==
// @name         PPF Theme
// @version      1.0
// @description  Set new theme
// @author       Arekusei
// @include      *://pixelplanet.fun/*
// @include      *://fuckyouarkeros.fun/*

// ==/UserScript==
(function() {

    function addStyle(styleString) {
        const style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }

addStyle(`
<style>
a:link {
  color: chartreuse;
}

a:visited {
  color: darkorange;
}

a:hover {
  color: orange;
}

.modallink {
  color: orange;
}

.modallink:hover {
  color: #d9f68a;
}

.inarea {
  border-color: black;
}

.tab-list-active {
  background-color: #7b7b7b;
}

tr:nth-child(even) {
  background-color: #292929;
}

.chatbox {
  background-color: #565656;
}
.chatbox.show {
	z-index: 1;
}
.actionbuttons, .coorbox, .onlinebox, .cooldownbox, .palettebox, #historyselect, .notifybox {
  background-color: #e86f18db;
  color: black;
  z-index: 1;
}

.menu > div {
  z-index: 1;
  background-color: #d28800d1;
}

.Modal {
  background: #151515 none repeat scroll 0 0;;
  color: darkorange;
}

.modaltext, .modalcotext {
  color: darkorange;
}

.modaltitle {
  color: darkorange;
}

.modaldesc {
  color: hsla(220, 100%, 95.3%, 0.6);
}

.modaldivider {
  background-color: hsla(216, 4%, 74%, .3);
}

.modalinfo {
  color: #9a9a9a;
}

.modalcvtext {
  color: hsla(220, 100%, 95.3%, 0.6);
}

.ModalClose {
  background-color: #55555d;
  border-color: #dcddde;
}

.ModalClose:hover {
  background-color: #6f6f75;
}

.Overlay {
  background-color: rgb(101 58 21 / 75%);
}

.chatmsg {
  color: white;
}
.chatname {
  color: chartreuse;
}
.msg.info{
  color: #ff91a6;
}
.msg.greentext{
  color: #94ff94;
}

#chatlink {
  color: #f9edde;
}

.statvalue {
  color: orange;
}

.notifybox.green, .notifybox.red {
  color: black;
}
.notifybox.green.show {
    background-color: orange;
}
.actionbuttons:hover, .coorbox:hover, .menu > div:hover {
  background-color: #363637;
}

#outstreamContainer {
  background-color: black;
}

element.style {
    margin-bottom: 0px;
}
::-webkit-scrollbar {
    background-color: #202324;
    color: #aba499;
}
::-webkit-scrollbar-thumb {
    background-color: #454a4d;
}

</style>
`);

})();
