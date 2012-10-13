bootstrap-ext
=============

Typeaheadmap
======
A make over of <a href="http://twitter.github.com/bootstrap/javascript.html#typeahead">bootstraps typeahead</a> that supports an array of objects, a listener function hook to receive selected data, and a customizable displayer function. See an example at src/demo/typeaheadmap. The Javascript and CSS file are at src/js/typaheadmap
Consider an the example of the cities where the arrayOfObjects is a an array containing objects like 
		{ "code":"9000", "city":"Gent"}
and postalcodes the javascript would be like
		$("#postalcodes").typeaheadmap({ "source":arrayOfObjects, "key": "code", "value": "city"})
for the postalcode inputbox and
		$("#cities").typeaheadmap({ "source":arrayOfObjects, "key": "city", "value": "code"})
for the citynames inputbox.
To allow either input to automagically show the correct code or city there is an option to add listener function. The listener is called on change of the typeaheadmap. Then it becomes
		$("#cities").typeaheadmap({ "source":arrayOfObjects, 
		    "key": "city", 
		    "value": "code", 
		    "listener": function(k, v) {
			$("#postalcodes").val(v)
		})
The size of the result list can be changed with the "items" parameter.
