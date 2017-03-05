<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="./static/lib/css/leaflet.css">
</head>
<body>

  <div id="map" style="width: 700px; height: 550px"></div>

  <!-- Dependencies: leaflet.js, leaflet-heat.js,
  and data file(geo_total_vs.js) -->
  <script src="d3.min.js"></script>
  <script src="leaflet.js"></script>
  <script src="leaflet-heat.js"></script>
  <script src='geo_v4_small_ordered.js' type='text/javascript'></script>


  <!-- Main script -->
  <script>

  var data = geo;
  var heatData = [];

  document.body.addEventListener('click', update(data), true);

  for (var j = 0; j < 12; j++) {
    for(var i = 0; i < data[j]['values'].length; i++) {
      if (data[j]['values'][i][1] != 0) {
        var thing = data[j]['values'][i][2].concat(data[j]['values'][i][1])
        heatData.push(thing)
      }
    }
  }

  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '...',
      maxZoom: 18
    }
  );

  var cfg = {
    radius: 20,
    maxOpacity: .8,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  };

  var heatmapLayer = L.heatLayer(heatData, cfg);

  var map = new L.map('map', {
    center: new L.LatLng(0, 0),
    zoom: 1,
    layers: [baseLayer, heatmapLayer]
  });

  function update(data, region='North America') {
    newData = []
    for (var j = 0; j < 12; j++) {
      if data[j]['key'] == region:
        newData.push()
      for(var i = 0; i < data[j]['values'].length; i++) {
        if (data[j]['values'][i][1] != 0) {
          var thing = data[j]['values'][i][2].concat(data[j]['values'][i][1])
          heatData.push(thing)
      }
    }
  }
    console.log(data[0]['key'])
    // heatmapLayer.setData(data)
  }


  </script>


</body>
</html>
