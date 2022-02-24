// import styles from './Post.module.css'

type PropsType = {
  message: string
  likesCount: number
  id: number
}

const Post: React.FC<PropsType> = (props) => {
  return (
      <article className="posts__article">
        {props.message} {props.likesCount} likes
      </article>
  );
}

export default Post;
