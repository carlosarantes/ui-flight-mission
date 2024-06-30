import React, { useContext } from "react"

import { TCardProps } from './Card.props'

import * as S from './Card.styles'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import TrashIcon from '@/icons/TrashIcon'
import { MissionsContext } from "@/contexts/missions-context"

const Card: React.FC<TCardProps> = (card) => {

    const { deleteCard } = useContext(MissionsContext)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: card.id,
        data: {
            type: "Card",
            card: card
        }
    })

    const styles = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if(isDragging) {
        return <S.CardContainer ref={setNodeRef}></S.CardContainer>
    }

    return <S.CardContainer 
                ref={setNodeRef} 
                style={styles} 
                {...attributes} 
                {...listeners}
                status={card.status}
                >
            <S.CardHeading>
                <S.Title>{card.title}</S.Title>
                <S.HeadingButton onClick={() => deleteCard?.(card) }>
                    <TrashIcon  fill="#222222" width={20} height={20}/>
                </S.HeadingButton>
            </S.CardHeading>
            <S.CardContent>
                <S.Paragraph>{card.description}</S.Paragraph>
            </S.CardContent>
        </S.CardContainer>
}

export default Card