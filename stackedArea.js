d3.json('nkill_v3_ordered.json', function(data) {
  nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
                  .margin({left: 300, right: 50})
                  .x(function(d) { return d[0] })   //We can modify the data accessor functions...
                  .y(function(d) { return d[1] })   //...in case your data is formatted differently.
                  .useInteractiveGuideline(true)    //Tooltips which show all data points. Very nice!
                  .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
                  .showControls(true)       //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                  .clipEdge(true);

    //Format x-axis labels with custom function.
    chart.xAxis
        .tickFormat(function(d) {
          return d3.time.format('%Y')(new Date(d + 1, 0, 0, 0, 0, 0, 0))
    });

    chart.yAxis
        .tickFormat(d3.format(',.2f'));

    var dispatch = chart.dispatch;
    var stacked = chart.stacked;
    var legend = chart.legend;
    var control = chart.controls;
    var interactiveLayer = chart.interactiveLayer;

    d3.select('#chart svg')
      .datum(data)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });


  // function update(data, region='North America') {
  //   newData = []
  //   for (var j = 0; j < 12; j++) {
  //     if data[j]['key'] == region:
  //       newData.push()
  //     for(var i = 0; i < data[j]['values'].length; i++) {
  //       if (data[j]['values'][i][1] != 0) {
  //         var thing = data[j]['values'][i][2].concat(data[j]['values'][i][1])
  //         heatData.push(thing)
  //     }
  //   }
  // }
  //   console.log(data[0]['key'])
  //   // heatmapLayer.setData(data)
  // }
})

var data = geo;
var heatData = [];

//document.body.addEventListener('click', update(data), true);

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
