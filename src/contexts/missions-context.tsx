import { TCardProps } from '@/components/Card/Card.props'
import { TColumnProps } from '@/components/Column/Column.props'
import Modal from '@/components/Modal/Modal'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cards, columns } from '@/mocks/init-data'

import React, {
    PropsWithChildren,
    createContext,
    useRef,
    useState,
  } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

  type TMissionsContext = {
    setisAddModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
    setisDeleteModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
    myColumns: TColumnProps[]
    myCards: TCardProps[]
    onDragStart: (ev: DragStartEvent) => void
    onDragEnd: (ev: DragEndEvent) => void
    onDragOver: (ev: DragOverEvent) => void
    deleteCard?: (card: TCardProps) => void
  }
  
  export const MissionsContext = createContext<TMissionsContext>({ 
    myCards: [], 
    myColumns: [],
    onDragEnd: ({}) => {},
    onDragOver: ({}) => {},
    onDragStart: ({}) => {},
})
 
const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 8px 0;
    `

const Label = styled.label`
    margin-bottom: 4px;
`

const Input = styled.input`
    outline: none;
    border: 2px #e6e8ec solid;
    font-size: 16px;
    padding: 8px;
`

const Textarea = styled.textarea`
    outline: none;
    border: 2px #e6e8ec solid;
    font-size: 16px;
    padding: 8px;
    resize:none;
`

const ValidationError = styled.span`
    font-size: 14px;
    color: #dc1e1e;
    font-weight: 700;
    margin-top: 4px;
`

const DeletionDisclaimer = styled.p``

  export const MissionsProvider = ({ children }: PropsWithChildren) => {
    const [isAddModalVisible, setisAddModalVisible] = useState(false)
    const [isDeleteModalVisible, setisDeleteModalVisible] = useState(false)
    const [myColumns, setMyColumns] = useState(columns)
    const [myCards, setMyCards] = useState<TCardProps[]>(cards)
    const cardDelRef = useRef<TCardProps>()

    const {
        register,
        getValues,
        formState: { errors },
      } = useForm<Pick<TCardProps, 'title' | 'description'>>({
        mode: 'onChange'
      })

    const onDragStart = (ev: DragStartEvent) => {
        if(ev.active.data.current?.type === 'Card') {
         //   setActiveCard(ev.active.data.current?.card)
            return
        }
    }

    const onDragEnd = (ev: DragEndEvent) => {
        const { active, over } = ev
        if(!over) return

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        setMyColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId)

            const overColumnIndex = columns.findIndex((col) => col.id === overId)

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        })
    }

    const onDragOver = (ev: DragOverEvent) => {
        const { active, over } = ev
        if(!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return;

        const isActiveACard = active.data.current?.type == 'Card'
        const isOverACard = active.data.current?.type == 'Card'

        if (!isActiveACard) return

        if(isActiveACard && isOverACard) {
            setMyCards((cards) => {
                const activeIndex = cards.findIndex((t) => t.id === activeId);
                const overIndex = cards.findIndex((t) => t.id === overId);
        
                if (cards[activeIndex].columnId != cards[overIndex].columnId) {
                  // Fix introduced after video recording
                  cards[activeIndex].columnId = cards[overIndex].columnId;
                  return arrayMove(cards, activeIndex, overIndex - 1);
                }
        
                return arrayMove(cards, activeIndex, overIndex);
            });
        }

        const isOverAColumn = active.data.current?.type == 'Column'

        if(isActiveACard && isOverAColumn) {
            setMyCards((cards) => {
                const activeIndex = cards.findIndex((t) => t.id === activeId);
        
                cards[activeIndex].columnId = overId as string;
                return arrayMove(cards, activeIndex, activeIndex);
              });
        }
    }

    const deleteCard = (card: TCardProps) => {
        cardDelRef.current = card
        setisDeleteModalVisible(true)
    }

    const handleCardDeletionConfirm = () => {
        setMyCards(myCards.filter((card) => card.id != cardDelRef.current?.id))
        cardDelRef.current = undefined
        setisDeleteModalVisible(false)
    }

    function generateId() {
        /* Generate a random number between 0 and 10000 */
        return Math.floor(Math.random() * 10001);
    }

    const handleCardAddConfirm = () => {
        const newCard : TCardProps = {
            ...getValues(),
            id: generateId().toString(),
            columnId: myColumns[0].id,
            status: 'pre-flight',
        }

        setMyCards( (cards)=> [...cards,newCard])
        setisAddModalVisible(false)
    }

    return (
      <MissionsContext.Provider
        value={{
            setisAddModalVisible,
            setisDeleteModalVisible,
            myColumns,
            myCards,
            onDragStart,
            onDragEnd,
            onDragOver,
            deleteCard

        }}
      >
        {isAddModalVisible && <Modal
            boldTitle="ADD"
            additionalTitle="Mission"
            mainActionTitle="Create"
            mainActionFn={handleCardAddConfirm} 
            cancelActionFn={() => setisAddModalVisible(false)}
        >
            <>
                <FieldWrapper>
                    <Label>Title*</Label>
                    <Input type='text' {...register("title", { required: true })} />
                    {errors.title && <ValidationError>This field is required</ValidationError>}
                </FieldWrapper>

                <FieldWrapper>
                    <Label>Description</Label>
                    <Textarea {...register("description")} ></Textarea>
                </FieldWrapper>
            </>
        </Modal>}
        
        {isDeleteModalVisible && <Modal
            boldTitle="Delete"
            additionalTitle="Mission"
            mainActionTitle="Delete"
            mainActionFn={handleCardDeletionConfirm}
            cancelActionFn={() => setisDeleteModalVisible(false)}
        >
            <DeletionDisclaimer>Are you sure? You can't undo this action afterwards.</DeletionDisclaimer>
        </Modal>}

        {children}
      </MissionsContext.Provider>
    )
  }
  
  export default MissionsProvider
  