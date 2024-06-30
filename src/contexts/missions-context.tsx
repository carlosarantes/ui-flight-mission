import { TCardProps } from '@/components/Card/Card.props'
import { TColumnProps } from '@/components/Column/Column.props'
import Modal from '@/components/Modal/Modal'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cards, columns } from '@/mocks/init-data'

import React, {
    PropsWithChildren,
    createContext,
    useId,
    useRef,
    useState,
  } from 'react'
import { useForm } from 'react-hook-form'

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
        >
            <>
                <div>
                    <label>Title*</label>
                    <input type='text' {...register("title", { required: true })} />
                    {errors.title && <span>This field is required</span>}
                </div>

                <div>
                    <label>Description</label>
                    <textarea {...register("description")} ></textarea>
                </div>
            </>
        </Modal>}
        
        {isDeleteModalVisible && <Modal
            boldTitle="Delete"
            additionalTitle="Mission"
            mainActionTitle="Delete"
            mainActionFn={handleCardDeletionConfirm}
        >
            <p>Are you sure? You can't undo this action afterwards.</p>
        </Modal>}

        {children}
      </MissionsContext.Provider>
    )
  }
  
  export default MissionsProvider
  