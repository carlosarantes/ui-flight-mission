import styled from "styled-components";

export const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(25,25,25, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
`

export const ModalCard = styled.div`
    background: #ffffff;
    width: 450px;
    color: #0c1f45;
    padding: 20px 28px;
    border-radius: 6px;
`

export const ModalHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`

export const CloseButton = styled.button`
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
`

export const ActionButtons = styled.div`
    display: flex;
    justify-content: end;
`

export const CancelButton = styled.button`
    background: #e5e7eb;
    border: none;
    padding: 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    font-size: 16px;
    color: #01153d;
    cursor: pointer;
`

export const MainButton = styled.button`
    background: #334363;
    border: none;
    padding: 10px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 16px;
    color: #fcfdfd;
    cursor: pointer;
`

