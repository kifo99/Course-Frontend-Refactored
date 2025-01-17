import "./Input.css";
import PropTypes from "prop-types";

export default function Input({
  label,
  id,
  control,
  valid,
  touched,
  type,
  value,
  required,
  placeholder,
  rows,
  onChange,
  onBlur,
}) {
  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      {control === "input" && (
        <input
          className={[
            !valid ? "invalid" : "valid",
            touched ? "touched" : "untouched",
          ].join(" ")}
          type={type}
          id={id}
          required={required}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(id, e.target.value, e.target.files)}
          onBlur={onBlur}
        />
      )}
      {control === "textarea" && (
        <textarea
          className={[
            !valid ? "invalid" : "valid",
            touched ? "touched" : "untouched",
          ].join(" ")}
          id={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          onBlur={onBlur}
        />
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  control: PropTypes.string,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
