import P from 'prop-types'
import { PostCard } from '../PostCard'
import './styles.css'

// Cannot read properties of undefined ( reading map)
export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map((post) => (
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
)

Posts.defaultProps = {
  posts: [],
}

Posts.propTypes = {
  posts: P.array,
}
