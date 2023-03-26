let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

  function barChart(sample){
    d3.json(url).then((data) => {
      let dataSample = data.samples;
      let dataSampleID = dataSample.filter(object => object.id == sample);
      let firstItem = dataSampleID[0];
      let value = data.names;
    let xValues = firstItem['sample_values'].slice(0,10).reverse();
    let yLabels = firstItem['otu_ids'].slice(0,10).reverse();
    let yLabelsOTU = yLabels.map(otu_ids => `OTU ${otu_ids}`)
    let hovertext = firstItem['otu_labels'].slice(0,10).reverse();

    let chartData = [{
        x: xValues,
        y: yLabelsOTU,
        type: "bar",
        orientation: 'h',
        text: hovertext
    }];
    let layout = {
        hovermode: "closest",
        title: "Sample Values vs OTU ID"
    };
    Plotly.newPlot("bar", chartData, layout);
  })};

  function bubbleChart(sample){
    d3.json(url).then((data) => {
      let dataSample = data.samples;
      let dataSampleID = dataSample.filter(object => object.id == sample);
      let firstItem = dataSampleID[0];
      let value = data.names;
    let bubbleChart1 = {
        x: firstItem['otu_ids'],
        y: firstItem['sample_values'],
        mode: 'markers',
        marker: {
            color: firstItem['otu_ids'],
            size: firstItem['sample_values'],
            colorscale: "Jet"
        }};
    let bubbleData = [bubbleChart1]
    let layout = {
        xaxis: {title: 'OTU ID'},
        title: "Sample Values vs OTU ID"
    }
    Plotly.newPlot("bubble", bubbleData, layout);
  });

};

function metaData(sample){
  let panel = d3.select("#sample-metadata")
  d3.json(url).then((data) => {
    let metaData = data.metadata;
    let metaDataID = metaData.filter(object => object.id == sample);
    let firstItem = metaDataID[0];
  panel.html('');
  for (key in firstItem){
    panel.append('h6').text(`${key}: ${firstItem[key]}`)
  };

})};


function init(){
  let value = [];
  d3.json(url).then((data) => {
    let data_sample = data.samples
    for (let i = 0; i < data_sample.length; i++) {
      row = data_sample[i];
      value.push(row.id);
    };

  d3.select("#selDataset")
  .selectAll('ID Select')
     .data(value)
  .enter()
    .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

  barChart('940');
  bubbleChart('940');
  metaData('940')
})};

init();

function optionChanged(IDchange){
  barChart(IDchange);
  bubbleChart(IDchange);
  metaData(IDchange)
};
