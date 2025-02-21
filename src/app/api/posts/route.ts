import { Pool } from 'pg';
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth.config';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});


export async function GET() {
    try {
        const posts = (await pool.query('SELECT * FROM posts ORDER BY date DESC LIMIT 10')).rows;
        return NextResponse.json({ posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const title = searchParams.get('title');
    const content = searchParams.get('content');
    const date = searchParams.get('date');
    const author = searchParams.get('author');

    try {
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const post = await pool.query('INSERT INTO posts (id, author, title, content, date) VALUES ($1, $2, $3, $4, $5)', [id, author, title, content, date]);
        return NextResponse.json({ message: 'Post created successfully', post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}