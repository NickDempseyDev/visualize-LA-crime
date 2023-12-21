import Plot from 'react-plotly.js';

const StackedBarChart = ({ data }) => {
	const uniqueWeapons = Array.from(new Set(data.map((entry) => entry.WeaponDesc)));

	const layout = {
		barmode: 'stack',
		xaxis: {
			title: 'Day of Week',
			tickangle: -45,
			tickvals: [0, 1, 2, 3, 4, 5, 6],
			ticktext: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		},
		yaxis: {
			title: 'Crime Count',
		},
		font: {
			color: 'white',
		},
		width: 900,
		height: 350,
		title: {
			text: 'Breakdown of Crime Count by Top 8 Weapon Types',
			y: 0.825,
			font: {
				family: 'sans-serif',
				size: 24,
				color: 'white',
			},
		},
		colorway: ['#440154', '#481567', '#482677', '#404788', '#55C667', '#73D055', '#95D840', '#FDE725'],
		autosize: false,
		plot_bgcolor: 'rgba(0,0,0,0)',
		paper_bgcolor: 'rgba(0,0,0,0)',
		config: {
			displayModeBar: false,
		},
	};

	const traces = uniqueWeapons.map((weapon) => ({
		x: data.filter((entry) => entry.WeaponDesc === weapon).map((entry) => entry.DayOfWeek),
		y: data.filter((entry) => entry.WeaponDesc === weapon).map((entry) => entry.CrimeCount),
		type: 'bar',
		name: weapon,
	}));

	return (
		<div className='w-full h-full rounded-3xl flex items-center justify-center'>
			<Plot data={traces} layout={layout} />
		</div>
	);
};

export default StackedBarChart;
