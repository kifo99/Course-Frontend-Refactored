import Image from "./Image";
import PropTypes from "prop-types";
import "./Avatar.css";

export default function Avatar({ size, image }) {
  return (
    <div
      className="avatar"
      style={{ width: size + "rem", height: size + "rem" }}
    >
      <Image imageUrl={image} />
    </div>
  );
}

Avatar.propTypes = {
  size: PropTypes.number,
  image: PropTypes.string,
};
