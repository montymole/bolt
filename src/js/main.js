/*--------------------------------------*/
/* 2014 Jussi Löf
/*--------------------------------------*/
/* BOLT, mega simple way to do
/* Auto-updating templates
/*--------------------------------------*/
var autoRefresh = false;

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
    if (autoRefresh) this.refresh();
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

/*--------------------------------------*/
/*  Compile templates                   */
/*--------------------------------------*/

var v = {}; /* compiled templates */
for (var k in tpl) {
  v[k] = t(tpl[k]);
}


/*--------------------------------------*/
/*  App Code -->    */
/*--------------------------------------*/

var blogModel;

function getBlogs(num) {

  function blogBolt(obj, pid) {
    return new Bolt(obj, v.blog, '#app');
  }

  API.blogger.getBlogs(num, function(result, current) {
    if (result.error) {
      blogModel = {
        error: v.error(result.error)
      };
    } else {
      blogModel = current = blogBolt(result.shift());
      for (var i = 0; i < result.length; i++) {
        current.screw('next');
        current.next = blogBolt(result[i]);
        current = current.next;
      }
      blogModel.refresh();
    }
  });

}

function init() {

  getBlogs(10);


}


document.addEventListener('DOMContentLoaded', init, false);
