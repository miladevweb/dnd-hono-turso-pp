'use client'
import { useState } from 'react'
import { UserInfo } from './user-info'
import { Card, Item } from './card-item'
import { useReactQuery } from '@/services/use-react-query'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core'

export const PageComponent = () => {
  const { isLoading, posts, setPosts } = useReactQuery()
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)

  const findTitle = (id: UniqueIdentifier) => {
    const item = posts.find((item) => item.id === id)
    if (!item) return ''
    else return item.title
  }
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  if (isLoading) return <div>Loading ....</div>
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <UserInfo>
        <Card>
          <div className="text-2xl font-bold tracking-tighter">Posts:</div>

          <SortableContext items={[...posts.map((item) => item.id), 'card', 'user-info']}>
            <div
              id="items"
              className="grid grid-rows-[repeat(auto-fit,minmax(10px,max-content))] gap-y-3 h-full"
            >
              {posts.map(({ id, title }) => (
                <Item
                  key={id}
                  id={id}
                  title={title}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay adjustScale={false}>
            {activeId && (
              <Item
                key={activeId}
                id={activeId}
                title={findTitle(activeId)}
              />
            )}
          </DragOverlay>
        </Card>
      </UserInfo>
    </DndContext>
  )

  function handleDragStart(e: DragStartEvent) {
    const { active } = e
    setActiveId(active.id)
  }
  function handleDragMove(e: DragMoveEvent) {
    const { active, over } = e
    const items = document.getElementById('items')?.childNodes as unknown as HTMLElement[]
    if (active && over && items) {
      const draggableItem = document.getElementById(active.id as string)
      if (over.id === 'user-info') {
        document.getElementById('card')?.classList.add('bg-rose-600')

        items.forEach((item) => {
          item.classList.remove('text-white/[0.8]')
          item.classList.add('text-white/[0.4]')
        })

        if (draggableItem) {
          draggableItem.style.opacity = '0'
        }
      } else if (over.id === 'card') {
        document.getElementById('card')?.classList.remove('bg-rose-600')

        if (draggableItem) {
          draggableItem.style.opacity = '0'
        }
      } else {
        if (draggableItem) {
          draggableItem.style.opacity = '0.5'
        }

        document.getElementById('card')?.classList.remove('bg-rose-600')
        items.forEach((item) => {
          item.classList.remove('text-white/[0.4]')
          item.classList.add('text-white/[0.8]')
        })
      }
    }
  }
  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    const items = document.getElementById('items')?.childNodes as unknown as HTMLElement[]

    if (active && over) {
      if (active.id === over.id) return
      else if (over.id === 'user-info') {
        setPosts(posts.filter((item) => item.id !== active.id))
        setActiveId(null)
      } else {
        const activeIndex = posts.findIndex((item) => item.id === active.id)
        const overIndex = posts.findIndex((item) => item.id === over.id)

        if (activeIndex !== overIndex) {
          setPosts(arrayMove(posts, activeIndex, overIndex))
        }

        setActiveId(null)
      }
    }

    document.getElementById('card')?.classList.remove('bg-rose-600')
    if (items) {
      items.forEach((item) => {
        item.classList.remove('text-white/[0.4]')
        item.classList.add('text-white/[0.8]')
      })
    }

    setActiveId(null)
  }
}
