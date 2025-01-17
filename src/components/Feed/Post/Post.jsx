import Button from "../../Button/Button";
import PropTypes from "prop-types";
import "./Post.css";

export default function Post({
  author,
  date,
  title,
  id,
  onStartEdit,
  onDelete,
}) {
  return (
    <article className="post">
      <header className="post__header">
        <h3 className="post__meta">
          Posted by {author} on {date}
        </h3>
        <h1 className="post__title">{title}</h1>
      </header>
      {/* <div className="post__image">
    <Image imageUrl={image} contain />
  </div>
  <div className="post__content">{content}</div> */}
      <div className="post__actions">
        <Button mode="flat" link={id}>
          View
        </Button>
        <Button mode="flat" onClick={onStartEdit}>
          Edit
        </Button>
        <Button mode="flat" design="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
}

Post.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  onStartEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
