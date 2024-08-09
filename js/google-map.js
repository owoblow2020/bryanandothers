// Removed the unnecessary global variable declaration
function init() {

    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var   
   myLatlng = new google.maps.LatLng(7.419417,   
   3.926915); // Your desired latitude and longitude
  
    var mapOptions = {
      zoom: 7, // How zoomed in
      center: myLatlng, // Center of the map
      scrollwheel: false, // Disable map zoom on scroll wheel
      styles: [ // Optional map styles
        {
          "featureType": "administrative.country",
          "elementType": "geometry",
          "stylers": [
            { "visibility": "simplified" },
            { "hue": "#ff0000" }
          ]
        }
      ]
    };
  
    // Get the HTML DOM element that will contain your map   
  
    var mapElement = document.getElementById('map');
  
    // Create the Google Map using our element and options   
  
    var map = new google.maps.Map(mapElement, mapOptions);
  
    var addresses = ['Ibadan, Nigeria.'];
  
    // Loop through addresses and create markers
    for (var i = 0; i < addresses.length; i++) {
      var address = addresses[i]; // Use a more descriptive variable name
  
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&sensor=false`)
        .then(response => response.json())
        .then(data => {
          var location = data.results[0].geometry.location;
          var latlng = new google.maps.LatLng(location.lat, location.lng);
          new google.maps.Marker({
            position: latlng,
            map: map,
            icon: 'images/loc.png'
          });
        })
        .catch(error => console.error("Error fetching address:", error));
    }
  }
  
  // Call the init function when the window loads
  window.addEventListener('load', init);