import React from 'react';

const ShareModal = () => {
  return (
    <div
      className="modal fade"
      id="shareModal"
      tabIndex="-1"
      aria-labelledby="shareModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center rounded-4">
          <div className="modal-body py-4">
            <h5 className="mb-4 fw-bold">Share</h5>
            <div className="d-flex flex-wrap justify-content-center gap-5 mb-4">
              <ShareButton icon="bi bi-link-45deg" label="Copy Link" />
              <ShareButton icon="bi bi-whatsapp" label="WhatsApp" />
              <ShareButton icon="bi bi-facebook" label="Facebook" />
              <ShareButton icon="bi bi-messenger" label="Messenger" />
              <ShareButton icon="bi bi-twitter" label="Twitter" />
              <ShareButton icon="bi bi-instagram" label="Instagram" />
              <ShareButton icon="bi bi-skype" label="Skype" />
              <ShareButton icon="bi bi-chat-dots" label="Message" />
            </div>
            <button
              type="button"
              className="btn btn-light w-100 rounded-pill"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShareButton = ({ icon, label }) => (
  <div className="d-flex flex-column align-items-center" style={{ width: '60px' }}>
    <div
      className="bg-light rounded-circle d-flex justify-content-center align-items-center mb-1"
      style={{ width: '45px', height: '45px' }}
    >
      <i className={`${icon} fs-5`}></i>
    </div>
    <small>{label}</small>
  </div>
);

export default ShareModal;
