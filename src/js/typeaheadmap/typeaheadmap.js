/* =============================================================
 * typeaheadmap.js based on bootstrap-typeahead.js v2.0.3 which you can find at
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * and is Copyright 2012 Twitter, Inc.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */
/*
 * 
 * My Changes: instead of an array with elements, provide an array with objects. 
 * Define the key and value. The key is the element shown in the inputbox that has typeheadmap.
 * The combination of the key and value is shown in the dropdown.
 * Optionally provide a listener to listen to the selected 'key' and 'value'.
 * https://github.com/redlab/bootstrap-ext
 * @version 1.0.0
*/

!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEADMAP PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeaheadmap = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeaheadmap.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.key = this.options.key
    this.value = this.options.value
    this.listener = this.options.listener || this.listener
    this.displayer = this.options.displayer || this.displayer
    this.listen()
  }

  Typeaheadmap.prototype = {

    constructor: Typeaheadmap
  , listener : function(k,v) {}
  , select: function () {
	  var selected = this.$menu.find('.active')
      var val = selected.attr('data-key')
      this.listener(val, selected.attr('data-value'))
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item[this.key].toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item[this.key].toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item[this.key].indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item, that) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return that.displayer(that, item, item[that.key].replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      }))
    }
  , displayer: function(that, item, highlighted) {
	return highlighted + ' ' + item[that.value] 
   }
  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-key', item[that.key])
        i.attr('data-value', item[that.value])
        i.find('a').html(that.highlighter(item, that))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEADMAP PLUGIN DEFINITION
   * =========================== */

  $.fn.typeaheadmap = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeaheadmap')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeaheadmap', (data = new Typeaheadmap(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeaheadmap.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeaheadmap dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeaheadmap.Constructor = Typeaheadmap


 /* TYPEAHEADMAP DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeaheadmap.data-api', '[data-provide="typeaheadmap"]', function (e) {
      var $this = $(this)
      if ($this.data('typeaheadmap')) return
      e.preventDefault()
      $this.typeaheadmap($this.data())
    })
  })

}(window.jQuery);
