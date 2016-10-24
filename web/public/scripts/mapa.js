window.onload = function() {
  var startPos;
  var mapCanvas;
  var lat;
  var long;
  var mapOptions;
  var geoOptions = {
  	maximumAge: 5 * 60 * 1000,
}

var geoSuccess = function(position) {
    mapCanvas = document.getElementById("map-canvas");
    startPos = position;
    
    lat = startPos.coords.latitude;
    long= startPos.coords.longitude;
    //document.getElementById('startLat').innerHTML = lat;
    //document.getElementById('startLon').innerHTML = long;
    
    initMap();    
  };

  function initMap() {
    var icone = 'https://cdn0.iconfinder.com/data/icons/characters-filled-1/60/cloud-silly-tounge-avatar-128.png';
    var myLatlng = new google.maps.LatLng(lat,long);
    mapOptions = {
      center: new google.maps.LatLng(lat, long), zoom: 15
      };
    map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Tu ta aqui",
      animation: google.maps.Animation.DROP,
      icon: icone
    });

    // Adicionando marcador no mapa;
    marker.setMap(map);
  }
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};