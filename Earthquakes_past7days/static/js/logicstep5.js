// Creat the light tile layer option
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the earthquake layer for our map
let earthquakes = new L.layerGroup();

//we define an object that contains the overlays
// This overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

//The alternative that does the same
let map = L.map("mapid", {
    center: [
        39.5, -98.5
    ],
    zoom: 3,
    layers: [streets]
});

// Add control that lets user change which layers are visible
L.control.layers(baseMaps, overlays).addTo(map);


//Retrieve the earthquake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    //Styling function to be used in the L.geoJson format after
    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

    // function determining color of circle based on magnitude
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }
    // function for determing radius of earthquake marker
    // based on its magnitude
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude*4;
    }
    
//Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        //create popup for each circleMarker to display mag and
        //location of earthquake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    // Then we add the eearthquake layer to our map
    earthquakes.addTo(map);

    //Create a legend control object
    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + "'></i>" + 
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }

    return div;
};

legend.addTo(map);

});