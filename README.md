
<img src="https://img.shields.io/bundlephobia/minzip/vue-simple-maps@0.0.0-beta.0?color=%2328cb95&label=gzip" />

# vue-simple-maps
Create beautiful SVG maps in Vue with d3-geo and topojson using a declarative api.

### Why

`vue-simple-maps` aims to make working with svg maps in react easier. It handles tasks such as panning, zooming and simple rendering optimization, and takes advantage of parts of [d3-geo](https://github.com/d3/d3-geo) and topojson-client instead of relying on the entire d3 library.

### Install

To install `vue-simple-maps`

```bash
$ npm install --save vue-simple-maps@0.0.0-beta.0
```

...or if you use yarn:

```bash
$ yarn add vue-simple-maps@0.0.0-beta.0
```

### Usage

`vue-simple-maps` exposes a set of components that can be combined to create svg maps with markers and annotations. In order to render a map you have to provide a reference to a valid topojson file. You can find example topojson files in the [`topojson-maps` folder](https://github.com/zcreativelabs/vue-simple-maps/tree/master/topojson-maps) or on [topojson world-atlas](https://github.com/topojson/world-atlas). To learn how to make your own topojson maps from shapefiles, please read ["How to convert and prepare TopoJSON files for interactive mapping with d3"](https://hackernoon.com/how-to-convert-and-prepare-topojson-files-for-interactive-mapping-with-d3-499cf0ced5f) on medium.

See `/demo/client.html` for use case example.

Check out the [live example](https://codesandbox.io/s/vue-simple-maps-15ol4)

The above will render a world map using the [equal earth projection](https://observablehq.com/@d3/equal-earth). You can read more about this projection on [Shaded Relief](http://shadedrelief.com/ee_proj/) and on [Wikipedia](https://en.wikipedia.org/wiki/Equal_Earth_projection).