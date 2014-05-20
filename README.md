

# Bolting it together

This is not a framework. Just a starting point to build what you need.
The code are useful for browser and/or nodejs backend.

We use simple Bolt object to tie model, template and dom-element together
so that changing object properties changes views.

## want

* Blazing speed
* Simplicity

## don't want

* any massive library requirements
* complicated framework
* jquery or such
* requirejs or such
 
## don't care about

 old browser support (old Internet Explorers). For simplitys sake we use __defineGetter__  and __defineSetter__ which are not supported by old Internet Explorers. There are workaround, include them yourself if you need them.


## How to..

install dependencies

    npm install

### Program goes to src/..

modify and write your app src/main.js

#### Templates
are located in src/tpl

For templating and such we use custom version of 
https://github.com/honza/140medley

## myViewTemplate.tpl  example

    <div id="#{this.id}">

        <h1>#{this.title}</h1>
        
        <p>#{this.content}</p>

        <a href="#{this.link}">#{this.link}</a>
    </div>

gulp minifies and concats escapes these to app.min.js

## Bolt usage

tie model and view for auto update

    var my_data = {
        "id": "123",
        "title": "Hello",
        "content": "World",
        "link": "http://mustavalo.fi"
    };

    var my_data_bolt = new Bolt(my_data, v.myViewTemplate, '#myElementId');

now myViewTemplate should auto render in #myElementId container when ever my_data object changes.

## Vow usage

wait for one or more async getter calls to finish before  final yield callback. useful for gettin apis etc. before render.

    var my_data_vow = new Vow( my_data );
    my_data_vow.promise("content", function(cb) {
        //async/sync function ajax or what ever that get's your data 
        //just remember do callback when ready
        cb('your result here');
        } );

    //... do how ever many promises you like here

    my_data_vow.yield( function ( my_data ) {
        //callback when my_data object promises are completely yielded
        });

yielding triggers all promises, unless you unPromise them. (useful for polling etc.)

## combined usage
see main.js



## Build

    gulp watch


### Serve

contents of public folder

## Want more?

DIY
