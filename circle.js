var dataset = [];

for(var i=0; i<5; i++){
    dataset.push(Math.round(Math.random()*100));
}

var sampleSVG = d3.select("#viz")
    .append("svg")
    .attr("width", 400)
    .attr("height", 100);

var circle = sampleSVG.selectAll("circle")
    .data(dataset, function(d) { return d;});

circle.enter().append("circle")
    .style("stroke", "gray")
    .style("fill", "white")
    .attr("r", 40)
    .attr("cy", 50)
    .attr("cx", function(d, i){return i*80 + 40})
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
