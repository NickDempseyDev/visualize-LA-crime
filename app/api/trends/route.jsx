import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { trendEnum } from '../../trends';

export async function GET(request) {
	try {
		const startDate = request.nextUrl.searchParams.get(['startDate']);
		const endDate = request.nextUrl.searchParams.get(['endDate']);
		const trend = request.nextUrl.searchParams.get(['trend']);

		const db = await open({
			filename: 'databasenew.db',
			driver: sqlite3.Database,
		});

		const query = trendEnum[trend];
		const rows = await db.all(query, [startDate, endDate]);

		console.log(rows.length);

		await db.close();

		return NextResponse.json({ data: rows });
	} catch (error) {
		console.error(error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
