import Plot from 'react-plotly.js';

const GenericPlot = ({ title, data }) => {
	return (
		<div className='w-full h-full rounded-3xl flex items-center justify-center'>
			{/* Other content or components if any */}
			<Plot
				data={data}
				layout={{
					font: {
						color: 'white',
					},
					width: 800,
					height: 450,
					title: {
						text: title,
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
				}}
			/>
			{/* Other content or components if any */}
		</div>
	);
};

export default GenericPlot;
