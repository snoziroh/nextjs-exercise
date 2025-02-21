import Post from '@/app/ui/components/posts/post';
import { notFound } from 'next/navigation';
import { getPostById } from '@/app/lib/data';

export default async function Posts({ params }: { params: { id: string } }) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1 className='text-4xl font-bold mb-4 text-purple-800'>Post</h1>
            <Post {...post} />
        </div>
    );
}