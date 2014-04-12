/*--------------------------------------*/
/*  TPL loop    */ 
/*--------------------------------------*/
var lt = function(
    t, // tpl name 
    d, // data
    l, // data len
    h  // html
    ) {
    l = d.length;
    h = '';
    for (var i = 0; i < l; i++) {
        h += v[t](d[i]);
    }
    return h;
};

/*--------------------------------------*/
/* Templating
/* var hello = 
/* t("Hello, #{this.name || 'world'}!") 
/*--------------------------------------*/

var t = function(
    a, // the string source from which the template is compiled
    b // the default `with` context of the template (optional)
) {
    return function(
        c, // the object called as `this` in the template
        d // the `with` context of this template call (optional)
    ) {
        return a.replace(
            /#{([^}]*)}/g, // a regexp that finds the interpolated code: "#{<code>}"

            function(
                a, // not used, only positional
                e // the code matched by the interpolation
            ) {
                /*jshint -W061 */
                return Function("x", "with(x)return " + e).call(c, d || b || {});
            }
        );
    };
};

var $ = function(
    a, // take a simple selector like "name", "#name", or ".name", and
    b // an optional context, and
) {
    a = a.match(/^(\W)?(.*)/); // split the selector into name and symbol.
    return ( b || document )[
        "getElement" + ( // obtained by the appropriate method calculated by
            a[1] ? a[1] == "#" ? "ById" // the node by ID,
            : "sByClassName" // the nodes by class name, or
            : "sByTagName" // the nodes by tag name,
        )
    ](
        a[2] // called with the name.
    );
};

/*--------------------------------------*/
/*  multiget elements to hash           */ 
/*--------------------------------------*/
var $A = function( el, ids, id) {

    while(ids.length) {
        id = ids.shift();
        el[id] = $('#'+id);
    }
};

/*
 * Get cross browser xhr object
 */

var j = function(
    a // cursor placeholder
) {
    for ( // for all a
        a = 0; // from 0
        a < 4; // to 4,
        a++ // incrementing
    ) try { // try
        return a ? new ActiveXObject( // a new ActiveXObject
            [ // reflecting
                , // (elided)
                "Msxml2", // the various
                "Msxml3", // working
                "Microsoft" // options
            ][a] + // for Microsoft implementations, and
            ".XMLHTTP" // the appropriate suffix,
        ) // but make sure to
        : new XMLHttpRequest (); // try the w3c standard first, and
    } catch (e) {} // ignore when it fails.
};
