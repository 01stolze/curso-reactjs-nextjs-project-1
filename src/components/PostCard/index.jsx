import './styles.css'
export const PostCard = ({id, feijao, title, body}) => {
    return (
        <div className="post">
            <img src={feijao} alt={title} />
            <div className="post-content">
                <h1>{title} {id}</h1>
                <p>{body}</p>
            </div>
        </div>
    )
}