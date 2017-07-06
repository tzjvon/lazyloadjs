!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Lazyload=e():t.Lazyload=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e){function n(t,e){return t.className.match(new RegExp("(\\s|^)("+e+")(\\s|$)"))}function i(t,e){if(n(t,e)){var i=t.className.split(/\s+/);i.splice(i.indexOf(e),1),t.className=i.join(" ")}}function s(t,e,n,i){t.addEventListener(e,n,i)}function o(t){return Array.prototype.slice.apply(t,Array.prototype.slice.call(arguments,1))}function r(t,e){return function(){return t.apply(e,arguments)}}function c(t){this.elems=[],this.opts={container:window,className:"lazy",data_src:"data-src",direction:"vertical",placeholder:""};for(var e in t)this.opts[e]=t[e];this.opts.container!=window?("object"==typeof this.opts.container&&1==this.opts.container.nodeType&&this.opts.container instanceof HTMLElement!=1&&(this.opts.container=t.container),"string"==typeof this.opts.container&&(this.opts.container=document.querySelector(t.container)),this.elems=o(this.opts.container.getElementsByClassName(this.opts.className))):this.elems=o(document.getElementsByClassName(this.opts.className));if(!this.opts.container)throw new Error("Have no container");this.container=this.opts.container,this.containerHeight=this._getContainerHeight(),this.containerTop=this._getContainerTop(),this.containerLeft=this._getContainerLeft(),this.containerWidth=this._getContainerWidth(),this._setting(),this._bindEvent(),this.fire("initialized"),this.fire("scroll")}var a=null;!function(){var t=document.createElement("fakeElement");["webkitTransition","MozTransition","transition","OTransition"].some(function(e){if(void 0!==t.style[e])return a=e,!0})}(),c.extend=function(){var t,e,n=arguments;switch(n.length){case 0:return;case 1:t=c.prototype,e=n[0];break;case 2:t=n[0],e=n[1]}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};var h=c.prototype;h._init=function(){this.opts.container!=window?this.elems=o(this.opts.container.getElementsByClassName(this.opts.className)):this.elems=o(document.getElementsByClassName(this.opts.className)),this.containerHeight=this._getContainerHeight(),this.containerTop=this._getContainerTop(),this.containerLeft=this._getContainerLeft(),this.containerWidth=this._getContainerWidth()},h._setting=function(){this.events=["scroll","initialized"],this.on("scroll",this._handleScroll)},h.on=function(t,e){this.events.indexOf(t)<0||"function"!=typeof e||(this.events[t]||(this.events[t]=[]),this.events[t].push(e))},h.off=function(){var t=arguments,e=t[0],n="function"==typeof t[1]?t[1]:null;n?this.events.splice(this.events[e].indexOf(n),1):this.events[e].length=0},h.fire=function(t){var e=t.trim(t),n=this;e=e.split(/\s+/),e.forEach(function(t){var e=n.events[t];e&&e.forEach(function(t){t.call(n)})})},h._getContainerTop=function(){return this.container!=window?this.container.getBoundingClientRect().top:0},h._getContainerLeft=function(){return this.container!=window?this.container.getBoundingClientRect().left:0},h._getContainerWidth=function(){return this.container!=window?this.container.getBoundingClientRect().width:window.innerWidth},h._getContainerHeight=function(){return this.container!=window?this.container.getBoundingClientRect().height:window.innerHeight},h._isInsideViewport=function(t){return!(this._isAtBelow(t)||this._isAtLeft(t)||this._isAtRight(t)||this._isAtTop(t))},h._isAtLeft=function(t){return t.getBoundingClientRect().left+t.getBoundingClientRect().width-this.containerLeft<0},h._isAtRight=function(t){return t.getBoundingClientRect().left-this.containerLeft-this.containerWidth>0},h._isAtTop=function(t){return t.getBoundingClientRect().top+t.getBoundingClientRect().height-this.containerTop<0},h._isAtBelow=function(t){return t.getBoundingClientRect().top-this.containerTop-this.containerHeight>0},h.handleEvent=function(t){var e=t||window.event;switch(e.type){case"scroll":this._handleScroll(e)}},h._bindEvent=function(){s(this.container,"scroll",this)},h._delElemsItem=function(t){this.elems.splice(this.elems.indexOf(t),1)},h._purgeElems=function(){for(var t,e=[],i=0,s=this.elems.length;i<s;i++)t=this.elems[i],n(t,this.opts.className)||e.push(t);for(var o=0,r=e.length;o<r;o++)this._delElemsItem(e[o])},h._handleScroll=function(t){function e(){function t(){this.style.opacity=0,this.src=e.src,setTimeout(function(){this.style[a]="all .4s linear",this.style.opacity=1}.bind(this),16)}i(l,this.opts.className);var e=document.createElement("img");e.src=l.getAttribute(this.opts.data_src);var n=r(t,l);s(e,"load",function(){n(),delete e})}t&&t.preventDefault();for(var o=0,c=this.elems.length;o<c;o++){var h=this.elems[o];if(this._isInsideViewport(h)){var l=this.elems[o];n(l,this.opts.className)&&e.call(this)}}this._purgeElems()},h.update=function(){this._init()},t.exports=c}])});