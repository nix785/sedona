$(document).ready(function () {
	svg4everybody({});
  
  var openMenu = document.querySelector(".main-nav__btn-burger");
  var closeMenu = document.querySelector(".main-nav__btn-close");
  var menu = document.querySelector(".main-nav__list");
 
  if (screen.width < 768){      
  menu.style.display="none";}
  
  
  openMenu.addEventListener('click', function(event){
    event.preventDefault;
    if (menu.style.display == 'none'){
      menu.style.display = 'flex';
    }
  })
  
  closeMenu.addEventListener("click", function(event){
    event.preventDefault;
    if (menu.style.display == 'flex'){
      menu.style.display = 'none';
    }
  })
  
  
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