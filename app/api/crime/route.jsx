import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function GET(request) {
	try {
		const crimes = request.nextUrl.searchParams.get(['crimes']);
		const startDate = request.nextUrl.searchParams.get(['startDate']);
		const endDate = request.nextUrl.searchParams.get(['endDate']);
		const limit = request.nextUrl.searchParams.get(['limit']);

		if (crimes === '') {
			NextResponse.json({ data: '' });
		}

		if (!crimes) {
			return new NextResponse('crimes parameter is required', { status: 400 });
		}

		const db = await open({
			filename: 'databasenew.db',
			driver: sqlite3.Database,
		});

		const crimesMapped = crimes
			.split(';')
			.map((crime) => `CrmCd = ${crime}`)
			.join(' OR ');

		const query = `SELECT * FROM crimes WHERE ${crimesMapped} AND DATEOCC BETWEEN ? AND ? ORDER BY DATEOCC DESC LIMIT ${limit}`;
		const params = [startDate, endDate];

		const rows = await db.all(query, params);
		console.log(rows.length);

		await db.close();

		return NextResponse.json({ data: rows });
	} catch (error) {
		console.error(error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
