bootstrap-ext
=============

Typeaheadmap
======
A make over of <a href="http://twitter.github.com/bootstrap/javascript.html#typeahead">bootstraps typeahead</a> that supports an array of objects, a listener function hook to receive selected data, and a customizable displayer function. See an example at src/demo/typeaheadmap or a <a href="http://redlab.github.com/bootstrap-ext/index.html">live example</a>. The Javascript and CSS file are at src/js/typaheadmap

Consider an example of the cities where the arrayOfObjects is a an array containing objects with cities and postalcodes

```javascript
{ "code":"9000", "city":"Gent"}
```

the javascript for the postalcode inputbox would be like

```javascript
$("#postalcodes").typeaheadmap({ "source":arrayOfObjects, "key": "code", "value": "city"})
```

for the citynames inputbox.

```javascript
$("#cities").typeaheadmap({ "source":arrayOfObjects, "key": "city", "value": "code"})
```

To allow either input to automagically show the correct code or city there is an option to add listener function. The listener is called on change of the typeaheadmap. Then it becomes

```javascript
 $("#cities").typeaheadmap({ "source":arrayOfObjects, 
    "key": "city", 
    "value": "code", 
    "listener": function(k, v) {
	$("#postalcodes").val(v)
	}
})
```

Optional:

* add 'notfound' to the options map. If notfound is set as an Array of objects with the same structure as those in the "source" parameter, this array is used when autocomplete did not return any results. 

```javascript
"notfound": new Array({'k' :"Capital Does Not Exist?", 'v': "",'d': "You typed something that is not in the list"})
```

* set 'items' as int to set the maximum size of the displayed results
* add 'displayer' to customize the output

```javascript
"displayer": function(that, item, highlighted) {
    if (item[that.value] != "") {
	    return highlighted;			
    } else {
    return highlighted + ' (' + item[that.value] + ' )' 
    }
}
```
				
* set the source as an object array or a function (function receives the current input from box and the process method to which you pass the object array.
* use the source with an ajax request

```javascript
"source" : function(q, process) { 
     $.ajax({url: yourfetchurl+'?q='+q, 
               dataType: 'json',
               success: function(data) { process(fetcheddata)  }
     })
},
```
