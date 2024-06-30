import React, { useContext, useMemo, useState } from "react"

import Column from '@/components/Column/Column'

import { TColumnProps } from "../Column/Column.props"

import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'

import * as S from './IndexPage.styles'
import { TCardProps } from "../Card/Card.props"

import { MissionsContext } from '@/contexts/missions-context'

const IndexPage: React.FC = () => {
    const [activeCart, setActiveCard] = useState<TCardProps>()
    const { 
        setisAddModalVisible, 
        setisDeleteModalVisible, 
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
        <div>
            <h4>Flight Mission COntrol Tool</h4>
            <button onClick={() => setisAddModalVisible?.(true)}>Add Mission</button>
        </div>
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
    </S.MainContainer>
}

export default IndexPage