
let map;
let marker;
let autocomplete;
let infowindow;
let startingLocation;
let placeTypeGlobal;

let selected_marker;

let yogaService;
let yogaPlaceRequest;
const YOGA = "therapeutic yoga";

let meditationService;
let meditationPlaceRequest;
const MEDITATION = "meditation";

let acupunctureService;
let acupuncturePlaceRequest;
const ACUPUNCTURE = "acupuncture";

let guidedImageryService;
let guidedImageryPlaceRequest;
const GUIDEDIMAGERY = "guided imagery";

let massageTherapyService;
let massageTherapyPlaceRequest;
const MASSAGETHERAPY = "massage therapy";

let detailsService;
let directionsService;
let directionsRenderer;

const iconBase = "http://maps.google.com/mapfiles/ms/icons/";
const icons = {
  yoga: {
    name: "Yoga",
    icon: iconBase + "green-dot.png",
  },
  meditation: {
    name: "Meditation",
    icon: iconBase + "blue-dot.png",
  },
  acupuncture: {
    name: "Acupuncture",
    icon: iconBase + "yellow-dot.png",
  },
  guidedImagery: {
    name: "Guided Imagery",
    icon: iconBase + "orange-dot.png",
  },
  massageTherapy: {
    name: "Massage Therapy",
    icon: iconBase + "pink-dot.png",
  },
}

function initMap() {
    
  var howard = new google.maps.LatLng(38.9227,-77.0194);

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: howard,
    mapTypeControl: false,
  });

  // alert(map)
  // Initialize Directions Service and Renderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Create Map Legend 
  createLegend();

  const inputText = document.getElementById("autocomplete");

  // Step 0: User Input Address
  autocomplete = new google.maps.places.Autocomplete(
    inputText,
    {
      types: ['geocode'],
      componentRestrictions: {"country": ["US"]},
      fields: ["place_id", "geometry", "name"]
    })
  autocomplete.bindTo('bounds', map);
  
    // Create Mode Select Element
    const modeSelect = document.getElementById("floating-panel");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(modeSelect);

  marker = new google.maps.Marker({
    map:map
  })

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged(){
    startingLocation = autocomplete.getPlace();

    if (!startingLocation.geometry) {
        // Handle the case when no valid place is selected
        console.log("Please select a valid place.");
    } else {
        // Logic to handle when a valid place is selected
        map.setCenter(startingLocation.geometry.location);
        marker = new window.google.maps.Marker({
            map
        })
        marker.setPosition(startingLocation.geometry.location);
        marker.setMap(map);

        // Step 3: Search for nearby specific facilities

        // Define a list of place types and their respective callbacks
        const placeTypes = [
            { type: YOGA, callback: yogaSearchCallback },
            { type: MEDITATION, callback: meditationSearchCallback },
            { type: ACUPUNCTURE, callback: acupunctureSearchCallback },
            { type: GUIDEDIMAGERY, callback: guidedImagerySearchCallback },
            { type: MASSAGETHERAPY, callback: massageTherapySearchCallback }
        ];
        // Iterate through each place type and perform a nearby search
        placeTypes.forEach(placeType => {
            const placeRequest = {
                location: startingLocation.geometry.location,
                radius: 16093.4,
                keyword: placeType.type
            };
            const service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch(placeRequest, placeType.callback);
        });
    }
}

function createLegend(){
  const legend = document.getElementById("legend");
  for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");
    div.innerHTML = '<img src="' + icon + '"> ' + name;
    legend.appendChild(div);
  }
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(legend);
}

function yogaSearchCallback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, yogaDetailsCallback)
    }
  }
}

function yogaDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, YOGA);
  }
}

function meditationSearchCallback(results, status){
  // alert("meditation callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, meditationDetailsCallback)
    }
  }
  else{
    // alert("No Meditation Facilities Found Nearby")
  }
}
function meditationDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, MEDITATION);
  }
}

function acupunctureSearchCallback(results, status){
  // alert("acupuncture callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, acupunctureDetailsCallback)
    }
  }
  else{
    // alert("No Acupuncture Facilities Found Nearby")
  }
}
function acupunctureDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, ACUPUNCTURE);
  }
}
function guidedImagerySearchCallback(results, status){
  // alert("guided imagery callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, guidedImageryDetailsCallback)
    }
  }
  else{
    // alert("No Guided Imagery Facilities Found Nearby")
  }
}

function guidedImageryDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, GUIDEDIMAGERY);
  }
}

function massageTherapySearchCallback(results, status){
  // alert("massage therapy callback func called")
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var request = {
        placeId: results[i].place_id,
        fields: ['name', 'rating','reviews', 'website', 'formatted_address', 'formatted_phone_number', 'geometry', 'photos']
      };
      detailsService = new google.maps.places.PlacesService(map);
      detailsService.getDetails(request, massageTherapyDetailsCallback)
    }
  }
  else{
    // alert("No Massage Therapy Facilities Found Nearby")
  }
}

function massageTherapyDetailsCallback(place, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarker(place, MASSAGETHERAPY);
  }
}


const createMarker = (place, placeType) => {
    if (!place.geometry || !place.geometry.location) return;

    let photoHTML = '';
    if (place.photos && place.photos.length > 0) {
        const photo = place.photos[0]; // Assuming you want to display the first photo
        photoHTML = '<img src="' + photo.getUrl({ maxWidth: 200 }) + '">';
    } else {
        photoHTML = '<p>No photo available</p>';
    }
    // Generate HTML for the name
    const nameHTML = '<h1>' + place.name + '</h1>';

    // Generate HTML for the address, phone number, website, rating, and reviews
    let detailsHTML = '<p><b>Address:</b> ' + place.formatted_address + '</p>' +
        '<p><b>Phone:</b> ' + place.formatted_phone_number + '</p>' +
        '<p><b>Website:</b> <a href="' + place.website + '">' + place.website + '</a></p>' +
        '<p><b>Rating:</b> ' + place.rating + '</p>';

                // Add reviews if available
    if (place.reviews && place.reviews.length > 0) {
        detailsHTML += '<h2>Reviews:</h2>';
        for (let i = 0; i < Math.min(place.reviews.length, 2); i++) {
        const review = place.reviews[i];
        detailsHTML += '<p><b>Author:</b> ' + review.author_name + '</p>' +
            '<p><b>Rating:</b> ' + review.rating + '</p>' +
            '<p><b>Review:</b> ' + review.text + '</p>';
        }
    } else {
        detailsHTML += '<p>No reviews available</p>';
    }

    // Concatenate all HTML elements
    const contentString =
        '<div id="content">' +
        '<div id="siteNotice"></div>' +
        '<div id="bodyContent">' +
        photoHTML +
        nameHTML +
        detailsHTML +
        '</div>' +
        '</div>';
    if (placeType === YOGA) {

        const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            icon: icons.yoga.icon,
            map
        });

        window.google.maps.event.addListener(marker, "click", () => {
            selected_marker = place.geometry.location;

            infowindow = new window.google.maps.InfoWindow();
            infowindow.setContent(contentString);
            infowindow.setPosition(place.geometry.location);
            infowindow.setOptions({
                maxWidth: 500,
                
            });
            infowindow.open(map);
            //calcRoute(place.geometry.location);

            // Add listener for closeclick event
            window.google.maps.event.addListener(infowindow, 'closeclick', () => {
                // Recalculate route and display it on the map
                calcRoute(selected_marker);
            });
            document.getElementById("mode").addEventListener("change", () => {
                calcRoute(selected_marker);
            });

        });
    } else if (placeType === MEDITATION) {
        const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location,
            icon: icons.meditation.icon
        });
        window.google.maps.event.addListener(marker, "click", () => {
            selected_marker = place.geometry.location;

            infowindow = new window.google.maps.InfoWindow();
            infowindow.setContent(contentString);
            infowindow.setPosition(place.geometry.location);
            infowindow.setOptions({
                maxWidth: 500,
            });
            infowindow.open(map);

            // Add listener for closeclick event
            window.google.maps.event.addListener(infowindow, 'closeclick', () => {
                // Recalculate route and display it on the map
                calcRoute(selected_marker);
            });
            document.getElementById("mode").addEventListener("change", () => {
                calcRoute(selected_marker);
            });

        });
    } else if (placeType === ACUPUNCTURE) {
        const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location,
            icon: icons.acupuncture.icon
        });
        window.google.maps.event.addListener(marker, "click", () => {
            selected_marker = place.geometry.location;
            infowindow = new window.google.maps.InfoWindow();
            infowindow.setContent(contentString);
            infowindow.setPosition(place.geometry.location);
            infowindow.setOptions({
                maxWidth: 500,
            });
            infowindow.open(map);

            // Add listener for closeclick event
            window.google.maps.event.addListener(infowindow, 'closeclick', () => {
                // Recalculate route and display it on the map
                calcRoute(selected_marker);
            });
            document.getElementById("mode").addEventListener("change", () => {
                calcRoute(selected_marker);
            });

        });
    } else if (placeType === GUIDEDIMAGERY) {
        const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location,
            icon: icons.guidedImagery.icon
        });
        window.google.maps.event.addListener(marker, "click", () => {
            selected_marker = place.geometry.location;

            infowindow = new window.google.maps.InfoWindow();
            infowindow.setContent(contentString);
            infowindow.setPosition(place.geometry.location);
            infowindow.setOptions({
                maxWidth: 500,
            });
            infowindow.open(map);

            // Add listener for closeclick event
            window.google.maps.event.addListener(infowindow, 'closeclick', () => {
                // Recalculate route and display it on the map
                calcRoute(place.geometry.location);
            });
            document.getElementById("mode").addEventListener("change", () => {
                calcRoute(selected_marker);
            });

        });
    } else if (placeType === MASSAGETHERAPY) {
        const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location,
            icon: icons.massageTherapy.icon
        });
        window.google.maps.event.addListener(marker, "click", () => {
            selected_marker = place.geometry.location;
            infowindow = new window.google.maps.InfoWindow();
            infowindow.setContent(contentString);
            infowindow.setPosition(place.geometry.location);
            infowindow.setOptions({
                maxWidth: 500,
            });
            infowindow.open(map);

            // Add listener for closeclick event
            window.google.maps.event.addListener(infowindow, 'closeclick', () => {
                // Recalculate route and display it on the map
                calcRoute(selected_marker);
            });
            document.getElementById("mode").addEventListener("change", () => {
                calcRoute(selected_marker);
            });
        });
    }
}

function calcRoute(destination){

    const selectedMode = document.getElementById("mode").value;

    let directionsRequest = {
        origin: startingLocation.geometry.location,
        destination: destination,
        travelMode: window.google.maps.TravelMode[selectedMode],

    }
    directionsService.route(directionsRequest, function (result, status) {
        if (status === "OK") {
            directionsRenderer.setDirections(result);

            // Adjust the map's zoom level to fit the route
            map.fitBounds(result.routes[0].bounds);

        }
    })
}

window.initMap = initMap;
