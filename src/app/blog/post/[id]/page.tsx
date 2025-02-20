import { posts } from '@/app/lib/placeholder-data';
import Post from '@/app/ui/components/posts/post';

export default function Posts({params}: {params: {id: string}}) {
    const post = posts.find((post) => post.id === params.id);
    if (!post) {
        return <h1>Post not found</h1>;
    }
    return (
        <div>
            <h1 className='text-4xl font-bold mb-4 text-purple-800'>Post</h1>
            <Post {...post}/>
        </div>
    );
}