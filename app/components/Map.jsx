'use client';

import { MapContainer, TileLayer, GeoJSON, Circle, Popup } from 'react-leaflet';
import { useState } from 'react';
import geoJSONData from '../los-angeles-county.json';
import { crimeCodeToDescription, colorMap } from '../data';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import leaflet from 'leaflet';
import 'leaflet.markercluster';

const bounds = [
	[33.7, -119],
	[34.3, -118],
];

const Legend = ({ colorMap, isOverview }) => {
	const [isLegendOpen, setLegendOpen] = useState(true);

	const toggleLegend = () => {
		setLegendOpen(!isLegendOpen);
	};
	return (
		<div
			className={`absolute bottom-10 left-10 text-black bg-slate-50 p-4 border border-gray-300 z-[99999] rounded transition-all ${
				isLegendOpen ? 'w-40' : 'w-fit overflow-hidden'
			}`}
		>
			<button onClick={toggleLegend} className={`mb-2 ${isLegendOpen ? 'w-full flex' : ''}`}>
				{isLegendOpen ? <span className='w-full text-center'>X</span> : 'Toggle Legend'}
			</button>
			{isLegendOpen &&
				(!isOverview ? (
					<>
						{Object.entries(colorMap).map(([crimeCode, color]) => (
							<div key={crimeCode} className='flex items-center mb-2'>
								<div className='w-4 h-4 rounded bg-gray-300 flex-none' style={{ backgroundColor: color }}></div>
								<div className='ml-2 flex-grow'>
									<p className='text-[9px] break-words'>{crimeCodeToDescription[crimeCode]}</p>
								</div>
							</div>
						))}
					</>
				) : (
					<>
						<div className='flex items-center mb-2'>
							<div className='w-6 h-6 rounded bg-gray-300 flex-none text-white text-center' style={{ backgroundColor: 'black' }}>
								#
							</div>
							<div className='ml-2 flex-grow'>
								<p className='text-[16px] break-words'>Crimes Committed</p>
							</div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-6 h-6 rounded bg-gray-300 flex-none' style={{ backgroundColor: '#AA336A' }}></div>
							<div className='ml-2 flex-grow'>
								<p className='text-[16px] break-words'>Female Victim</p>
							</div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-6 h-6 rounded bg-gray-300 flex-none' style={{ backgroundColor: 'blue' }}></div>
							<div className='ml-2 flex-grow'>
								<p className='text-[16px] break-words'>Male Victim</p>
							</div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-4 h-4 rounded-3xl bg-gray-300 flex-none' style={{ backgroundColor: 'rgba(181, 226, 140, 0.8)' }}></div>
							<div className='ml-2 flex-grow'>
								<p className='text-[16px] break-words'>Relative Low Crime Rate</p>
							</div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-6 h-6 rounded-3xl bg-gray-300 flex-none' style={{ backgroundColor: 'rgba(241, 211, 87, 0.8)' }}></div>
							<div className='ml-2 flex-grow'>
								<p className='text-[16px] break-words'>Relative Medium Crime Rate</p>
							</div>
						</div>
						<div className='flex items-center mb-2'>
							<div className='w-8 h-8 rounded-3xl bg-gray-300 flex-none' style={{ backgroundColor: 'rgba(253, 156, 115, 0.8)' }}></div>
							<div className='ml-2 flex-grow'>
								<p className='text-[16px] break-words'>Relative High Crime Rate</p>
							</div>
						</div>
					</>
				))}
		</div>
	);
};

const Map = ({ crimes, setCrimes, settings, setSettings }) => {
	const mappedCrimes = crimes.map((crime, i) => {
		return <Circle key={i} center={[crime.LAT, crime.LON]} radius={100} pathOptions={{ color: colorMap[crime.CrmCd] }} />;
	});

	const mappedGeoJSON = geoJSONData.features.map((feature, i) => {
		return <GeoJSON key={i} data={feature} style={{ color: 'grey', weight: 2 }} />;
	});

	const clusterMarkerGenerator = (cluster) => {
		const markers = cluster.getAllChildMarkers();
		const maleCount = markers.filter((marker) => marker.options.gender === 'M').length;
		const femaleCount = markers.filter((marker) => marker.options.gender === 'F').length;
		const totalCount = maleCount + femaleCount;

		const totalWidth = 100;

		const pinkWidth = totalCount > 0 ? (femaleCount / totalCount) * totalWidth : 50;
		const blueWidth = totalWidth - pinkWidth;

		const pieChartStyle = {
			display: 'flex',
			'justify-content': 'center',
			'align-items': 'center',
			width: '40px',
			height: '40px',
			'border-radius': '50%',
			overflow: 'hidden',
			background: `conic-gradient(#AA336A 0% ${pinkWidth}%, blue ${pinkWidth}% ${pinkWidth + blueWidth}%)`,
		};

		const childCount = cluster.getChildCount();

		let c = ' c-';
		if (childCount / crimes.length < 0.04) {
			c += 'small';
		} else if (childCount / crimes.length < 0.075) {
			c += 'medium';
		} else {
			c += 'large';
		}

		const iconHtml = `
  						<div class='${c}'>
  						    <div style="${Object.entries(pieChartStyle)
								.map(([key, value]) => `${key}: ${value};`)
								.join('')}"><span style="color: white; font-weight: 900;">${childCount}</span>
						    </div>
  						 </div>
						`;

		return leaflet.divIcon({
			html: iconHtml,
			className: 'c-cont',
			iconSize: leaflet.point(40, 40, true),
		});
	};

	return (
		<>
			<MapContainer
				center={[34.122, -118.437]}
				zoom={11.2}
				style={{ height: '100%', width: '100%', borderRadius: '0.375rem' }}
				minZoom={11.2}
				maxBounds={bounds}
			>
				<TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; OpenStreetMap contributors' />
				{mappedGeoJSON}
				{settings.isOverview ? (
					<MarkerClusterGroup
						iconCreateFunction={clusterMarkerGenerator}
						polygonOptions={{
							color: '#008E8A',
							weight: 3,
							dashArray: '8',
							fillOpacity: 0.4,
						}}
						showCoverageOnHover
						singleMarkerMode={false}
					>
						{crimes.map((crime, index) => (
							<Circle
								key={index}
								center={[crime.LAT, crime.LON]}
								radius={100}
								fillColor={`${colorMap[crime.CrmCd]}`}
								fillOpacity={0.5}
								pathOptions={{ color: colorMap[crime.CrmCd], gender: crime.VictSex }}
							>
								<Popup>
									<div className='mb-1'>Crime: {crime.CrmCdDesc}</div>
									<div className='mb-1'>Age: {crime.VictAge}</div>
									<div className='mb-1'>Gender: {crime.VictSex}</div>
									<div className='mb-1'>Weapon: {crime.WeaponDesc}</div>
								</Popup>
							</Circle>
						))}
					</MarkerClusterGroup>
				) : (
					mappedCrimes
				)}
			</MapContainer>
			<Legend colorMap={colorMap} isOverview={settings.isOverview} />
		</>
	);
};

export default Map;
