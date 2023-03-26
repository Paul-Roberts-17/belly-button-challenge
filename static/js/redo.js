let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then((data) => {
    let dataSample = data.samples;
    let dataSampleID = dataSample.filter(item => item.id == sample);
    let firstItem = dataSampleID[0];
    let metaData = data.metadata;
    let metaDataID = metaData.filter(item => item.id == sample);
    let firstMeta = metaDataID[0];


function barChart(sample){
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
        hovermode: "closest"
    };
    Plotly.restyle("bar", chartData, layout);

function bubbleChart(sample){
    let bubbleChart1 = {
        x: firstItem['otu_ids'],
        y: firstItem['sample_values'],
        mode: 'markers',
        marker: {
            color: firstItem['otu_ids'],
            size: firstItem['sample_values'],
            colorscale: "Jet"
        };
    let bubbleData = [bubbleChart1];
    let layout = {
        xaxis: {title: 'OTU ID'}
    };
    


    };


}


}



};