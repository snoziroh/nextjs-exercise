import { posts } from '../../lib/placeholder-data';
import Post from '@/app/ui/components/posts/post';

export default function Posts() {
    return (
        <div>
            <h1 className="text-purple-800 text-4xl font-bold mb-4">Posts</h1>
                {posts.map((post) => <Post key={post.id} {...post} />)}
        </div>
    );
}