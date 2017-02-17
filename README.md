# atmospheric-diagnostics

A TypeScript library component that

## Conventions used and similarities to other projects

npm libs css-variables and vanilla-typescript are used. I have numerous other projects using them

## installation
You can install into your application by running 
npm install --save-dev atmospheric-diagnostics

You can then use it like so when passing in the selector of an existing element (preferably empty):

You can also import the default styles atmospheric-diagnostics.css which will style it for you.

    `<link rel="stylesheet" type="text/css" href="node_modules/atmospheric-diagnostics/build/atmospheric-diagnostics.css">`


```js
import AtmosphericDiagnostics from 'atmospheric-diagnostics'

function init() {
  var selector = ".atmospheric-diagnostics"
  var component = new AtmosphericDiagnostics(selector)
  component.attach()
}

init()
```
See the /demo for more details


## Why

I made this component was for my consumption, but you are free to use it too!

## Features

* It will Render the next 5 days forcast for pressure and humidity 

## Demo

[Basic usage](https://quantumjs.github.io/atmospheric-diagnostics/demo/build)

##Roadmap

* Provide clickable map to get the data
* Plot more types of data
