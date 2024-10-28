const baseStyle =
{
        "version": 8,
        "name": "Positron",
        "metadata": {
                "mapbox:autocomposite": false,
                "mapbox:groups": {
                        "101da9f13b64a08fa4b6ac1168e89e5f": {
                                "collapsed": false,
                                "name": "Places"
                        },
                        "a14c9607bc7954ba1df7205bf660433f": { "name": "Boundaries" },
                        "b6371a3f2f5a9932464fa3867530a2e5": {
                                "collapsed": false,
                                "name": "Transportation"
                        }
                },
                "mapbox:type": "template",
                "openmaptiles:mapbox:owner": "openmaptiles",
                "openmaptiles:mapbox:source:url": "mapbox://openmaptiles.4qljc88t",
                "openmaptiles:version": "3.x",
                "maputnik:renderer": "mlgljs"
        },
        "sources": {
                "openmaptiles": {
                        "type": "vector",
                        "tiles": ["http://localhost:3000/nymap/{z}/{x}/{y}"],
                        "minzoom": 0,
                        "maxzoom": 14,
                        "attribution": "NYC Planning",
                        "scheme": "xyz"
                },
                "pop": {
                        "type": "vector",
                        "tiles": ["http://localhost:3000/population_by_boroct/{z}/{x}/{y}"],
                        "attribution": "NYC Planning",
                        "maxzoom": 19
                },
                "pullovers_raw": {
                        "type": "vector",
                        "tiles": ["http://localhost:3000/pullovers/{z}/{x}/{y}"],
                        "attribution": "NYC OpenData",
                        "maxzoom": 19
                },
                "pullovers_by_boroct": {
                        "type": "vector",
                        "tiles": ["http://localhost:3000/pullovers_by_boroct/{z}/{x}/{y}"],
                        "attribution": "NYC OpenData & Project's adjustments",
                        "maxzoom": 19
                }
        },
        "sprite": "https://openmaptiles.github.io/positron-gl-style/sprite",
        "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        "layers": [
                {
                        "id": "background",
                        "type": "background",
                        "paint": { "background-color": "rgb(242,243,240)" }
                },
                {
                        "id": "park",
                        "type": "fill",
                        "source": "openmaptiles",
                        "source-layer": "park",
                        "filter": ["==", "$type", "Polygon"],
                        "layout": { "visibility": "visible" },
                        "paint": { "fill-color": "rgb(230, 233, 229)" }
                },
                {
                        "id": "water",
                        "type": "fill",
                        "source": "openmaptiles",
                        "source-layer": "water",
                        "filter": [
                                "all",
                                ["==", "$type", "Polygon"],
                                ["!=", "brunnel", "tunnel"]
                        ],
                        "layout": { "visibility": "visible" },
                        "paint": { "fill-antialias": true, "fill-color": "rgb(194, 200, 202)" }
                },
                {
                        "id": "landuse_residential",
                        "type": "fill",
                        "source": "openmaptiles",
                        "source-layer": "landuse",
                        "maxzoom": 16,
                        "filter": [
                                "all",
                                ["==", "$type", "Polygon"],
                                ["==", "class", "residential"]
                        ],
                        "layout": { "visibility": "visible" },
                        "paint": {
                                "fill-color": "rgb(234, 234, 230)",
                                "fill-opacity": { "base": 0.6, "stops": [[8, 0.8], [9, 0.6]] }
                        }
                },
                {
                        "id": "landcover_wood",
                        "type": "fill",
                        "source": "openmaptiles",
                        "source-layer": "landcover",
                        "minzoom": 10,
                        "filter": ["all", ["==", "$type", "Polygon"], ["==", "class", "wood"]],
                        "layout": { "visibility": "visible" },
                        "paint": {
                                "fill-color": "rgb(220,224,220)",
                                "fill-opacity": { "base": 1, "stops": [[8, 0], [12, 1]] }
                        }
                },
                {
                        "id": "waterway",
                        "type": "line",
                        "source": "openmaptiles",
                        "source-layer": "waterway",
                        "filter": ["==", "$type", "LineString"],
                        "layout": { "visibility": "visible" },
                        "paint": { "line-color": "hsl(195, 17%, 78%)" }
                },
                {
                        "id": "water_name",
                        "type": "symbol",
                        "source": "openmaptiles",
                        "source-layer": "water_name",
                        "filter": ["==", "$type", "LineString"],
                        "layout": {
                                "symbol-placement": "line",
                                "symbol-spacing": 500,
                                "text-field": "{name:latin}\n{name:nonlatin}",
                                "text-font": ["Noto Sans Italic"],
                                "text-rotation-alignment": "map",
                                "text-size": 12,
                                "visibility": "visible"
                        },
                        "paint": {
                                "text-color": "rgb(157,169,177)",
                                "text-halo-blur": 1,
                                "text-halo-color": "rgb(242,243,240)",
                                "text-halo-width": 1
                        }
                },
                {
                        "id": "tunnel_motorway_casing",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "brunnel", "tunnel"], ["==", "class", "motorway"]]
                        ],
                        "layout": {
                                "line-cap": "butt",
                                "line-join": "miter",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(213, 213, 213)",
                                "line-opacity": 1,
                                "line-width": { "base": 1.4, "stops": [[5.8, 0], [6, 3], [20, 40]] }
                        }
                },
                {
                        "id": "tunnel_motorway_inner",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "brunnel", "tunnel"], ["==", "class", "motorway"]]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(234,234,234)",
                                "line-width": { "base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]] }
                        }
                },
                {
                        "id": "road_pier",
                        "type": "line",
                        "metadata": {},
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "pier"]],
                        "layout": { "line-cap": "round", "line-join": "round" },
                        "paint": {
                                "line-color": "rgb(242,243,240)",
                                "line-width": { "base": 1.2, "stops": [[15, 1], [17, 4]] }
                        }
                },
                {
                        "id": "highway_path",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "filter": ["all", ["==", "$type", "LineString"], ["==", "class", "path"]],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(234, 234, 234)",
                                "line-opacity": 0.9,
                                "line-width": { "base": 1.2, "stops": [[13, 1], [20, 10]] }
                        }
                },
                {
                        "id": "highway_minor",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 8,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "minor", "service", "track"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "hsl(0, 0%, 88%)",
                                "line-opacity": 0.9,
                                "line-width": { "base": 1.55, "stops": [[13, 1.8], [20, 20]] }
                        }
                },
                {
                        "id": "highway_major_casing",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 11,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                        ],
                        "layout": {
                                "line-cap": "butt",
                                "line-join": "miter",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(213, 213, 213)",
                                "line-dasharray": [12, 0],
                                "line-width": { "base": 1.3, "stops": [[10, 3], [20, 23]] }
                        }
                },
                {
                        "id": "highway_major_inner",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 11,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "#fff",
                                "line-width": { "base": 1.3, "stops": [[10, 2], [20, 20]] }
                        }
                },
                {
                        "id": "highway_major_subtle",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "maxzoom": 11,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": { "line-color": "hsla(0, 0%, 85%, 0.69)", "line-width": 2 }
                },
                {
                        "id": "highway_motorway_casing",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                [
                                        "all",
                                        ["!in", "brunnel", "bridge", "tunnel"],
                                        ["==", "class", "motorway"]
                                ]
                        ],
                        "layout": {
                                "line-cap": "butt",
                                "line-join": "miter",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(213, 213, 213)",
                                "line-dasharray": [2, 0],
                                "line-opacity": 1,
                                "line-width": { "base": 1.4, "stops": [[5.8, 0], [6, 3], [20, 40]] }
                        }
                },
                {
                        "id": "highway_motorway_inner",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                [
                                        "all",
                                        ["!in", "brunnel", "bridge", "tunnel"],
                                        ["==", "class", "motorway"]
                                ]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": {
                                        "base": 1,
                                        "stops": [[5.8, "hsla(0, 0%, 85%, 0.53)"], [6, "#fff"]]
                                },
                                "line-width": { "base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]] }
                        }
                },
                {
                        "id": "highway_motorway_subtle",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "maxzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "motorway"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "hsla(0, 0%, 85%, 0.53)",
                                "line-width": { "base": 1.4, "stops": [[4, 2], [6, 1.3]] }
                        }
                },
                {
                        "id": "railway_transit",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 16,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "class", "transit"], ["!in", "brunnel", "tunnel"]]
                        ],
                        "layout": { "line-join": "round", "visibility": "visible" },
                        "paint": { "line-color": "#dddddd", "line-width": 3 }
                },
                {
                        "id": "railway_transit_dashline",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 16,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "class", "transit"], ["!in", "brunnel", "tunnel"]]
                        ],
                        "layout": { "line-join": "round", "visibility": "visible" },
                        "paint": {
                                "line-color": "#fafafa",
                                "line-dasharray": [3, 3],
                                "line-width": 2
                        }
                },
                {
                        "id": "railway_service",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 16,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "class", "rail"], ["has", "service"]]
                        ],
                        "layout": { "line-join": "round", "visibility": "visible" },
                        "paint": { "line-color": "#dddddd", "line-width": 3 }
                },
                {
                        "id": "railway_service_dashline",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 16,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "rail"],
                                ["has", "service"]
                        ],
                        "layout": { "line-join": "round", "visibility": "visible" },
                        "paint": {
                                "line-color": "#fafafa",
                                "line-dasharray": [3, 3],
                                "line-width": 2
                        }
                },
                {
                        "id": "railway",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 13,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["!has", "service"], ["==", "class", "rail"]]
                        ],
                        "layout": { "line-join": "round", "visibility": "visible" },
                        "paint": {
                                "line-color": "#dddddd",
                                "line-width": { "base": 1.3, "stops": [[16, 3], [20, 7]] }
                        }
                },
                {
                        "id": "railway_dashline",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 13,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["!has", "service"], ["==", "class", "rail"]]
                        ],
                        "layout": { "line-join": "round", "visibility": "visible" },
                        "paint": {
                                "line-color": "#fafafa",
                                "line-dasharray": [3, 3],
                                "line-width": { "base": 1.3, "stops": [[16, 2], [20, 6]] }
                        }
                },
                {
                        "id": "highway_motorway_bridge_casing",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "brunnel", "bridge"], ["==", "class", "motorway"]]
                        ],
                        "layout": {
                                "line-cap": "butt",
                                "line-join": "miter",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(213, 213, 213)",
                                "line-dasharray": [2, 0],
                                "line-opacity": 1,
                                "line-width": { "base": 1.4, "stops": [[5.8, 0], [6, 5], [20, 45]] }
                        }
                },
                {
                        "id": "highway_motorway_bridge_inner",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["all", ["==", "brunnel", "bridge"], ["==", "class", "motorway"]]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": {
                                        "base": 1,
                                        "stops": [[5.8, "hsla(0, 0%, 85%, 0.53)"], [6, "#fff"]]
                                },
                                "line-width": { "base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]] }
                        }
                },
                {
                        "id": "highway_name_other",
                        "type": "symbol",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation_name",
                        "filter": [
                                "all",
                                ["!=", "class", "motorway"],
                                ["==", "$type", "LineString"]
                        ],
                        "layout": {
                                "symbol-placement": "line",
                                "symbol-spacing": 350,
                                "text-field": "{name:latin} {name:nonlatin}",
                                "text-font": ["Noto Sans Regular"],
                                "text-max-angle": 30,
                                "text-pitch-alignment": "viewport",
                                "text-rotation-alignment": "map",
                                "text-size": 10,
                                "text-transform": "uppercase",
                                "visibility": "visible"
                        },
                        "paint": {
                                "text-color": "#bbb",
                                "text-halo-blur": 1,
                                "text-halo-color": "#fff",
                                "text-halo-width": 2,
                                "text-translate": [0, 0]
                        }
                },
                {
                        "id": "highway_name_motorway",
                        "type": "symbol",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "openmaptiles",
                        "source-layer": "transportation_name",
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "motorway"]
                        ],
                        "layout": {
                                "symbol-placement": "line",
                                "symbol-spacing": 350,
                                "text-field": "{ref}",
                                "text-font": ["Noto Sans Regular"],
                                "text-pitch-alignment": "viewport",
                                "text-rotation-alignment": "viewport",
                                "text-size": 10,
                                "visibility": "visible"
                        },
                        "paint": {
                                "text-color": "rgb(117, 129, 145)",
                                "text-halo-blur": 1,
                                "text-halo-color": "hsl(0, 0%, 100%)",
                                "text-halo-width": 1,
                                "text-translate": [0, 2]
                        }
                }
        ],
        "id": "positron"
}


const baseStyleDark = {
        "version": 8,
        "name": "Dark Matter",
        "metadata": {
                "mapbox:autocomposite": false,
                "mapbox:groups": {
                        "101da9f13b64a08fa4b6ac1168e89e5f": {
                                "collapsed": false,
                                "name": "Places"
                        },
                        "a14c9607bc7954ba1df7205bf660433f": { "name": "Boundaries" },
                        "b6371a3f2f5a9932464fa3867530a2e5": {
                                "collapsed": false,
                                "name": "Transportation"
                        }
                },
                "mapbox:type": "template",
                "maputnik:renderer": "mlgljs"
        },
        "sources": {
                "geodata": {
                        "type": "vector",
                        "tiles": ["http://localhost:3000/ny/{z}/{x}/{y}"],
                        "minzoom": 0,
                        "maxzoom": 14,
                        "scheme": "xyz"
                },
                "pop": {
                        "type": "vector",
                        "tiles": ["http://localhost:3000/population_by_boroct/{z}/{x}/{y}"],
                        "attribution": "Martin",
                        "maxzoom": 19
                },
        },
        "sprite": "https://openmaptiles.github.io/dark-matter-gl-style/sprite",
        "glyphs": "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        "layers": [
                {
                        "id": "background",
                        "type": "background",
                        "paint": { "background-color": "rgb(2,2,2)" }
                },
                {
                        "id": "water",
                        "type": "fill",
                        "source": "geodata",
                        "source-layer": "water",
                        "filter": [
                                "all",
                                ["==", "$type", "Polygon"],
                                ["!=", "brunnel", "tunnel"]
                        ],
                        "layout": { "visibility": "visible" },
                        "paint": { "fill-antialias": false, "fill-color": "rgb(27 ,27 ,29)" }
                },
                {
                        "id": "landcover_ice_shelf",
                        "type": "fill",
                        "source": "geodata",
                        "source-layer": "landcover",
                        "maxzoom": 8,
                        "filter": [
                                "all",
                                ["==", "$type", "Polygon"],
                                ["==", "subclass", "ice_shelf"]
                        ],
                        "layout": { "visibility": "visible" },
                        "paint": { "fill-color": "rgb(12,12,12)", "fill-opacity": 0.7 }
                },
                {
                        "id": "landcover_glacier",
                        "type": "fill",
                        "source": "geodata",
                        "source-layer": "landcover",
                        "maxzoom": 8,
                        "filter": [
                                "all",
                                ["==", "$type", "Polygon"],
                                ["==", "subclass", "glacier"]
                        ],
                        "layout": { "visibility": "visible" },
                        "paint": {
                                "fill-color": "hsl(0, 1%, 2%)",
                                "fill-opacity": { "base": 1, "stops": [[0, 1], [8, 0.5]] }
                        }
                },
                {
                        "id": "landuse_residential",
                        "type": "fill",
                        "source": "geodata",
                        "source-layer": "landuse",
                        "maxzoom": 9,
                        "filter": [
                                "all",
                                ["==", "$type", "Polygon"],
                                ["==", "class", "residential"]
                        ],
                        "layout": { "visibility": "visible" },
                        "paint": { "fill-color": "hsl(0, 2%, 5%)", "fill-opacity": 0.4 }
                },
                {
                        "id": "landcover_wood",
                        "type": "fill",
                        "source": "geodata",
                        "source-layer": "landcover",
                        "minzoom": 10,
                        "filter": ["all", ["==", "$type", "Polygon"], ["==", "class", "wood"]],
                        "layout": { "visibility": "visible" },
                        "paint": {
                                "fill-color": "rgb(32,32,32)",
                                "fill-opacity": { "base": 0.3, "stops": [[8, 0], [10, 0.8], [13, 0.4]] },
                                "fill-pattern": "wood-pattern",
                                "fill-translate": [0, 0]
                        }
                },
                {
                        "id": "waterway",
                        "type": "line",
                        "source": "geodata",
                        "source-layer": "waterway",
                        "filter": ["==", "$type", "LineString"],
                        "layout": { "visibility": "visible" },
                        "paint": { "line-color": "rgb(27 ,27 ,29)" }
                },
                {
                        "id": "water_name",
                        "type": "symbol",
                        "source": "geodata",
                        "source-layer": "water_name",
                        "filter": ["==", "$type", "LineString"],
                        "layout": {
                                "symbol-placement": "line",
                                "symbol-spacing": 500,
                                "text-field": "{name:latin}\n{name:nonlatin}",
                                "text-font": ["Noto Sans Italic"],
                                "text-rotation-alignment": "map",
                                "text-size": 12
                        },
                        "paint": {
                                "text-color": "hsla(0, 0%, 0%, 0.7)",
                                "text-halo-color": "hsl(0, 0%, 27%)"
                        }
                },
                {
                        "id": "building",
                        "type": "fill",
                        "source": "geodata",
                        "source-layer": "building",
                        "minzoom": 12,
                        "filter": ["==", "$type", "Polygon"],
                        "paint": {
                                "fill-antialias": true,
                                "fill-color": "rgb(10,10,10)",
                                "fill-outline-color": "rgb(27 ,27 ,29)"
                        }
                },
                {
                        "id": "road_area_pier",
                        "type": "fill",
                        "metadata": {},
                        "source": "geodata",
                        "source-layer": "transportation",
                        "filter": ["all", ["==", "$type", "Polygon"], ["==", "class", "pier"]],
                        "layout": { "visibility": "visible" },
                        "paint": { "fill-antialias": true, "fill-color": "rgb(12,12,12)" }
                },
                {
                        "id": "road_pier",
                        "type": "line",
                        "metadata": {},
                        "source": "geodata",
                        "source-layer": "transportation",
                        "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "pier"]],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(12,12,12)",
                                "line-width": { "base": 1.2, "stops": [[15, 1], [17, 4]] }
                        }
                },
                {
                        "id": "highway_path",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "filter": ["all", ["==", "$type", "LineString"], ["==", "class", "path"]],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgb(27 ,27 ,29)",
                                "line-dasharray": [1.5, 1.5],
                                "line-opacity": 0.9,
                                "line-width": { "base": 1.2, "stops": [[13, 1], [20, 10]] }
                        }
                },
                {
                        "id": "highway_minor",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 8,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "minor", "service", "track"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "#181818",
                                "line-opacity": 0.9,
                                "line-width": { "base": 1.55, "stops": [[13, 1.8], [20, 20]] }
                        }
                },
                {
                        "id": "highway_major_casing",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 11,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                        ],
                        "layout": {
                                "line-cap": "butt",
                                "line-join": "miter",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgba(60,60,60,0.8)",
                                "line-dasharray": [12, 0],
                                "line-width": { "base": 1.3, "stops": [[10, 3], [20, 23]] }
                        }
                },
                {
                        "id": "highway_major_inner",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 11,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "hsl(0, 0%, 7%)",
                                "line-width": { "base": 1.3, "stops": [[10, 2], [20, 20]] }
                        }
                },
                {
                        "id": "highway_major_subtle",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "maxzoom": 11,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "#2a2a2a",
                                "line-width": { "stops": [[6, 0], [8, 2]] }
                        }
                },
                {
                        "id": "highway_motorway_casing",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "motorway"]
                        ],
                        "layout": {
                                "line-cap": "butt",
                                "line-join": "miter",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "rgba(60,60,60,0.8)",
                                "line-dasharray": [2, 0],
                                "line-opacity": 1,
                                "line-width": { "base": 1.4, "stops": [[5.8, 0], [6, 3], [20, 40]] }
                        }
                },
                {
                        "id": "highway_motorway_inner",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "motorway"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": {
                                        "base": 1,
                                        "stops": [[5.8, "hsla(0, 0%, 85%, 0.53)"], [6, "#000"]]
                                },
                                "line-width": { "base": 1.4, "stops": [[4, 2], [6, 1.3], [20, 30]] }
                        }
                },
                {
                        "id": "road_oneway",
                        "type": "symbol",
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 15,
                        "filter": ["all", ["==", "oneway", 1]],
                        "layout": {
                                "symbol-placement": "line",
                                "icon-image": "oneway",
                                "symbol-spacing": 200,
                                "icon-padding": 2,
                                "icon-rotation-alignment": "map",
                                "icon-rotate": 0,
                                "icon-size": { "stops": [[15, 0.5], [19, 1]] },
                                "visibility": "visible"
                        },
                        "paint": { "icon-opacity": 0.5 }
                },
                {
                        "id": "road_oneway_opposite",
                        "type": "symbol",
                        "source": "geodata",
                        "source-layer": "transportation",
                        "minzoom": 15,
                        "filter": ["all", ["==", "oneway", -1]],
                        "layout": {
                                "symbol-placement": "line",
                                "icon-image": "oneway",
                                "symbol-spacing": 200,
                                "icon-padding": 2,
                                "icon-rotation-alignment": "map",
                                "icon-rotate": 180,
                                "icon-size": { "stops": [[15, 0.5], [19, 1]] },
                                "visibility": "visible"
                        },
                        "paint": { "icon-opacity": 0.5 }
                },
                {
                        "id": "highway_motorway_subtle",
                        "type": "line",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation",
                        "maxzoom": 6,
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "motorway"]
                        ],
                        "layout": {
                                "line-cap": "round",
                                "line-join": "round",
                                "visibility": "visible"
                        },
                        "paint": {
                                "line-color": "#181818",
                                "line-width": { "base": 1.4, "stops": [[4, 2], [6, 1.3]] }
                        }
                },
                {
                        "id": "highway_name_other",
                        "type": "symbol",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation_name",
                        "filter": [
                                "all",
                                ["!=", "class", "motorway"],
                                ["==", "$type", "LineString"]
                        ],
                        "layout": {
                                "symbol-placement": "line",
                                "symbol-spacing": 350,
                                "text-field": "{name:latin} {name:nonlatin}",
                                "text-font": ["Noto Sans Regular"],
                                "text-max-angle": 30,
                                "text-pitch-alignment": "viewport",
                                "text-rotation-alignment": "map",
                                "text-size": 10,
                                "text-transform": "uppercase",
                                "visibility": "visible"
                        },
                        "paint": {
                                "text-color": "rgba(80, 78, 78, 1)",
                                "text-halo-blur": 0,
                                "text-halo-color": "rgba(0, 0, 0, 1)",
                                "text-halo-width": 1,
                                "text-translate": [0, 0]
                        }
                },
                {
                        "id": "highway_name_motorway",
                        "type": "symbol",
                        "metadata": { "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5" },
                        "source": "geodata",
                        "source-layer": "transportation_name",
                        "filter": [
                                "all",
                                ["==", "$type", "LineString"],
                                ["==", "class", "motorway"]
                        ],
                        "layout": {
                                "symbol-placement": "line",
                                "symbol-spacing": 350,
                                "text-field": "{ref}",
                                "text-font": ["Noto Sans Regular"],
                                "text-pitch-alignment": "viewport",
                                "text-rotation-alignment": "viewport",
                                "text-size": 10,
                                "visibility": "visible"
                        },
                        "paint": { "text-color": "hsl(0, 0%, 37%)", "text-translate": [0, 2] }
                }
        ],
        "id": "dark-matter"
}
