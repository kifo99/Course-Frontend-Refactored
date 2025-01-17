import PropTypes from "prop-types";
import "./Input.css";

export default function FilePicker({
  id,
  label,
  valid,
  touched,
  onChange,
  onBlur,
}) {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        className={[
          !valid ? "invalid" : "valid",
          touched ? "touched" : "untouched",
        ].join(" ")}
        type="file"
        id={id}
        onChange={(e) => onChange(id, e.target.value, e.target.files)}
        onBlur={onBlur}
      />
    </div>
  );
}

FilePicker.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
