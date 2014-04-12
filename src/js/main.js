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

Bolt.prototype.screw = function(key) {

  this.__defineSetter__(key, function(val) {
    this.obj[key] = val;
    this.refresh();
  });

  this.__defineGetter__(key, function() {
    return obj[key];
  });

}

Bolt.prototype.refresh = function() {
  this.el.innerHTML = this.view(this.obj);
}

/*--------------------------------------*/
/*  Compile templates                   */
/*--------------------------------------*/

var views = v = {}; /* compiled templates */
for (var k in tpl) {
  v[k] = t(tpl[k]);
}

var myBoltModel;

function init() {

  myBoltModel = new Bolt({

  	title : 'Bolting it together',
  	content : 'Keep It Simple Stupid',
  	link: 'http://fi.wikipedia.org/wiki/KISS-periaate'

  }, views.simple, $('#app'));

  alert ('now lets change it');

  myBoltModel.title = 'Super helppoa';

  alert ('Ok change it more');

  myBoltModel.content = 'Super easy once the simple bolts are there!'
}


document.addEventListener('DOMContentLoaded', init, false);
