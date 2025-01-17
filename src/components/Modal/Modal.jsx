import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import "./Modal.css";

export default function Model({
  title,
  acceptEnabled,
  isLoading,
  onCancelModal,
  onAcceptModal,
  children,
}) {
  const content = (
    <div className="modal">
      <header className="modal__header">
        <h1>{title}</h1>
      </header>
      <div className="modal__content">{children}</div>
      <div className="modal__actions">
        <Button design="danger" mode="flat" onClick={onCancelModal}>
          Cancel
        </Button>
        <Button
          mode="raised"
          onClick={onAcceptModal}
          disabled={!acceptEnabled}
          loading={isLoading}
        >
          Accept
        </Button>
      </div>
    </div>
  );

  const rootElement = document.getElementById("modal-root");

  return rootElement ? ReactDOM.createPortal(content, rootElement) : null;
}

Model.propTypes = {
  title: PropTypes.string,
  acceptEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onCancelModal: PropTypes.func,
  onAcceptModal: PropTypes.func,
  children: PropTypes.node,
};
