var dataset = [];

for (i = 0; i < 3; i++) {
    for (j = 0, tmpDataset = []; j < 3; j++) {
        tmpDataset.push(0);
    }
    dataset.push(tmpDataset);
}


var svg = d3.select("#viz")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

var circle = svg.selectAll("circle")
    .data(dataset, function(d) { return d;});

circle.selectAll("circle")
    .data(function(d){return d;})
    .enter().append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("r", 40)
    .attr("cy", 50)
    .attr("cx", function(d, i){ console.log(i); return i*80 + 40})
    .on("mouseover", function(){d3.select(this).style("fill", "aliceblue");})
    .on("mouseout", function(){d3.select(this).style("fill", "white");})
    .on("mousedown", animateFirstStep);

circle.exit().remove();

function animateFirstStep(){
    d3.select(this)
      .transition()
        .delay(0)
        .duration(1000)
        .attr("r", 10)
        .each("end", animateSecondStep);
};

function animateSecondStep(){
    d3.select(this)
      .transition()
        .duration(1000)
        .attr("r", 40);
};
