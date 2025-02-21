import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function connectToDB() {
    const client = await pool.connect();

    try {
        if (client) {
            console.log('Connected to DB');
            return client;
        }
    } catch (error) {
        console.error('Error connecting to DB', error);
    }
}

export async function getPosts() {
    try {
        const data = await pool.query('SELECT * FROM posts ORDER BY date DESC');
        return data.rows;
    } catch (error) {
        console.error('Error getting posts', error);
    }
}

export async function getPostById(id: string) {
    try {
        const data = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return data.rows[0];
    } catch (error) {
        console.error('Error getting post by id', error);
    }
}

export async function createPost(title: string, content: string) {
    try {
        const data = await pool.query('INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
        return data.rows[0];
    } catch (error) {
        console.error('Error creating post', error);
    }
}