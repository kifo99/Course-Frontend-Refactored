import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Backdrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/Modal";
import Input from "../../Form/Input/Input";
import FilePicker from "../../Form/Input/FilePicker";
import Image from "../../Image/Image";
import { required, length } from "../../../util/validators";
import { generateBase64FromImage } from "../../../util/image";

const POST_FORM_TEMPLATE = {
  title: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  content: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
};

export default function FeedEdit({
  editing,
  selectedPost,
  onCancelEdit,
  onFinishEdit,
  loading,
}) {
  const [postForm, setPostForm] = useState(POST_FORM_TEMPLATE);
  const [formIsValid, setFormIsValid] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Sync form state when editing or selectedPost changes
  useEffect(() => {
    if (editing && selectedPost) {
      setPostForm({
        title: {
          ...POST_FORM_TEMPLATE.title,
          value: selectedPost.title,
          valid: true,
        },
        image: {
          ...POST_FORM_TEMPLATE.image,
          value: selectedPost.imagePath,
          valid: true,
        },
        content: {
          ...POST_FORM_TEMPLATE.content,
          value: selectedPost.content,
          valid: true,
        },
      });
      setFormIsValid(true);
    }
  }, [editing, selectedPost]);

  const postInputChangeHandler = useCallback((input, value, files) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64) => setImagePreview(b64))
        .catch(() => setImagePreview(null));
    }

    setPostForm((prevPostForm) => {
      let isValid = true;
      for (const validator of prevPostForm[input].validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevPostForm,
        [input]: {
          ...prevPostForm[input],
          value: files ? files[0] : value,
          valid: isValid,
        },
      };

      // Check overall form validity
      const formIsValid = Object.keys(updatedForm).every(
        (key) => updatedForm[key].valid
      );

      setFormIsValid(formIsValid);

      return updatedForm;
    });
  }, []);

  const inputBlurHandler = useCallback((input) => {
    setPostForm((prevPostForm) => ({
      ...prevPostForm,
      [input]: {
        ...prevPostForm[input],
        touched: true,
      },
    }));
  }, []);

  const cancelPostChangeHandler = () => {
    setPostForm(POST_FORM_TEMPLATE);
    setFormIsValid(false);
    onCancelEdit();
  };

  const acceptPostChangeHandler = () => {
    const post = {
      title: postForm.title.value,
      image: postForm.image.value,
      content: postForm.content.value,
    };

    onFinishEdit(post);

    setPostForm(POST_FORM_TEMPLATE);
    setFormIsValid(false);
    setImagePreview(null);
  };

  if (!editing) return null;

  return (
    <>
      <Backdrop onClick={cancelPostChangeHandler} />
      <Modal
        title="New Post"
        acceptEnabled={formIsValid}
        onCancelModal={cancelPostChangeHandler}
        onAcceptModal={acceptPostChangeHandler}
        isLoading={loading}
      >
        <form>
          <Input
            id="title"
            label="Title"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler("title")}
            valid={postForm.title.valid}
            touched={postForm.title.touched}
            value={postForm.title.value}
          />
          <FilePicker
            id="image"
            label="Image"
            control="input"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler("image")}
            valid={postForm.image.valid}
            touched={postForm.image.touched}
          />
          <div className="new-post__preview-image">
            {!imagePreview && <p>Please choose an image.</p>}
            {imagePreview && <Image imageUrl={imagePreview} contain left />}
          </div>
          <Input
            id="content"
            label="Content"
            control="textarea"
            rows="5"
            onChange={postInputChangeHandler}
            onBlur={() => inputBlurHandler("content")}
            valid={postForm.content.valid}
            touched={postForm.content.touched}
            value={postForm.content.value}
          />
        </form>
      </Modal>
    </>
  );
}

FeedEdit.propTypes = {
  editing: PropTypes.bool.isRequired,
  selectedPost: PropTypes.object,
  onCancelEdit: PropTypes.func.isRequired,
  onFinishEdit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
