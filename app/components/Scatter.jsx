import GenericPlot from './GenericPlot';

const data = [
	{
		x: [1, 2, 3, 4, 5],
		y: [10, 11, 12, 13, 14],
		mode: 'markers',
		type: 'scatter',
		marker: { color: 'blue' },
		name: 'Series 1',
	},
	{
		x: [1, 2, 3, 4, 5, 6],
		y: [14, 13, 12, 11, 10, 100],
		mode: 'markers',
		type: 'scatter',
		marker: { color: 'red', size: 12 },
		name: 'Series 2',
	},
];

const text = 'A Scatter Plot';

const Scatter = () => {
	return <GenericPlot title={text} data={data} />;
};

export default Scatter;
