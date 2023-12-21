import Plot from 'react-plotly.js';

const HeatMap = ({ data }) => {
	const layout = {
		font: {
			color: 'white',
		},
		width: 900,
		height: 350,
		title: {
			text: 'Total Crimes: Hour of Day vs Day of Week',
			y: 0.825,
			font: {
				family: 'sans-serif',
				size: 24, // Specify the size of the title
				color: 'white', // Specify the color of the title
			},
		},
		autosize: false,
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		config: {
			displayModeBar: false,
		},
		xaxis: {
			title: 'Hour of Day',
			tickvals: [...Array(24).keys()],
			ticktext: [...Array(24).keys()].map((hour) => `${hour}:00`),
			color: 'white',
		},
		yaxis: {
			title: 'Day of Week',
			tickvals: [0, 1, 2, 3, 4, 5, 6],
			ticktext: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			color: 'white',
		},
		legend: {
			traceorder: 'normal',
			orientation: 'h',
			x: 0,
			y: 1.15,
			bgcolor: 'rgba(255, 255, 255, 0.5)',
		},
	};

	return (
		<div className='w-full h-full rounded-3xl flex items-center justify-center'>
			<Plot
				data={[
					{
						x: data.map((entry) => entry.HourOfDay),
						y: data.map((entry) => entry.DayOfWeek),
						z: data.map((entry) => entry.CrimeCount),
						type: 'heatmap',
						colorscale: 'Viridis_r',
					},
				]}
				layout={layout}
			/>
		</div>
	);
};

export default HeatMap;
