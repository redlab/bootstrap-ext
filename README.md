bootstrap-ext
=============

Typeaheadmap
======
A make over of <a href="http://twitter.github.com/bootstrap/javascript.html#typeahead">bootstraps typeahead</a> that supports an array of objects, a listener function hook to receive selected data, and a customizable displayer function. See an example at src/demo/typeaheadmap. The Javascript and CSS file are at src/js/typaheadmap

Consider an example of the cities where the arrayOfObjects is a an array containing objects like

``` { "code":"9000", "city":"Gent"}```

and postalcodes the javascript for the postalcode inputbox would be like

```$("#postalcodes").typeaheadmap({ "source":arrayOfObjects, "key": "code", "value": "city"})```

for the citynames inputbox.

``` $("#cities").typeaheadmap({ "source":arrayOfObjects, "key": "city", "value": "code"})```

To allow either input to automagically show the correct code or city there is an option to add listener function. The listener is called on change of the typeaheadmap. Then it becomes
```javascript
 $("#cities").typeaheadmap({ "source":arrayOfObjects, 
    "key": "city", 
    "value": "code", 
    "listener": function(k, v) {
	$("#postalcodes").val(v)
})
```

The size of the result list can be changed with the "items" parameter.
