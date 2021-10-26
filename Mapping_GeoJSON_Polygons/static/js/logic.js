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

//The alternative that does the same
let map = L.map("mapid", {
    center: [
        43.7, -79.3
    ],
    zoom: 11,
    layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the
// layers control to the map
L.control.layers(baseMaps).addTo(map);


// Accessing the toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/yutachung/Mapping_Earthquakes/main/torontoNeighborhoods.json"


//Create a style for the lines
let myStyle = {
    color: "#fffa1",
    weight: 2
}

//Grabbing out GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data
L.geoJson(data, {
    fillcolor: "#ffffa1",
    weight: 1
    })
.addTo(map)
});
