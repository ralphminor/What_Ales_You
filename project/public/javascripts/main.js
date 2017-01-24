// smooth scroll
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// geolocation
function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}

//breweriesdb api
// let url = "http://api.brewerydb.com/v2"
// let lat = 35.772096
// let lng = -78.638614
// let key = "f9357c5e43215da0430cdbf889d7e4f1"
// `${url}/search/geo/point?lat=${lat}&lng=${lng}&key=${key}`
$.get("https://api.brewerydb.com/v2/search/geo/point?lat=39.7576774&lng=-105.0071633&key=f9357c5e43215da0430cdbf889d7e4f1", function(data) {
  // let breweries = {}
  for(i=0;i<12;i++){
    console.log(data.data[i]);
    let $el = $('<hr><a href="/brewery/'+data.data[i].breweryId+'" class="brew-list">'+data.data[i].brewery.name+'</a>')
    $el.appendTo('.brew-name')

  }
})
