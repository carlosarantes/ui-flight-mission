import React, { useContext, useMemo, useState } from "react"

import Column from '@/components/Column/Column'


import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

import * as S from './IndexPage.styles'

import { MissionsContext } from '@/contexts/missions-context'

const IndexPage: React.FC = () => {
    // const [activeCart, setActiveCard] = useState<TCardProps>()
    const { 
        setisAddModalVisible, 
        myCards, 
        myColumns,
        onDragEnd,
        onDragOver,
        onDragStart
    } = useContext(MissionsContext)

    const columnsId = useMemo(() => {
        return myColumns.map(column => column.id)
    }, [myColumns] )

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 20
        }
    }))

    return <S.MainContainer>
        <S.HeadingContainer>
            <S.Heading>Flight Mission Control Tool</S.Heading>
            <S.AddButton onClick={() => setisAddModalVisible?.(true)}>ADD MISSION</S.AddButton>
        </S.HeadingContainer>
        <S.KanBanContainer>
            <DndContext sensors={sensors} 
                onDragStart={onDragStart} 
                onDragEnd={onDragEnd} 
                onDragOver={onDragOver}>
                    <SortableContext items={columnsId}>
                    {
                        myColumns.map((column, i) => {
                            return (<Column 
                                        {...column} 
                                        cards={myCards.filter(card => card.columnId == column.id)} 
                                        key={`column-${i}`} />)
                        })
                    }
                    </SortableContext>
            </DndContext>
        </S.KanBanContainer>
    </S.MainContainer>
}

export default IndexPage