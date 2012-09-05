
      var map;
      function initialize() {
        var mapOptions = {
          zoom: 16,
          center: new google.maps.LatLng(28.633199,77.214746),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            mapOptions);
      }

      google.maps.event.addDomListener(window, 'load', initialize);
