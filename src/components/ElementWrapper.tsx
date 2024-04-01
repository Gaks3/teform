'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FormElementInstance, FormElements } from './FormElements'
import { Card } from './ui/card'
import { GripVertical } from 'lucide-react'
import useDesigner from '@/lib/hooks/useDesigner'
import { cn } from '@/lib/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function ElementWrapper({
  element,
}: {
  element: FormElementInstance
}) {
  const { selectedElement, setSelectedElement } = useDesigner()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id })
  const [parent] = useAutoAnimate({
    duration: 300,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const DesignerElement = FormElements[element.type].designerComponent

  return (
    <Card
      className={cn(
        'flex w-full h-fit',
        selectedElement?.id === element.id ? 'border-l-4 border-l-primary' : ''
      )}
      ref={setNodeRef}
      style={style}
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()

        if (!selectedElement || selectedElement.id !== element.id) {
          setSelectedElement(element)
        }
      }}
    >
      <div ref={parent} className='flex-1'>
        <DesignerElement
          elementInstance={element}
          selected={selectedElement?.id === element.id}
        />
      </div>
      <div
        className='flex items-center justify-center flex-grow cursor-move max-w-5 bg-secondary rounded-r-md rounded-b-md'
        {...attributes}
        {...listeners}
      >
        <GripVertical className='text-neutral-400' />
      </div>
    </Card>
  )
}
