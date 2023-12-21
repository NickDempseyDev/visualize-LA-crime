import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function GET(request) {
	try {
		const db = await open({
			filename: 'databasenew.db',
			driver: sqlite3.Database,
		});

		const query = `PRAGMA index_list(crimes);`;

		const res = await db.all(query);

		console.log(res.length);

		await db.close();

		return NextResponse.json({ data: '' });
	} catch (error) {
		console.error(error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
