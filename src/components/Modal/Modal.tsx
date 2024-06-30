import { PropsWithChildren } from 'react'

import * as S from './Modal.styles'

import { TModalProps } from './Modal.props'

const Modal: React.FC<PropsWithChildren<TModalProps>> = (props) => {
    return <S.Overlay>
        <S.ModalCard>
            <h3><strong>{props.boldTitle}</strong> - {props.additionalTitle}</h3>
            {props.children}
            <S.ActionButtons>
                <S.CancelButton>Cancel</S.CancelButton>
                <S.MainButton onClick={props.mainActionFn}>{props.mainActionTitle}</S.MainButton>
            </S.ActionButtons>
        </S.ModalCard>
    </S.Overlay>
}

export default Modal