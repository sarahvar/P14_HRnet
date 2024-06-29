import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div id="modal" className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-header">
          <button onClick={onClose} className="close-button">
            <span className="close-icon">×</span>
          </button>
        </div>
        <div className="modal-content">
          {/* Content */}
          <div className="modal-message">
            {children} {/* Children will render "Employee Created!" */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

