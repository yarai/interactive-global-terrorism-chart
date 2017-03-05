d3.json('kill.json', function(data) {
  nv.addGraph(function() {
    var chart = nv.models.stackedAreaChart()
                  .margin({right: 100})
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
})
