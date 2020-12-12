import React from 'react';
import styled from 'styled-components';

import AllModal from '../Modal/AllModal';

const MainContainer = styled.div`
    max-height: 400px;
`

const ModalMessage = (props) => {


    return (
        <AllModal
            modalBoolean={true}
            showModal={props.modalHandler}
            modalTitle={props.modalTitile}
            small={true}>
            <MainContainer>
                {props.children}
            </MainContainer>
        </AllModal>
    )
};

export default ModalMessage;