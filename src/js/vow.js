/*--------------------------------------*/
/* 2014 Jussi Löf
/*--------------------------------------*/
/* VOW, way to do yielding promises
/*--------------------------------------*/

function Vow(obj) {

    this.obj = obj;
    this.oaths = {};
    this.oathsTotal = 0;
    this.oathsToFill = 0;
    this.oathsFilled = 0;

}

Vow.prototype = {
    promise: function(property, getter) {

        if (this.oaths[property]) {
            this.unPromise(property);
        }

        this.oaths[property] = {
            property: property,
            getter: getter
        };

        this.oathsTotal++;
    },

    unPromise: function(property) {
        delete this.oaths[property];
        this.oathsTotal--;
    },

    get: function(oath) {

        var vow = this;

        oath.getter(function(result) {
            vow.obj[oath.property] = result;
            vow.oathsFilled++;
            if (vow.oathsFilled == vow.oathsToFill) {
                if (vow.callback) vow.callback(vow.obj);
            }
        });
    },

    yield: function(callback) {

        this.callback = callback;
        this.oathsFilled = 0;
        this.oathsToFill = this.oathsTotal;

        for (var o in this.oaths) {
            this.get(this.oaths[o]);
        }
    }
}
