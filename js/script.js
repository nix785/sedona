$(document).ready(function () {
	svg4everybody({});
});

 function initMap() {
      var uluru = {
        lat: 34.8543583,
        lng: -111.8651786
      };
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Sedona',
	       icon: {
		   url: "img/map-marker.svg",
		scaledSize: new google.maps.Size(20, 20)
	}
      });
    }