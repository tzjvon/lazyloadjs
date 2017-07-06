
function noop() { }
function hasClass(el, cl) {
    return el.className.match(new RegExp('(\\s|^)(' + cl + ')(\\s|$)'));
}
function addClass(el, cl) {
    if (!hasClass(el, cl)) {
        el.className += (el.className ? ' ' : '') + cl;
    }
}
function removeClass(el, cl) {
    if (hasClass(el, cl)) {
        var arr = el.className.split(/\s+/);
        arr.splice( arr.indexOf(cl), 1 );
        el.className = arr.join(' ');
    }
}

function addEvent(el, type, fn, bubble) {
    el.addEventListener(type, fn, bubble);
}
function addEventOnce(el, type, fn, bubble) {
    el.addEventListener(type, function () {
        el.removeEventListener(type, arguments.callee);
        fn();
    }, bubble);
}
function removeEvent(el, type, fn){
    el.removeEventListener(type, fn)
}
function setAttrs(el, obj) {
    for (var key in obj) {
        el.setAttribute(key, obj[key]);
    }
}
function _A(a) {
    return Array.prototype.slice.apply(a, Array.prototype.slice.call(arguments,1));
}
function _bind(fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    }
}

function getNow() {
    return +new Date();
}

var TRANSITION = null;
(function () {
    var e = document.createElement('fakeElement');

    [
        'webkitTransition',
        'MozTransition',
        'transition',
        'OTransition'
    ].some(function (item) {
        if (e.style[item] !== undefined) {
            TRANSITION = item;
            return true;
        }
    })
})();



/* Below is the core of the lazyload plugin */
function LL(_opts) {
    this.elems = [];

    this.opts = {
        container: window,
        className: 'lazy',
        data_src: 'data-src',
        direction: 'vertical', /*horizontal*/
        placeholder: ''
    };

    for (var key in _opts) {
        this.opts[key] = _opts[key];
    }

    if (this.opts.container != window) {

        if (typeof this.opts.container == 'object' && this.opts.container.nodeType == 1 && (this.opts.container instanceof HTMLElement) != true) {
            this.opts.container = _opts.container;
        }
        if (typeof this.opts.container == 'string') {
            this.opts.container = document.querySelector(_opts.container);
        }
        this.elems = _A(this.opts.container.getElementsByClassName(this.opts.className));

    }else{
        this.elems = _A(document.getElementsByClassName(this.opts.className));
    }

    var self = this;

    // this.elems.forEach(function (el) {
    //     el.style[TRANSITION] = 'all ,3s linear';
    //     el.src = self.opts.placeholder
    //     el.style.backgroundImage = 'url('+self.opts.placeholder+')';
    //     el.style.backgroundPosition = '50% 50%';
    //     el.style.backgroundSize = 'contain';

    // });

    if (!this.opts.container) {
        throw new Error('Have no container');
    }

    this.container = this.opts.container;

    this.containerHeight = this._getContainerHeight();
    this.containerTop = this._getContainerTop();
    this.containerLeft = this._getContainerLeft();
    this.containerWidth = this._getContainerWidth();


    this._setting();
    this._bindEvent();

    this.fire('initialized');
    this.fire('scroll');

}

LL.extend = function () {
    var main, extend, args = arguments;

    switch (args.length) {
        case 0:
            return;
        case 1:
            main = LL.prototype;
            extend = args[0];
            break;
        case 2:
            main = args[0];
            extend = args[1];
            break;
    }

    for (var property in extend) {
        if (extend.hasOwnProperty(property)) {
            main[property] = extend[property];
        }
    }
};

var LLFn = LL.prototype;
LLFn._init = function () {
    if (this.opts.container != window) {
        this.elems = _A(this.opts.container.getElementsByClassName(this.opts.className));
    }else {
        this.elems = _A(document.getElementsByClassName(this.opts.className));
    }

    this.containerHeight = this._getContainerHeight();
    this.containerTop = this._getContainerTop();
    this.containerLeft = this._getContainerLeft();
    this.containerWidth = this._getContainerWidth();
};
LLFn._setting = function () {
    this.events = [
        'scroll',
        'initialized'
    ];

    this.on('scroll', this._handleScroll);
};

LLFn.on = function (eventName, fn) {
    if (this.events.indexOf(eventName) < 0 || typeof fn != 'function') {return;}

    if (!this.events[eventName]) { this.events[eventName] = []; }

    this.events[eventName].push(fn);
};

LLFn.off = function () {
    var args = arguments;
    var eventName = args[0];
    var fn = typeof args[1] == 'function' ? args[1] : null;

    if (fn) {
        this.events.splice(this.events[eventName].indexOf(fn), 1);
    }else {
        this.events[eventName].length = 0;
    }
};

LLFn.fire = function (en) {
    var _a = en.trim(en),
        self = this;
    _a = _a.split(/\s+/);

    _a.forEach(function (eventName) {
        var fnevents = self.events[eventName];
        if (fnevents) {
            fnevents.forEach(function (fn) {
                fn.call(self);
            });
        }
    })
};

LLFn._getContainerTop = function () {
    if (this.container != window) {
        return this.container.getBoundingClientRect().top;
    }

    return 0;
};
LLFn._getContainerLeft = function () {
    if (this.container != window) {
        return this.container.getBoundingClientRect().left;
    }

    return 0;
};
LLFn._getContainerWidth = function () {
    if (this.container != window) {
        return this.container.getBoundingClientRect().width;
    }

    return window.innerWidth;
};
LLFn._getContainerHeight = function () {
    if (this.container != window) {
        return this.container.getBoundingClientRect().height;
    }

    return window.innerHeight;
};

LLFn._isInsideViewport = function(el) {
    return !this._isAtBelow(el) && !this._isAtLeft(el) && !this._isAtRight(el) && !this._isAtTop(el);
};

LLFn._isAtLeft = function (el) {
    return el.getBoundingClientRect().left + el.getBoundingClientRect().width - this.containerLeft < 0;
};
LLFn._isAtRight = function (el) {
    return el.getBoundingClientRect().left - this.containerLeft - this.containerWidth > 0;
};
LLFn._isAtTop = function (el) {
    return el.getBoundingClientRect().top + el.getBoundingClientRect().height - this.containerTop < 0;
};
LLFn._isAtBelow = function (el) {
    return el.getBoundingClientRect().top - this.containerTop - this.containerHeight > 0
};

LLFn.handleEvent = function (e) {
    var evt = e || window.event;

    switch (evt.type) {
        case 'scroll':
            this._handleScroll(evt);
            break;
    }
};

LLFn._bindEvent = function () {
    addEvent(this.container, 'scroll', this);
};

LLFn._delElemsItem = function (el) {
    this.elems.splice(this.elems.indexOf(el), 1);
};

LLFn._purgeElems = function () {
    var arr = [];
    for (var i = 0, len = this.elems.length, el;i<len;i++) {
        el = this.elems[i];
        if (!hasClass(el, this.opts.className)){
            arr.push(el);
        }
    }

    for (var j = 0,alen = arr.length; j< alen;j++) {
        this._delElemsItem(arr[j]);
    }
};


LLFn._handleScroll = function (e) {
    if (e) {
        e.preventDefault();
    }

    for (var i = 0, len = this.elems.length;i<len;i++) {
        var el = this.elems[i];
        if (this._isInsideViewport(el)) {
            var _el = this.elems[i];

            if (hasClass(_el, this.opts.className)) {
                fakeImgMethed.call(this);
                function generatorMehod() {
                    removeClass(_el, this.opts.className);
                    _el.src = _el.getAttribute(this.opts.data_src);
                    _el.style.opacity = 0;
                    addEvent(_el, 'load', function () {
                        console.log(this);

                        this.style[TRANSITION] = 'all .3s linear';
                        this.style.opacity = 1;
                    });
                }
                function fakeImgMethed() {
                    removeClass(_el, this.opts.className);

                    var oImg = document.createElement('img');
                    oImg.src = _el.getAttribute(this.opts.data_src);

                    function _loadImg() {
                        this.style.opacity = 0;
                        this.src = oImg.src;

                        setTimeout(function () {
                            this.style[TRANSITION] = 'all .4s linear';
                            this.style.opacity = 1;
                        }.bind(this), 16);
                    }

                    var _ = _bind(_loadImg, _el);

                    addEvent(oImg, 'load', function () {
                        _();

                        delete oImg;
                    });
                }

            }
        }
    }

    this._purgeElems();

};

LLFn.update = function () {
    this._init();
};




module.exports = LL;