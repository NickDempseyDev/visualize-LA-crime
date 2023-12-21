'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';
import Settings from './components/Settings';
import HeatMap from './components/HeatMap';
import StackedBarChart from './components/StackedBarchart';
import Loading from './components/Loading';
const formattedDate = (date) => new Date(date).toISOString().split('T')[0];
export default function Home() {
	const [settings, setSettings] = useState({
		startDate: '2023-01-01',
		endDate: '2023-12-31',
		isOverview: true,
		limit: 10000,
		selectedCrimes: [{ label: 'BURGLARY', value: '310' }],
	});

	const [crimes, setCrimes] = useState([]);
	const [trends1, setTrends1] = useState([]);
	const [trends2, setTrends2] = useState([]);
	const [isLoadingCrimes, setIsLoadingCrimes] = useState(false);
	const [isLoadingTrends, setIsLoadingTrends] = useState(false);

	useEffect(() => {
		if (settings.selectedCrimes.length !== 0) {
			setIsLoadingCrimes(true);
			axios
				.get(
					`/api/crime?crimes=${settings.selectedCrimes.map((crime) => crime.value).join(';')}&startDate=${settings.startDate}&endDate=${
						settings.endDate
					}&limit=${settings.limit}`
				)
				.then((response) => {
					if (response.data.data === '') return setCrimes([]);
					setCrimes(response.data.data);
				})
				.finally(() => {
					setIsLoadingCrimes(false);
				});
		} else {
			setCrimes([]);
		}
	}, [settings.selectedCrimes, settings.startDate, settings.endDate, settings.limit]);

	useEffect(() => {
		setIsLoadingTrends(true);
		axios
			.get(`/api/trends?startDate=${settings.startDate}&endDate=${settings.endDate}&trend=CRIME_BY_DAYHOUR`)
			.then((response) => {
				setTrends1(response.data.data);
			})
			.finally(() => {
				setIsLoadingTrends(false);
			});

		setIsLoadingTrends(true);
		axios
			.get(`/api/trends?startDate=${settings.startDate}&endDate=${settings.endDate}&trend=PREMISE_WEAPON`)
			.then((response) => {
				setTrends2(response.data.data);
			})
			.finally(() => {
				setIsLoadingTrends(false);
			});
	}, [settings.startDate, settings.endDate]);

	return (
		<main className='flex h-screen flex-col items-center justify-between p-4 gap-4'>
			<div className='flex justify-between w-full items-center'>
				<h1 className='text-4xl font-bold'>Los Angeles Crime Data</h1>
				<h2 className='text-sm flex flex-row gap-8'>
					<div className='flex flex-row gap-2 w-full items-center'>
						<label htmlFor='startDate'>From</label>
						<input
							className='text-black rounded-sm p-2'
							type='date'
							id='startDate'
							name='startDate'
							value={settings.startDate}
							onChange={(e) => setSettings({ ...settings, startDate: formattedDate(e.target.value) })}
						/>
					</div>
					<div className='flex flex-row gap-2 w-full items-center'>
						<label htmlFor='endDate'>To</label>
						<input
							className='text-black rounded-sm p-2'
							type='date'
							id='endDate'
							name='endDate'
							value={settings.endDate}
							onChange={(e) => setSettings({ ...settings, endDate: formattedDate(e.target.value) })}
						/>
					</div>
				</h2>
				<h2 className='text-2xl'>Data Visualisation Project</h2>
			</div>
			<div className='grid grid-cols-8 grid-rows-10 gap-4 w-full h-full overflow-hidden'>
				<div className='col-span-4 row-span-full bg-slate-800'>
					{!isLoadingCrimes ? <Map crimes={crimes} setCrimes={setCrimes} settings={settings} setSettings={setSettings} /> : <Loading />}
				</div>
				<div className='col-span-4 row-span-4 col-start-5 row-start-3 bg-slate-800 rounded-lg h-full overflow-hidden'>
					{trends1.length > 0 && !isLoadingTrends ? <HeatMap data={trends1} /> : <Loading />}
				</div>
				<div className='col-span-4 row-span-4 col-start-5 row-start-7 bg-slate-800 rounded-lg h-full overflow-hidden'>
					{trends2.length > 0 && !isLoadingTrends ? <StackedBarChart data={trends2} /> : <Loading />}
				</div>
				<div className='col-span-4 row-span-2 col-start-5'>
					<Settings settings={settings} setSettings={setSettings} />
				</div>
			</div>
		</main>
	);
}
