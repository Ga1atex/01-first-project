export default function Posts() {
  return (
    <section className="posts">
      <h2 className="posts__title">My Posts</h2>
      <div className="posts__new-post">
        <textarea className="posts__textarea" name="" id="" cols="30" rows="10" placeholder="your news..."></textarea>
        <button className="posts__btn" type="submit">Send</button>
      </div>
      <article className="posts__article">
        Hey, why nobody
      </article>
    </section>
  )
}
