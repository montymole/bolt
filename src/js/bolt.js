
/*--------------------------------------*/
/* 2014 Jussi Löf
/*--------------------------------------*/
/* BOLT, mega simple way to do
/* Auto-updating templates
/*--------------------------------------*/

function Bolt(obj, view, el) {

    this.obj = obj;
    this.view = view;
    this.el = el;

    for (var key in obj) {
        this.screw(key);
    }

    this.refresh();

}


/*-------------------------------------------*/
/*  Add (screw in) watcher to the bolted object
/*-------------------------------------------*/
Bolt.prototype.screw = function(key) {

    this.__defineSetter__(key, function(val) {
        this.obj[key] = val;
        this.refresh();
    });

    this.__defineGetter__(key, function() {
        return this.obj[key];
    });

}

/*--------------------------------------*/
/*  populate with incoming object       */
/*--------------------------------------*/
Bolt.prototype.populate = function(obj, key) {

    for (key in obj) {
        if (this[key] === undefined) this.screw(key);
        this[key] = obj[key];
    }

};

Bolt.prototype.renderer = function(viewObject, property, key) {

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

}

Bolt.prototype.refresh = function(el, newEl) {
    el = $(this.el);
    if (el) {
        el.innerHTML = this.renderer();
    }
}