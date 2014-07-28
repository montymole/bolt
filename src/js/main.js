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


var jokes = {
    title: 'Bolt & Vow Test',
    joke1: 'waiting for result...',
    joke2: 'waiting for result...',
    joke3: 'waiting for result...'
};

//when stuff changes render jokeView inside #app element
var jokeBolt = new Bolt(jokes, v.jokeView, '#app');

//if you want them to work together make your Vow to stuffBolt, not
//directly to stuff, you can still write to stuff.something and it changes
//accordingly

var jokeVow = new Vow(jokeBolt);

function getJoke(cb) {
    API.icndb.get(function(r) {
        cb(r.value.joke);
    });
}

function init() {
    // boltPromiseTest();
    //lets get some chuck norris data
    jokeVow.promise("joke1", getJoke);
    jokeVow.promise("joke2", getJoke);
    jokeVow.promise("joke3", getJoke);
    jokeVow.yield();


}

document.addEventListener('DOMContentLoaded', init, false);
