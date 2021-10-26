
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

//The alternative that does the same
let map = L.map("mapid", {
    center: [
        30, 30
    ],
    zoom: 2,
    layers: [streets]
});

// Pass our map layers into our layers control and add the
// layers control to the map
L.control.layers(baseMaps).addTo(map);


// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/yutachung/Mapping_Earthquakes/main/majorAirports.json"


//Grabbing out GeoJSON data
d3.json(airportData).then(function(data, layer) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(map);
});
