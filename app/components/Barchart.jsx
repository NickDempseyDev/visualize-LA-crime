import GenericPlot from './GenericPlot';

const data = [
	{
		x: [1, 2, 3],
		y: [2, 6, 3],
		type: 'scatter',
		mode: 'lines+markers',
		marker: { color: 'red' },
	},
	{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
];

const text = 'A Barchart Plot';

const Barchart = () => {
	return <GenericPlot title={text} data={data} />;
};

export default Barchart;
