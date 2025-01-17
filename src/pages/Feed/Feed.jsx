import { useState, useEffect, useCallback } from "react";
import FeedEdit from "../../components/Feed/FeedEdit/FeedEdit";
import Post from "../../components/Feed/Post/Post";
import Paginator from "../../components/Paginator/Paginator";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import Input from "../../components/Form/Input/Input";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";

export default function Feed() {
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [editPost, setEditPost] = useState(null);
  const [status, setStatus] = useState("");
  const [postPage, setPostPage] = useState(1);
  const [postsLoading, setPostsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("URL");
        if (response.status !== 200)
          throw new Error("Failed to fetch user status.");
        const resData = await response.json();
        setStatus(resData.status);
      } catch (err) {
        setError(err);
      }
    };

    fetchStatus();
    loadPosts(); // Load posts initially
  }, []);

  const loadPosts = useCallback(
    async (direction) => {
      if (direction) {
        setPostsLoading(true);
        setPosts([]);
      }

      let page = postPage;
      if (direction === "next") {
        page++;
        setPostPage(page);
      }
      if (direction === "previous") {
        page--;
        setPostPage(page);
      }

      try {
        const response = await fetch("URL");
        if (response.status !== 200) throw new Error("Failed to fetch posts.");
        const resData = await response.json();
        setPosts(resData.posts);
        setTotalPosts(resData.totalItems);
        setPostsLoading(false);
      } catch (err) {
        setError(err);
      }
    },
    [postPage]
  );

  const statusUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("URL", {
        method: "POST",
        body: JSON.stringify({ status }),
      });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Can't update status!");
      }
      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      setError(err);
    }
  };

  const newPostHandler = () => {
    setIsEditing(true);
  };

  const startEditPostHandler = (postId) => {
    const loadedPost = { ...posts.find((p) => p._id === postId) };
    setIsEditing(true);
    setEditPost(loadedPost);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditPost(null);
  };

  const finishEditHandler = async (postData) => {
    setEditLoading(true);
    const url = editPost ? "URL" : "URL"; // Adjust based on edit or new post

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
      });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Creating or editing a post failed!");
      }
      const resData = await response.json();
      const post = {
        _id: resData.post._id,
        title: resData.post.title,
        content: resData.post.content,
        creator: resData.post.creator,
        createdAt: resData.post.createdAt,
      };
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        if (editPost) {
          const postIndex = prevPosts.findIndex((p) => p._id === editPost._id);
          updatedPosts[postIndex] = post;
        } else if (prevPosts.length < 2) {
          updatedPosts.push(post);
        }
        return updatedPosts;
      });
      setIsEditing(false);
      setEditPost(null);
    } catch (err) {
      setError(err);
      setIsEditing(false);
      setEditPost(null);
      setEditLoading(false);
    }
  };

  const deletePostHandler = async (postId) => {
    setPostsLoading(true);
    try {
      const response = await fetch("URL", { method: "DELETE" });
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Deleting a post failed!");
      }
      const resData = await response.json();
      console.log(resData);
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== postId));
      setPostsLoading(false);
    } catch (err) {
      setError(err);
      setPostsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorHandler error={error} onHandle={errorHandler} />
      <FeedEdit
        editing={isEditing}
        selectedPost={editPost}
        loading={editLoading}
        onCancelEdit={cancelEditHandler}
        onFinishEdit={finishEditHandler}
      />
      <section className="feed__status">
        <form onSubmit={statusUpdateHandler}>
          <Input
            type="text"
            placeholder="Your status"
            control="input"
            onChange={(event) => setStatus(event.target.value)}
            value={status}
          />
          <Button mode="flat" type="submit">
            Update
          </Button>
        </form>
      </section>
      <section className="feed__control">
        <Button mode="raised" design="accent" onClick={newPostHandler}>
          New Post
        </Button>
      </section>
      <section className="feed">
        {postsLoading && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Loader />
          </div>
        )}
        {posts.length <= 0 && !postsLoading ? (
          <p style={{ textAlign: "center" }}>No posts found.</p>
        ) : null}
        {!postsLoading && (
          <Paginator
            onPrevious={() => loadPosts("previous")}
            onNext={() => loadPosts("next")}
            lastPage={Math.ceil(totalPosts / 2)}
            currentPage={postPage}
          >
            {posts.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                author={post.creator.name}
                date={new Date(post.createdAt).toLocaleDateString("en-US")}
                title={post.title}
                image={post.imageUrl}
                content={post.content}
                onStartEdit={() => startEditPostHandler(post._id)}
                onDelete={() => deletePostHandler(post._id)}
              />
            ))}
          </Paginator>
        )}
      </section>
    </>
  );
}
