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
    padding: 16px 20px;
    opacity: ${({ isDragging }) => isDragging ? '0.5' : '1' };

    & > div:first-child {
        height: ${({ isDragging }) => isDragging ? '33px' : 'auto' };
        background: ${ ({ isDragging }) => isDragging ? '#c1c1c1' : 'none' };
        border-radius: 4px;
    }
`

export const CardHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px #d8d8d8 solid;
    padding-bottom: 8px;
    margin-bottom: 16px;
`

export const Title = styled.h3`
    font-weight: 600;
    font-size: 18px;
`

export const CardContent = styled.div`
    margin-top: 8px;
`

export const Paragraph = styled.p`
    font-weight: 400;
    font-size: 14px;
`

export const HeadingButton = styled.button`
    background: none;
    border: none;
`