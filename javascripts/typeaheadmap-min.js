!function(a){var b=function(d,c){this.$element=a(d);this.options=a.extend({},a.fn.typeaheadmap.defaults,c);this.matcher=this.options.matcher||this.matcher;this.sorter=this.options.sorter||this.sorter;this.highlighter=this.options.highlighter||this.highlighter;this.updater=this.options.updater||this.updater;this.$menu=a(this.options.menu).appendTo("body");this.source=this.options.source;this.shown=false;this.key=this.options.key;this.value=this.options.value;this.listener=this.options.listener||this.listener;this.displayer=this.options.displayer||this.displayer;this.notfound=this.options.notfound||new Array();this.listen()};b.prototype={constructor:b,listener:function(d,c){},select:function(){var c=this.$menu.find(".active");var d=c.attr("data-key");this.listener(d,c.attr("data-value"));this.$element.val(this.updater(d)).change();return this.hide()},updater:function(c){return c},show:function(){var c=a.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});this.$menu.css({top:c.top+c.height,left:c.left});this.$menu.show();this.shown=true;return this},hide:function(){this.$menu.hide();this.shown=false;return this},lookup:function(e){var d=this,c,f;this.query=this.$element.val();if(!this.query){return this.shown?this.hide():this}c=a.grep(this.source,function(g){return d.matcher(g)});c=this.sorter(c);if(!c.length){if(this.shown){if(!this.notfound.length){return this.hide()}else{return this.render(this.notfound).show()}}else{return this}}return this.render(c.slice(0,this.options.items)).show()},matcher:function(c){return ~c[this.key].toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(e){var f=[],d=[],c=[],g;while(g=e.shift()){if(!g[this.key].toLowerCase().indexOf(this.query.toLowerCase())){f.push(g)}else{if(~g[this.key].indexOf(this.query)){d.push(g)}else{c.push(g)}}}return f.concat(d,c)},highlighter:function(d,c){var e=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return c.displayer(c,d,d[c.key].replace(new RegExp("("+e+")","ig"),function(f,g){return"<strong>"+g+"</strong>"}))},displayer:function(e,d,c){return c+" "+d[e.value]},render:function(c){var d=this;c=a(c).map(function(e,f){e=a(d.options.item).attr("data-key",f[d.key]);e.attr("data-value",f[d.value]);e.find("a").html(d.highlighter(f,d));return e[0]});c.first().addClass("active");this.$menu.html(c);return this},next:function(d){var e=this.$menu.find(".active").removeClass("active"),c=e.next();if(!c.length){c=a(this.$menu.find("li")[0])}c.addClass("active")},prev:function(d){var e=this.$menu.find(".active").removeClass("active"),c=e.prev();if(!c.length){c=this.$menu.find("li").last()}c.addClass("active")},listen:function(){this.$element.on("blur",a.proxy(this.blur,this)).on("keypress",a.proxy(this.keypress,this)).on("keyup",a.proxy(this.keyup,this));if(a.browser.webkit||a.browser.msie){this.$element.on("keydown",a.proxy(this.keypress,this))}this.$menu.on("click",a.proxy(this.click,this)).on("mouseenter","li",a.proxy(this.mouseenter,this))},keyup:function(c){switch(c.keyCode){case 40:case 38:break;case 9:case 13:if(!this.shown){return}this.select();break;case 27:if(!this.shown){return}this.hide();break;default:this.lookup()}c.stopPropagation();c.preventDefault()},keypress:function(c){if(!this.shown){return}switch(c.keyCode){case 9:case 13:case 27:c.preventDefault();break;case 38:if(c.type!="keydown"){break}c.preventDefault();this.prev();break;case 40:if(c.type!="keydown"){break}c.preventDefault();this.next();break}c.stopPropagation()},blur:function(d){var c=this;setTimeout(function(){c.hide()},150)},click:function(c){c.stopPropagation();c.preventDefault();this.select()},mouseenter:function(c){this.$menu.find(".active").removeClass("active");a(c.currentTarget).addClass("active")}};a.fn.typeaheadmap=function(c){return this.each(function(){var f=a(this),e=f.data("typeaheadmap"),d=typeof c=="object"&&c;if(!e){f.data("typeaheadmap",(e=new b(this,d)))}if(typeof c=="string"){e[c]()}})};a.fn.typeaheadmap.defaults={source:[],items:8,menu:'<ul class="typeaheadmap dropdown-menu"></ul>',item:'<li><a href="#"></a></li>'};a.fn.typeaheadmap.Constructor=b;a(function(){a("body").on("focus.typeaheadmap.data-api",'[data-provide="typeaheadmap"]',function(d){var c=a(this);if(c.data("typeaheadmap")){return}d.preventDefault();c.typeaheadmap(c.data())})})}(window.jQuery);