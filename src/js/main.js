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

function testCall1(cb) {
    cb('Right away');
};

function testCall2(cb) {

    setTimeout(function() {
        cb('a new value from promise getter '+Math.random());
    }, 1000);

};

function testCall3(cb) {

  setTimeout(function () {
    cb('dont forget my random promise:'+Math.random());
  }, 1500);

};


var stuff = {
    "something": "initial value",
    "more": "not yet"
};

var stuffBolt = new Bolt(stuff, v.stuffView, '#app');

var stuffVow = new Vow(stuffBolt);


function boltPromiseTest() {

    stuffVow.promise("something", testCall1);
    stuffVow.promise("more", testCall3);

    stuffVow.yield(function(r) {
        console.log(stuff);
        anotherTest();
    });

}

function anotherTest() {

    stuffVow.promise("something", testCall2);
    stuffVow.yield(function(r) {
      console.log('it should be active still?');
      thirdTest();
    });

}


function thirdTest() {

  stuffVow.unPromise("more");
  stuffVow.yield(function(r) {
    console.log('unless im told to');
    stuff.more = 'Dont change';
    boltPromiseTest();
  });

}




function init() {

    boltPromiseTest();

}


document.addEventListener('DOMContentLoaded', init, false);
