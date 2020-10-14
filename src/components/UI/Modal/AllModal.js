import React from 'react'
import Modal from 'react-bootstrap/Modal'

const AllModal = ( props ) => (
    <Modal 
        show={props.modalBoolean}
        onHide={ () => props.showModal(false, false)}
        size={ props.small ? "sm" : "lg"}
        centered
        animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        {props.children}
        
      </Modal>
);

export default AllModal;