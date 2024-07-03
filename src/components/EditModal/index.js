import React from "react";
import "./index.css";

const EditModal = ({ isOpen, onClose, onSave, value, onChange }) => {
  // If the modal is not open, do not render anything
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        {/* Close button to close the modal */}
        <button className='close-button' onClick={onClose}>
          X
        </button>

        {/* Input field for editing the todo text */}
        <input
          type='text'
          value={value}
          onChange={onChange}
          className='modal-input'
        />

        {/* Save button to save the edited todo text */}
        <button className='save-button' onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditModal;
