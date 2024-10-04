import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'

export const Card = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: 'card',
  })
  return (
    <section
      id="card-section"
      ref={setNodeRef}
      className="grid place-items-center"
    >
      <div
        id="card"
        className="w-96 h-[94%] rounded-md overflow-auto px-4 py-3 grid grid-rows-[max-content,1fr] items-start gap-y-3 bg-[#0c0b12]"
      >
        {children}
      </div>
    </section>
  )
}

export const Item = ({ id, title }: { id: UniqueIdentifier; title: string }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id,
  })

  const style = {
    transition,
    opacity: isDragging ? 0.5 : 1,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  }

  return (
    <article
      id={id as string}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      style={style}
      className="rounded-sm px-2 py-1 shadow-sm shadow-gray-500 cursor-pointer flex items-center text-white/[0.8]"
    >
      <DragPoints /> <span>{title}</span>
    </article>
  )
}

export const DragPoints = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className="size-4 mr-1"
    >
      <path
        fill="none"
        d="M0 0h24v24H0V0z"
      ></path>
      <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
  )
}
