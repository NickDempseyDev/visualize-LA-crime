import Plot from 'react-plotly.js';

const CrimeCorrelationChart = ({ data }) => {
	const layout = {
		title: 'Crime Correlation Analysis',
		xaxis: {
			title: 'Hour of Day',
			tickvals: [...Array(24).keys()],
			ticktext: [...Array(24).keys()].map((hour) => `${hour}:00`),
		},
		yaxis: {
			title: 'Victim Age',
		},
	};

	return (
		<Plot
			data={[
				{
					x: data?.map((entry) => entry.HourOfDay),
					y: data?.map((entry) => entry.VictAge),
					mode: 'markers',
					type: 'scatter',
					marker: { size: data?.map((entry) => entry.CrimeCount) },
				},
			]}
			layout={layout}
		/>
	);
};

export default CrimeCorrelationChart;
