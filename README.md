

# Bolting it together

This is not a framework. Just a starting point to build what you need.

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

    <div id="#{this.id}">

        <h1>#{this.title}</h1>
        
        <p>#{this.content}</p>

        <a href="#{this.link}">#{this.link}</a>
    </div>

gulp minifies and concats escapes these to app.min.js

## Build

    gulp watch



### Serve

contents of public folder

## Want more?

DIY
