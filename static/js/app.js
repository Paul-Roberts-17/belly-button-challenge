let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let sample_values = [];
let otu_ids = [];
let otu_labels = [];
let value = [];

let file = d3.json(url).then(function(data) {
    console.log(data.samples);
    let data_sample = data.samples



for (let i = 0; i < data_sample.length; i++) {
    row = data_sample[i];
    sample_values.push(row.sample_values.slice(0,10));
    otu_ids.push(row.otu_ids.slice(0,10));
    otu_labels.push(row.otu_labels.slice(0,10));
    value.push(row.id);
};


console.log(sample_values);
console.log(otu_ids)
console.log(value)

function init() {
    info = [{
      x: sample_values[0],
      y: otu_ids[0],
      text: otu_labels[0],
      type: "bar",
      orientation: 'h'}]
  
    Plotly.newPlot("bar", info);
  }
 
 // Add options to the dropdown menu
  d3.select("#selDataset")
  .selectAll('ID Select')
     .data(value)
  .enter()
    .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  //function update(selectedGroup) {
  //var x = data_sample.map(function(d){return {id: id, value:d[selectedGroup]} })
  //var y = data_sample.map(function(d){return {id: id, value:d[selectedGroup]} })

d3.select("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
  
    // Initialise x and y arrays
    let x = [];
    let y = [];
  
    if (dataset === 'value') {
      x = sample_values;
      y = otu_ids;
    }
  

  
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [sample_values]);
    Plotly.restyle("bar", "y", [otu_ids]);
  }
  
  init();
});
  


let trace1 = {
    x: sample_values,
    y: otu_ids,
    text: otu_labels,
    name: "chart1",
    type: "bar",
    orientation: "h"
  };
  
let info = [trace1];

let layout = {
    title: "Sample Values vs OTU ID",
    margin: {
      l: 50,
      r: 50,
      b: 200,
      t: 50,
      pad: 4
    }
  };
  
  Plotly.newPlot("bar", info, layout);


