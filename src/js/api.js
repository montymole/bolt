/*--------------------------------------*/
/*  How to do REST API    */ 
/*--------------------------------------*/
function Api(opts) {
    for (var k in opts) {
        this[k] = opts[k];
    }
}

Api.prototype = {

    debugCb: function(r) {
        console.log(r);
    },

    get: function(cb, x) {
        if (!cb) cb = this.debugCb;
        x = j();
        x.cb = cb;
        x.onreadystatechange = this.handleStateChanges;
        x.open('GET', this.url, true);
        x.send();
    },

    handleStateChanges: function() {
        if (this.readyState != 4) return;
        this.cb(JSON.parse(this.responseText));
    }
};

var api_desc = {
    icndb: {
        url: 'http://api.icndb.com/jokes/random?firstName=Monty&lastName=Mole',
    }
};

window.API = {};

for (var k in api_desc) {
    window.API[k] = new Api(api_desc[k]);
}
