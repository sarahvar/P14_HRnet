import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  
  return (
    <div id="modal" className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-container">
        <div className="modal-content">
          {/* <!--Content--> */}
          <div className="content">{children}</div>
          {/* <!--Footer--> */}
          <div className="footer">
            <button onClick={onClose} className="close-button">
              <span className="close-icon">x</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
