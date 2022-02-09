// import styles from './Post.module.css'

export default function Post(props) {
  return (
      <article className="posts__article">
        {props.message} {props.likesCount} likes
      </article>
  );
}
