import { PropsWithChildren } from 'react'

import * as S from './Modal.styles'

import { TModalProps } from './Modal.props'
import TimesIcon from '@/icons/TimesIcon'

const Modal: React.FC<PropsWithChildren<TModalProps>> = (props) => {
    return <S.Overlay>
        <S.ModalCard>
            <S.ModalHeading>
                <h3><strong>{props.boldTitle}</strong> - {props.additionalTitle}</h3>
                <S.CloseButton onClick={props?.cancelActionFn}>
                    <TimesIcon width={20} height={20} fill="#999999" />
                </S.CloseButton>
            </S.ModalHeading>
            <>
                {props.children}
            </>
            <S.ActionButtons>
                <S.CancelButton onClick={props?.cancelActionFn}>Cancel</S.CancelButton>
                <S.MainButton onClick={props.mainActionFn}>{props.mainActionTitle}</S.MainButton>
            </S.ActionButtons>
        </S.ModalCard>
    </S.Overlay>
}

export default Modal