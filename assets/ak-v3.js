/** <!-- one more test for cache awesomeness -->
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler ○ gmail • com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.3
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});
/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.0
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var g=location.href.replace(/#.*/,'');var h=$.localScroll=function(a){$('body').localScroll(a)};h.defaults={duration:1000,axis:'y',event:'click',stop:true,target:window};$.fn.localScroll=function(a){a=$.extend({},h.defaults,a);if(a.hash&&location.hash){if(a.target)window.scrollTo(0,0);scroll(0,location,a)}return a.lazy?this.on(a.event,'a,area',function(e){if(filter.call(this)){scroll(e,this,a)}}):this.find('a,area').filter(filter).bind(a.event,function(e){scroll(e,this,a)}).end().end();function filter(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')===g&&(!a.filter||$(this).is(a.filter))}};h.hash=function(){};function scroll(e,a,b){var c=a.hash.slice(1),elem=document.getElementById(c)||document.getElementsByName(c)[0];if(!elem)return;if(e)e.preventDefault();var d=$(b.target);if(b.lock&&d.is(':animated')||b.onBefore&&b.onBefore(e,elem,d)===false)return;if(b.stop){d.stop(true)}if(b.hash){var f=elem.id===c?'id':'name',$a=$('<a> </a>').attr(f,c).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});elem[f]='';$('body').prepend($a);location.hash=a.hash;$a.remove();elem[f]=c}d.scrollTo(elem,b).trigger('notify.serialScroll',[elem])}return h}));

/*! no-blend uglified | https://gist.github.com/mhulse/6ec4db51a61eb958b82d */
!function(e,n){e.getComputedStyle(n.head,null).mixBlendMode&&(n.documentElement.className=n.documentElement.className.replace(/\bno-blend\b/,"blend"))}(window,document);

// sticky.js - https://github.com/garand/sticky
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){var b=Array.prototype.slice,c=Array.prototype.splice,d={topSpacing:0,bottomSpacing:0,className:"is-sticky",wrapperClassName:"sticky-wrapper",center:!1,getWidthFrom:"",widthFromWrapper:!0,responsiveWidth:!1,zIndex:"auto"},e=a(window),f=a(document),g=[],h=e.height(),i=function(){for(var b=e.scrollTop(),c=f.height(),d=c-h,i=b>d?d-b:0,j=0,k=g.length;j<k;j++){var l=g[j],m=l.stickyWrapper.offset().top,n=m-l.topSpacing-i;if(l.stickyWrapper.css("height",l.stickyElement.outerHeight()),b<=n)null!==l.currentTop&&(l.stickyElement.css({width:"",position:"",top:"","z-index":""}),l.stickyElement.parent().removeClass(l.className),l.stickyElement.trigger("sticky-end",[l]),l.currentTop=null);else{var o=c-l.stickyElement.outerHeight()-l.topSpacing-l.bottomSpacing-b-i;if(o<0?o+=l.topSpacing:o=l.topSpacing,l.currentTop!==o){var p;l.getWidthFrom?p=a(l.getWidthFrom).width()||null:l.widthFromWrapper&&(p=l.stickyWrapper.width()),null==p&&(p=l.stickyElement.width()),l.stickyElement.css("width",p).css("position","fixed").css("top",o).css("z-index",l.zIndex),l.stickyElement.parent().addClass(l.className),null===l.currentTop?l.stickyElement.trigger("sticky-start",[l]):l.stickyElement.trigger("sticky-update",[l]),l.currentTop===l.topSpacing&&l.currentTop>o||null===l.currentTop&&o<l.topSpacing?l.stickyElement.trigger("sticky-bottom-reached",[l]):null!==l.currentTop&&o===l.topSpacing&&l.currentTop<o&&l.stickyElement.trigger("sticky-bottom-unreached",[l]),l.currentTop=o}var q=l.stickyWrapper.parent(),r=l.stickyElement.offset().top+l.stickyElement.outerHeight()>=q.offset().top+q.outerHeight()&&l.stickyElement.offset().top<=l.topSpacing;r?l.stickyElement.css("position","absolute").css("top","").css("bottom",0).css("z-index",""):l.stickyElement.css("position","fixed").css("top",o).css("bottom","").css("z-index",l.zIndex)}}},j=function(){h=e.height();for(var b=0,c=g.length;b<c;b++){var d=g[b],f=null;d.getWidthFrom?d.responsiveWidth&&(f=a(d.getWidthFrom).width()):d.widthFromWrapper&&(f=d.stickyWrapper.width()),null!=f&&d.stickyElement.css("width",f)}},k={init:function(b){return this.each(function(){var c=a.extend({},d,b),e=a(this),f=e.attr("id"),h=f?f+"-"+d.wrapperClassName:d.wrapperClassName,i=a("<div></div>").attr("id",h).addClass(c.wrapperClassName);e.wrapAll(function(){if(0==a(this).parent("#"+h).length)return i});var j=e.parent();c.center&&j.css({width:e.outerWidth(),marginLeft:"auto",marginRight:"auto"}),"right"===e.css("float")&&e.css({float:"none"}).parent().css({float:"right"}),c.stickyElement=e,c.stickyWrapper=j,c.currentTop=null,g.push(c),k.setWrapperHeight(this),k.setupChangeListeners(this)})},setWrapperHeight:function(b){var c=a(b),d=c.parent();d&&d.css("height",c.outerHeight())},setupChangeListeners:function(a){if(window.MutationObserver){var b=new window.MutationObserver(function(b){(b[0].addedNodes.length||b[0].removedNodes.length)&&k.setWrapperHeight(a)});b.observe(a,{subtree:!0,childList:!0})}else window.addEventListener?(a.addEventListener("DOMNodeInserted",function(){k.setWrapperHeight(a)},!1),a.addEventListener("DOMNodeRemoved",function(){k.setWrapperHeight(a)},!1)):window.attachEvent&&(a.attachEvent("onDOMNodeInserted",function(){k.setWrapperHeight(a)}),a.attachEvent("onDOMNodeRemoved",function(){k.setWrapperHeight(a)}))},update:i,unstick:function(b){return this.each(function(){for(var b=this,d=a(b),e=-1,f=g.length;f-- >0;)g[f].stickyElement.get(0)===b&&(c.call(g,f,1),e=f);e!==-1&&(d.unwrap(),d.css({width:"",position:"",top:"",float:"","z-index":""}))})}};window.addEventListener?(window.addEventListener("scroll",i,!1),window.addEventListener("resize",j,!1)):window.attachEvent&&(window.attachEvent("onscroll",i),window.attachEvent("onresize",j)),a.fn.sticky=function(c){return k[c]?k[c].apply(this,b.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.sticky"):k.init.apply(this,arguments)},a.fn.unstick=function(c){return k[c]?k[c].apply(this,b.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.sticky"):k.unstick.apply(this,arguments)},a(function(){setTimeout(i,0)})});

/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery );


;(function($){var l=location.href.replace(/#.*/,'');var g=$.localScroll=function(a){$('body').localScroll(a)};g.defaults={duration:1e3,axis:'y',event:'click',stop:true,target:window,reset:true};g.hash=function(a){if(location.hash){a=$.extend({},g.defaults,a);a.hash=false;if(a.reset){var e=a.duration;delete a.duration;$(a.target).scrollTo(0,a);a.duration=e}i(0,location,a)}};$.fn.localScroll=function(b){b=$.extend({},g.defaults,b);return b.lazy?this.bind(b.event,function(a){var e=$([a.target,a.target.parentNode]).filter(d)[0];if(e)i(a,e,b)}):this.find('a,area').filter(d).bind(b.event,function(a){i(a,this,b)}).end().end();function d(){return!!this.href&&!!this.hash&&this.href.replace(this.hash,'')==l&&(!b.filter||$(this).is(b.filter))}};function i(a,e,b){var d=e.hash.slice(1),f=document.getElementById(d)||document.getElementsByName(d)[0];if(!f)return;if(a)a.preventDefault();var h=$(b.target);if(b.lock&&h.is(':animated')||b.onBefore&&b.onBefore.call(b,a,f,h)===false)return;if(b.stop)h.stop(true);if(b.hash){var j=f.id==d?'id':'name',k=$('<a> </a>').attr(j,d).css({position:'absolute',top:$(window).scrollTop(),left:$(window).scrollLeft()});f[j]='';$('body').prepend(k);location=e.hash;k.remove();f[j]=d}h.scrollTo(f,b).trigger('notify.serialScroll',[f])}})(jQuery);
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.5.3
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2015, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      autoDispose: true,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: 'any moment now',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },

    inWords: function(distanceMillis) {
      if (!this.settings.allowPast && ! this.settings.allowFuture) {
          throw 'timeago allowPast and allowFuture settings can not both be set to false.';
      }

      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      if (!this.settings.allowPast && distanceMillis >= 0) {
        return this.settings.strings.inPast;
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },

    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      s = s.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function() {
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(timestamp) {
      var date = (timestamp instanceof Date) ? timestamp : $t.parse(timestamp);
      $(this).data('timeago', { datetime: date });
      if ($t.settings.localeTitle) {
        $(this).attr("title", date.toLocaleString());
      }
      refresh.apply(this);
    },
    updateFromDOM: function() {
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if (!fn) {
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function() {
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var $s = $t.settings;

    //check if it's still visible
    if ($s.autoDispose && !$.contains(document.documentElement,this)) {
      //stop if it has been removed
      $(this).timeago("dispose");
      return this;
    }

    var data = prepareData(this);

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff === 0 || Math.abs(distance(data.datetime)) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      } else {
        if ($(this).attr('title').length > 0) {
            $(this).text($(this).attr('title'));
        }
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));


/**
 * Pop-up a new window (mostly for share on FB/twitter dialog windows)
 */
(function($){
	jQuery.fn.newWindowPopup = function(){
		jQuery(this).on('click', function(e){
		    e.preventDefault();
		    var destination = jQuery(this).attr('href');
			var popupWidthAttr = jQuery(this).attr('data-popup-width');
			var popupHeightAttr = jQuery(this).attr('data-popup-height');
			if ( jQuery(this).is('.fb-share, .button-facebook, .button-share-facebook') ){
				popupWidth = 520;
				popupHeight = 350;
			} else if ( jQuery(this).is('.tw-share, .button-twitter, .button-share-twitter') ){
				popupWidth = 550;
				popupHeight = 420;
			} else if ( popupHeightAttr || popupWidthAttr ){
				if ( popupHeightAttr ){
					popupHeight = popupHeightAttr;
				}
				if ( popupWidthAttr ){
					popupWidth = popupWidthAttr;
				}
			} else {
				popupWidth = 500;
				popupHeight = 500;
			}
			var winTop = (screen.height / 2) - (popupHeight / 2);
			var winLeft = (screen.width / 2) - (popupWidth / 2);
	    	window.open( destination , 'new-window-popup', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,resizable=yes,scrollbars=yes,width=' + popupWidth + ',height=' + popupHeight );
	    });
	}
}(jQuery));


/**
 * Take multiple children, hide all but the first N, and add a "read more" link
 */
(function($){
	jQuery.fn.truncateAndReadMore = function(){
		// Set up translations
		var readMoreTranslations = {
			ar: "Ø§Ù‚Ø±Ø£&nbsp;Ø£ÙƒØ«Ø±",
			de: "Weiterlesen",
			en: "Read&nbsp;More",
			es: "Leer&nbsp;más",
			fr: "Lire&nbsp;la&nbsp;Suite",
			id: "Baca lebih lajut",
			ja: "続きを読む",
			pl: "Czytaj dalej",
			pt: "Leia&nbsp;mais",
			tr: "Daha&nbsp;fazla&nbsp;oku",
			uk: 'Детальна інформація',
		};
		var readMoreText = readMoreTranslations['en'];
		// Detect language
		var htmlLangAttr = $('html').attr('lang');
		if ( htmlLangAttr && readMoreTranslations[htmlLangAttr] ){
			readMoreText = readMoreTranslations[htmlLangAttr];
		}
		// For each element targeted...
		return this.each(function(){
      // get number of paragraphs to hide
      var visElems = $(this).attr('data-read-more-after');
      var visElems = (visElems > 0) ? visElems : 2 ;
			// Set up click handler function
			jQuery(this).on('readMoreEventSetup', function(){
				var target = jQuery(this);
				jQuery(this).find('.read-more').on('click', function(e){
					e.preventDefault();
					jQuery(this).hide();
					target.children(':hidden').fadeIn();
				});
			});
			// Make sure there's more than N children element in the container
			var firstParaSibs = jQuery(this).children();
			// Hide extra para's, add "read more", trigger click handler setup event
			if ( firstParaSibs.length > visElems){
				firstParaSibs
					.not('.do-not-hide')
					.hide()
					.siblings(":lt(" + (visElems-1) + ")") // uses zero-based index counting
          .addBack(":eq(0)") // I'm not entirely sure why the first element gets skipped, but apparently it does, so add it back
					.show()
          .last()
					.append(' <a class="read-more">' + readMoreText +'</a>')
					.trigger('readMoreEventSetup');
			}

		});
	}
}(jQuery));

// find adjacent matching siblings and wrap them with a tag
(function($){
	$.fn.findAdjacentSibsAndWrap = function( sibFilter, wrapperTag, wrapperClass ){
    $(this).each(function(){
      if ( $(this).prev( sibFilter ).length ){ /* if element is preceded by matching sib, create wrapper */
        $(this)
          .prev() /* take the previous sibling, which we've already established passes the filter */
          .addBack() /* add the current element into the set */
          .wrapAll('<' + wrapperTag + ' class="' + wrapperClass + '"/>'); /* take the results and wrap a tag around them */
      }
      if ( $(this).prev('.' + wrapperClass ).length ){
        $(this)
          .prev() /* take the prev. sib which we've established is a group wrapper */
          .append( this ); /* append the current element into the group wrapper */
      }
    });
	}
}(jQuery));

// use data-preselect to pre-select options within <select> tags
(function($){
	$.fn.preselect = function(){
		return this.each(function(){
			var preselectOption = $(this).attr('data-preselect');
			$(this).val( preselectOption ).change();
		});
	}
}(jQuery));

// click element to select its text
(function($){
  $.fn.clickToSelectText = function(){
    return this.each(function(){
      $(this).on('click', function(){
        $(this).focus();
        $(this).select();
      });
    });
  }
}(jQuery));

// Expandooo
(function($){
  $.fn.expando = function(){
    $(this).each(function(){
      var expandoText = $(this).attr("title");
      var expandoText2 = $(this).find('h1,h2,h3,h4,h5,h6').first().addClass('hidden').html();
      var expandoText3raw = $(this).children().first().text();
      var expandoText3 = expandoText3raw.substring(0,60);
      var expandedOnLoad = $(this).hasClass('expanded');

      if ( expandoText ){
        $(this).wrapInner('<div class="expando-inner" />').prepend('<a class="expando-link" href="#">' + expandoText + '</a>');
        console.log('expandoText1!');
      } else if (expandoText2) {
        $(this).wrapInner('<div class="expando-inner" />').prepend('<a class="expando-link" href="#">' + expandoText2 + '</a>');
        console.log('expandoText2!');
      } else if (expandoText3) {
        $(this).wrapInner('<div class="expando-inner" />').prepend('<a class="expando-link" href="#">' + expandoText3 + '...</a>');
        console.log('expandoText3!');
      } else {
        $(this).wrapInner('<div class="expando-inner" />').prepend('<a class="expando-link" href="#">Click to expand</a>');
      };
      // if
      if ( !expandedOnLoad ){
        $(this).addClass('collapsed');
      }

    });
    $("a.expando-link").click(function(e){
      e.preventDefault();
      $(this)
        .parent()
        .toggleClass('expanded')
        .toggleClass('collapsed');
    });
    return this;
  }
}(jQuery));
// Modal
(function($){
  $.fn.modal = function(){
    return this.each(function(index){
      // switch index to start from 1 instead of 0 for readability in the markup
      index++;
      // check for option to disable automatic hiding of source element
      var showSourceElem = $(this).attr('data-modal-show-source');
      // get the ID of the element that contains the content for the modal from the "data-modal-source" attribute in the HTML tag
      var modalSourceID = $(this).attr('data-modal-source');
      var modalSourceElem = $( modalSourceID );
      var modalWrapperId = 'modal-' + index;
      // if showing the source element...
      if (showSourceElem){
          modalSourceElem.removeClass('hidden js-hidden');
      } else {
          // Make sure the modal source element is hidden only with inline styles
          modalSourceElem.hide().removeClass('hidden js-hidden');
      }
      // get the optional list of classes to add to the inner content area from the "data-modal-classes-inner" attribute in the HTML tag
      var modalInnerClassesAttr = $(this).attr('data-modal-classes-inner');
      // use the default classes to set the inner modal to be a white box with lots of padding
      var modalInnerClasses = modalInnerClassesAttr ? modalInnerClassesAttr : 'box box-huge padding-medium bg-white text-dark';
      // get the optional list of classes to add to the inner content area from the "data-modal-classes-outer" attribute in the HTML tag
      var modalOuterClassesAttr = $(this).attr('data-modal-classes-outer');
      // use the default classes to set the modal container to have a transparent dark gray background and lots of horizontal padding
      var modalOuterClasses = modalOuterClassesAttr ? modalOuterClassesAttr : 'bg-dkgray-trans width-narrow';

      // set up modal wrappers
      // assemble the outer and inner modal wrappers around the content
      var modal = '<div id="' + modalWrapperId + '" class="modal-wrapper section ' + modalOuterClasses + '"><div class="modal-content section-inner ' + modalInnerClasses + '"><a class="modal-close">X</a></div></div>';
      // append the modal before the closing </body> tag and add the class "open" (which hooks into CSS3 animations)
      // NOTE: animate() is used just to provide a slight delay before adding the 'open' class, which is necessary to trigger CSS3 animation (for some reason)
      $(modal).appendTo('body');

			// set up the click event
			$(this).on('click', function(e){
				e.preventDefault();
        // unhide the source element before appending it to the modal window
        modalSourceElem.show();
        $('#' + modalWrapperId).addClass('open').children('.section-inner').append(modalSourceElem);
        // check for any lazy loading inside the modal and swap data-src into src and kill any spinners
        $('#' + modalWrapperId).find('[data-src]').each(function(){
            var modalDataSrc = $(this).attr('data-src');
            $(this).attr('src',modalDataSrc).removeClass('lazy').parent().spin(false);;
        });
				// set up the "close modal" function
				function modalClose(){
					$('#' + modalWrapperId).removeClass('open');
					$(document).unbind("keyup", modalClose );
				}
				// call modalClose() when the "close" button is clicked
				$('.modal-close').on('click', function(event){
					modalClose();
					event.stopPropagation();
				});
				// call modalClose() when the modal background is clicked
				$('#' + modalWrapperId).on('click', function(){
					modalClose();
				});
				// stop clicks in the modal content from propagating up and triggering a "close" event
				$('.modal-content').on('click',function(event){
					event.stopPropagation();
				});
				// call modalClose() when the Esc key is pressed
				$(document).keyup(function(e){
	     		if (e.keyCode == 27) {
	     			modalClose();
	     		}
	    	});
			});
		});
	}
}(jQuery));
/* Debounce */
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/*
 * .visible function – checks if element is in viewport
 */
!function(t){var i=t(window);t.fn.visible=function(t,e,o){if(!(this.length<1)){var r=this.length>1?this.eq(0):this,n=r.get(0),f=i.width(),h=i.height(),o=o?o:"both",l=e===!0?n.offsetWidth*n.offsetHeight:!0;if("function"==typeof n.getBoundingClientRect){var g=n.getBoundingClientRect(),u=g.top>=0&&g.top<h,s=g.bottom>0&&g.bottom<=h,c=g.left>=0&&g.left<f,a=g.right>0&&g.right<=f,v=t?u||s:u&&s,b=t?c||a:c&&a;if("both"===o)return l&&v&&b;if("vertical"===o)return l&&v;if("horizontal"===o)return l&&b}else{var d=i.scrollTop(),p=d+h,w=i.scrollLeft(),m=w+f,y=r.offset(),z=y.top,B=z+r.height(),C=y.left,R=C+r.width(),j=t===!0?B:z,q=t===!0?z:B,H=t===!0?R:C,L=t===!0?C:R;if("both"===o)return!!l&&p>=q&&j>=d&&m>=L&&H>=w;if("vertical"===o)return!!l&&p>=q&&j>=d;if("horizontal"===o)return!!l&&m>=L&&H>=w}}}}(jQuery);

/* Toggle classes for "jump to form" button if the form is in the viewport */
function showHideJumpToForm(){
  var jumpToFormLink = jQuery("#jump-to-form");
	var isEmailVisible = jQuery("#id-email").visible();
	var isSubmitVisible = jQuery("button[type='submit']").visible(true);
  // for multi-step donation pages where email and submit are hidden in later steps
  var isAmountListVisible = jQuery("#ak-amount-list").visible(true);

  jumpToFormLink.removeClass('mobile-hide tablet-hide');
	if ( isEmailVisible || isAmountListVisible || isSubmitVisible ){
		jumpToFormLink.addClass("hidden");
	} else {
		jumpToFormLink.removeClass("hidden");
	}
}



jQuery(document).ready(function($){
  $('body').removeClass('no-js').addClass('js');
	// trim "source" field to 255 chars to prevent error
	$("form:first").submit(function(){
		var source_string = $("input[name='source']").val();
    if ( source_string ){
	    var source_string_trimmed = source_string.substring(0,255);
      $("input[name='source']").val(source_string_trimmed);
    }
	});
  $(document).on('domUpdated', function(){
    console.log('domUpdated event triggered');
    $(".js-click-to-select-text").clickToSelectText();
    $(".tw-share, .fb-share, .button-dot.facebook, .button-share-facebook, .button-share-twitter").newWindowPopup();
    // apply preselect options for <select>s
    $('[data-preselect]').preselect();
    $('.expando, .js-expando').expando();
    $(".video-wrapper").fitVids();
  });
  $(document).trigger('domUpdated');

  $('.js-modal').modal();
  $('.js-modal-onload').trigger('click');
	// wrap <fieldset> around input groups
	$('.input-text.ak-input-type-user').findAdjacentSibsAndWrap('.input-text.ak-input-type-user', 'fieldset', 'input-group');
  $('.input-text.ak-input-type-action').findAdjacentSibsAndWrap('.input-text.ak-input-type-action', 'fieldset', 'input-group');
  $('.input-textarea.ak-input-type-action').findAdjacentSibsAndWrap('.input-textarea.ak-input-type-action', 'fieldset', 'input-group');

	// On load, trigger "jump to form" check
	showHideJumpToForm();
	// On scroll, trigger jump to form" check
	$(window).on("scroll", function(){
		debounce( showHideJumpToForm(), 500);
	});

  $.localScroll.hash({
    onBefore: function( e, anchor, $target ){
      var ifExpando = $(anchor).hasClass('expando');
      if( ifExpando ){
        $(anchor).find('.expando-link').trigger('click');
      }
    },
    offset: -35,
  });
  $.localScroll({
    filter: ':not(.js-modal)',
    // if anchor linking to an expando section, expand it before scrolling to it
    onBefore: function( e, anchor, $target ){
      var ifExpando = $(anchor).hasClass('expando');
      if( ifExpando ){
        $(anchor).find('.expando-link').trigger('click');
      }
    },
    hash: true,
    offset: -35,
  });
  // Add 'focus' class for parents on blur to enable extra blur styling
  $('input, textarea, select').each(function(){
    $(this).on('focus', function(){
    	$(this).parents('.input-text, .input-textarea, .input-select').addClass('input-focus');
    }).on('blur', function(){
    	$(this).parents('.input-text, .input-textarea, .input-select').removeClass('input-focus');
    });
  });
  // Show bg img on credit hover
  var bodyBg = $("#body-mobile-background");
  $(".page-bg-img-credit").hover(
  	function(){
  		bodyBg
        .clone()
        .addClass('body-bg-clone')
        .css('pointer-events','none')
        .appendTo('body')
        .animate({
          marginLeft:0
        }, 400, function(){
    			$(this).addClass('body-bg-clone-active');
    		});
  		$(this).addClass('page-bg-img-credit-active');
  	}, function(){
  		$('.body-bg-clone').removeClass('body-bg-clone-active').animate({ marginLeft:0 }, 400, function(){
  			$(this).remove();
  		});
  		$(this).removeClass('page-bg-img-credit-active');
  	}
	);
    // Prepare elements and animate through the recent signers list
	var recentActions = $(".recent-action");
	var recentActionsList = $(".recent-actions-list");
	$(".recent-action-timestamp").timeago();

	// When actions are grouped into 3's, start animating
	$(window).on('recentActionsGrouped', function(){
		// set up variables
		var recentActionsGroups = $('.recent-actions-group');
		var currentRAGIndex = 0;
		var intervalID = setInterval(function() {
			recentActionsGroups.eq( currentRAGIndex ).removeClass('visible').addClass('invisible');
		    ++currentRAGIndex;
			if (currentRAGIndex >= recentActionsGroups.length) {
				currentRAGIndex = 0;
			}
			recentActionsGroups.eq( currentRAGIndex ).removeClass('invisible').addClass('visible');
		}, 5500);

		// set up initial conditions
		recentActionsList.addClass('animating');
		recentActionsGroups.first().addClass('visible');
	});
	// Split recent actions into groups of 3 for animating
	for ( var i=0; i < recentActions.length; i+=3 ){
		recentActions.slice(i, i+3).wrapAll('<div id="recent-actions-group-'+ ((i/3)+1) +'" class="recent-actions-group"></div>');
	}
	$(window).trigger('recentActionsGrouped');


  // Truncate description
  $('[data-read-more-after]').truncateAndReadMore();

  var initialWidth = $(window).width();
  console.log('initialWidth = ' + initialWidth);
  // Initialize "sticky" js only for large screens
  if ( initialWidth > 900 ){
      $(".js-sticky, .sticky").sticky({zIndex:100});
  }

  // Add recurring donation toggle functionality. Only works with Vanilla JS

  var once = document.querySelector('.toggle-once');
  var monthly = document.querySelector('.toggle-monthly');
  var checkbox = document.querySelector('.input-checkbox input');

  once.addEventListener('click', function () {
    checkbox.checked = false;
  })

  monthly.addEventListener('click', function () {
    checkbox.checked = true;
  })

});
