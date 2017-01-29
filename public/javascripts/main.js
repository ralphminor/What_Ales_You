$( document ).ready(function(){
  $('ul.tabs').tabs();
  $('.collapsible').collapsible();
});


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



function geoFindMe() {
  if (!navigator.geolocation) {
    return;
  }

  function success(position) {
    var date = new Date();
    var minutes = 10;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    document.cookie = `latitude=${latitude}`
    document.cookie = `longitude=${longitude}`
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}.`);
  }

  function error() {
    console.log("Unable to retrieve your location.");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

geoFindMe()
