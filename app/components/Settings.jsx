'use client';

import Select from 'react-select';
import { crimeMap, colorMap } from '../data';

const Settings = ({ settings, setSettings }) => {
	const formattedDate = (date) => new Date(date).toISOString().split('T')[0];
	const options = Object.keys(crimeMap).map((crime) => ({ value: crimeMap[crime].CrmCd, label: crimeMap[crime].CrmCdDesc }));
	return (
		<div className='w-full h-full flex flex-row items-center gap-4 bg-slate-800 rounded-lg p-2'>
			<div className='flex text-2xl text-center border-r border-white pr-4 h-full items-center justify-center'>
				<h3>
					Map
					<br />
					Settings
				</h3>
			</div>
			<div className='w-2/6 h-full flex flex-col '>
				<label htmlFor='endDate'>Crimes:</label>
				<Select
					options={options}
					isMulti
					onChange={(v) => {
						console.log(v);
						setSettings({ ...settings, selectedCrimes: v });
					}}
					value={settings.selectedCrimes}
					closeMenuOnSelect={false}
					className='basic-multi-select'
					classNamePrefix='select'
					styles={{
						control: (provided) => ({
							...provided,
							width: '100%',
							maxHeight: '117px',
							overflow: 'auto',
							color: 'black',
						}),
						menu: (provided) => ({
							...provided,
							color: 'black',
						}),
						multiValue: (provided) => ({
							...provided,
							maxHeight: '30px',
							overflow: 'auto',
							color: 'black',
						}),
					}}
				/>
			</div>
			<div className='w-3/6 h-full flex flex-col gap-2'>
				<div className='flex flex-col'>
					<label htmlFor='toggleOverview'>Toggle Overview Mode:</label>
					<button
						id='toggleOverview'
						name='toggleOverview'
						onClick={() => setSettings({ ...settings, isOverview: !settings.isOverview })}
						className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${settings.isOverview ? 'bg-red-500' : ''}`}
					>
						{settings.isOverview ? 'On' : 'Off'}
					</button>
				</div>
				<div className='flex flex-col'>
					<label htmlFor='limit'>Number of Datapoints Loaded:</label>
					<input
						type='range'
						id='limit'
						name='limit'
						min='1'
						max='50000'
						step='1'
						value={settings.limit}
						onChange={(e) => setSettings({ ...settings, limit: e.target.value })}
					/>
					<span>{settings.limit}</span>
				</div>
			</div>
		</div>
	);
};

export default Settings;
