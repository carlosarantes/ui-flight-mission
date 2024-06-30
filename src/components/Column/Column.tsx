import React, { useMemo } from "react"

import Card from '@/components/Card/Card'

import { TColumnProps } from './Column.props'

import * as S from './Column.styles'
import { SortableContext, useSortable } from "@dnd-kit/sortable"

const Column: React.FC<TColumnProps> = ({ cards, title, id }) => {

    const { setNodeRef } = useSortable({
        id: id,
        data: {
            type: "Column",
            column: {
                id,
                cards, 
                title
            }
        },
        disabled: true
    })

    const cardsIds = useMemo(() => {
        return cards?.map((card) => card.id) || []
    }, [cards])

    return <S.ColumnContainer 
    ref={setNodeRef}
    >
        <S.ColumnTitle>{title} ({(cards || [])?.length})</S.ColumnTitle>
        <S.CardsBucket>
            <SortableContext items={cardsIds}>
                {cards?.map((card, i) => {
                    return <Card {...card} key={`card-${i}`} />
                })}         
            </SortableContext>
        </S.CardsBucket>
    </S.ColumnContainer>
}

export default Column