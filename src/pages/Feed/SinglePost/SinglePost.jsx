import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "../../../components/Image/Image";
import "./SinglePost.css";

export default function SinglePost({ match }) {
  const [post, setPost] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const postId = match.params.postId;

      try {
        const res = await fetch(`URL/${postId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch status");
        }

        const resData = await res.json();
        setPost({
          title: resData.post.title,
          author: resData.post.creator.name,
          date: new Date(resData.post.createdAt).toLocaleDateString("en-US"),
          image: resData.post.image, // Ensure that you have an image URL in the API response
          content: resData.post.content,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [match.params.postId]); // This will re-run if postId changes

  return (
    <section className="single-post">
      <h1>{post.title}</h1>
      <h2>
        Created by {post.author} on {post.date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={post.image} />
      </div>
      <p>{post.content}</p>
    </section>
  );
}

SinglePost.propTypes = {
  match: PropTypes.object,
};
