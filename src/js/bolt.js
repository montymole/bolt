/*--------------------------------------*/
/* 2014 Jussi Löf
/*--------------------------------------*/
/* BOLT, Auto-updating templates
/*--------------------------------------*/

function Bolt(obj, view, el) {

    this.obj = obj;
    this.view = view;
    this.el = el;
    this.autorefresh = true;

    for (var key in obj) {
        this.screw(key);
    }

    this.refresh();

}

Bolt.prototype = {
    /*-------------------------------------------*/
    /*  Add (screw in) watcher to the bolted object
/*-------------------------------------------*/

    screw: function(key) {

        this.__defineSetter__(key, function(val) {
            this.obj[key] = val;
            if (this.autorefresh)
                this.refresh();
        });

        this.__defineGetter__(key, function() {
            return this.obj[key];
        });

    },

    /*--------------------------------------*/
    /*  populate with incoming object       */
    /*--------------------------------------*/
    populate: function(obj, key) {

        for (key in obj) {
            if (this[key] === undefined) this.screw(key);
            this[key] = obj[key];
        }

    },

    renderer: function(viewObject, property, key) {

        viewObject = {};

        //create a copy of object
        for (key in this.obj) {

            property = this.obj[key];

            //recurse sub-bolts
            if (property.renderer) {
                viewObject[key] = property.renderer();
            } else
                viewObject[key] = property;
        }

        return this.view(viewObject);

    },
    refresh: function(el, newEl) {
        el = $(this.el);
        if (el) {
            el.innerHTML = this.renderer();
        }
    }
}
