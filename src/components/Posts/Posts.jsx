import Post from './Post/Post'

export default function Posts(props) {
  const postsElements = props.postsData.map(post => {
    return <Post message={post.message} id={post.id} likesCount={post.likesCount}/>;
  })

  return (
    <section className="profile__posts posts">
      <h2 className="posts__title">My Posts</h2>
      <div className="posts__new-post">
        <textarea className="posts__textarea" name="" id="" cols="30" rows="10" placeholder="your news..."></textarea>
        <button className="posts__btn" type="submit">Send</button>
      </div>
      {postsElements}
    </section>
  )
}
