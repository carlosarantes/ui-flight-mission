import styled from "styled-components";

export const CardContainer = styled.div<{ isDragging?: boolean; status?: string }>`
  
    --pre-flight: #fa8f2c;
    --flight: #467aff;
    --post-flight: #49cd80;
    --default: #000;


    background: white;
    color: #0c1f45;
    margin: 8px;
    border-radius: 6px;
    cursor: pointer;
    min-height: 80px;
    border-top: 2px ${({ status }) => `var(--${status || 'default'})`} solid;
    border-bottom: 2px ${({ status }) => `var(--${status || 'default'})`} solid;
    border-right: 2px ${({ status }) => `var(--${status || 'default'})`} solid;
    border-left: 7px ${({ status }) => `var(--${status || 'default'})`} solid;
    padding: 16px;
`

export const CardHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px #d8d8d8 solid;
    padding-bottom: 8px;
`

export const Title = styled.h3``

export const CardContent = styled.div`
    margin-top: 8px;
`

export const Paragraph = styled.p``

export const HeadingButton = styled.button`
    background: none;
    border: none;
`