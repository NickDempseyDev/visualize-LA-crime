'use client';

import { Circle } from 'react-leaflet';
import { crimes } from '../data';
const Crimes = () => {
	return (
		<>
			{crimes.value.map((crime) => (
				<Circle key={crime.id} center={[crime.LAT, crime.LON]} radius={100} pathOptions={{ color: 'red' }} />
			))}
		</>
	);
};

export default Crimes;
