// import styles from './Post.module.css'

type PropsType = {
  message: string
  likesCount: number
  id: number
}

const Post: React.FC<PropsType> = ({ message, likesCount }) => {
  return (
    <article className="posts__article">
      <div className="posts__likes">
        {message} <strong>{likesCount}</strong>  likes
      </div>

    </article>
  );
}

export default Post;
