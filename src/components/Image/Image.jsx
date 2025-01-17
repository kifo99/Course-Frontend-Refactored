import "./Image.css";
import PropTypes from "prop-types";

export default function Image({ imageUrl, contain = false, left = false }) {
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: contain ? "contain" : "cover",
        backgroundPosition: left ? "left" : "center",
      }}
    />
  );
}

Image.propTypes = {
  imageUrl: PropTypes.string,
  contain: PropTypes.bool,
  left: PropTypes.bool,
};
