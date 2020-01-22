var mapVelo = {
  countdown: undefined,
  apiJCD:
    'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=43d63681812bae79ef7f7af2981f3c4f2c2e7a47',

  initMap: function() {
    mapVelo.icons = {
      green: mapVelo.createIcon('images/greenIcon.png'),
      red: mapVelo.createIcon('images/redIcon.png')
    };

    mapVelo.map = new google.maps.Map($('#map')[0], {
      center: {
        lat: 43.293908,
        lng: 5.3832352
      },
      zoom: 14.5
    });

    mapVelo.stationMarkers();
  },

  stationMarkers: function() {
    Ajax.ajaxGet(mapVelo.apiJCD, function(reponse) {
      const stations = JSON.parse(reponse);

      for (let station of stations) {
        let address = station.address;
        let available = station.available_bikes;
        let status = station.status;
        let name = station.name;
        if (status === 'OPEN') {
          status = 'Ouvert';
        } else {
          status = 'Fermé';
        }
        var markerLoc = new google.maps.LatLng(
          station.position.lat,
          station.position.lng
        );

        var marker = new google.maps.Marker({
          position: markerLoc,
          map: mapVelo.map,
          icon: mapVelo.colorIcon(available, status),
          title: name
        });

        marker.addListener('click', function() {
          $('#address').text(address.toLowerCase());
          $('#addressR').text(address.toLowerCase());
          $('#available').text(available);
          $('#status').text(status);
          if (status === 'Ouvert' && available > 0) {
            $('#status').css({ 'background-color': '#29655E', color: 'white' });
          } else {
            $('#status').css({ 'background-color': '#B93523', color: 'white' });
          }
        });
      }
    });
  },

  createIcon: function(url) {
    return {
      url: url,
      scaledSize: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };
  },

  colorIcon: function(available, status) {
    if (!available || status !== 'Ouvert') {
      return mapVelo.icons.red;
    } else {
      return mapVelo.icons.green;
    }
  }
};
