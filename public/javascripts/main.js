$( document ).ready(function(){
  $('ul.tabs').tabs();
  $('.collapsible').collapsible();
  geoFindMe()
  console.log("inside document ready.")

  function geoFindMe() {
    if (!navigator.geolocation) {
      return;
    }
    console.log('Inside geoFindMe.');

    function success(position) {
      var date = new Date();
      var minutes = 10;
      date.setTime(date.getTime() + (minutes * 60 * 1000));
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      document.cookie = `latitude=${latitude}`
      document.cookie = `longitude=${longitude}`
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}.`);
    }

    function error() {
      console.log("Unable to retrieve your location.");
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

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

  function initMap() {

    let locations = []

    $( "a.beer-links" ).each(function( index ) {
      locations.push([`<a href="${$(this).attr('href')}">${$(this).html()}</a>`, Number($(this).data("options").latitude), Number($(this).data("options").longitude), Number(index)])
    });

    console.log(locations);

  	var map = new google.maps.Map(document.getElementById('map'), {
  		zoom: 13,
  		center: new google.maps.LatLng(Number(Cookies.get('latitude')), Number(Cookies.get('longitude'))),
  		mapTypeId: google.maps.MapTypeId.ROADMAP
  	});

  	var infowindow = new google.maps.InfoWindow({});

    var bottle = {
      url: "img/bottle.png",
      scaledSize: new google.maps.Size(18*1.3, 62*1.3)
    }


  	var marker, i;

  	for (i = 0; i < locations.length; i++) {
  		marker = new google.maps.Marker({
  			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        icon: bottle,
  			map: map
  		});

  		google.maps.event.addListener(marker, 'click', (function (marker, i) {
  			return function () {
  				infowindow.setContent(locations[i][0]);
  				infowindow.open(map, marker);
          map.panTo(marker.getPosition())
  			}
  		})(marker, i))
      google.maps.event.addListener(infowindow, 'closeclick', (function (marker, i) {
  			return function () {
          map.panTo(new google.maps.LatLng(Number(Cookies.get('latitude')), Number(Cookies.get('longitude'))))
  			}
  		})(marker, i));
  	}
  }


});
