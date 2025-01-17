import PropTypes from "prop-types";
import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";

export default function ErrorHandler({ error, onDismissError }) {
  if (!error) return null;

  const { message } = error;

  return (
    <>
      <Backdrop onClick={onDismissError} />
      <Modal
        title="An Error Occurred"
        onCancelModal={onDismissError}
        onAcceptModal={onDismissError}
        acceptEnabled
      >
        <p>{message}</p>
      </Modal>
    </>
  );
}

ErrorHandler.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  onDismissError: PropTypes.func,
};
