import { PostCard } from "../PostCard"
import './styles.css'
export const Posts = ({ posts }) => (
    <div className="posts">
    {posts.map(post => (
        <PostCard
            key={post.id}
            // post={post}
            title={post.title}
            id={post.id}
            feijao={post.feijao}
            body={post.body}
        />
    ))}
</div> 
);