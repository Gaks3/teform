'use client'

import { useEffect, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import useDesigner from '@/lib/hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'
import ElementWrapper from './ElementWrapper'
import HeaderForm from './HeaderForm'
import { LoaderCircle, Plus } from 'lucide-react'
import { idGenerator } from '@/lib/utils'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Form } from '@prisma/client'

export default function FormBuilder({
  form,
  element,
}: {
  form: Form
  element: FormElementInstance[]
}) {
  const {
    setElements,
    setSelectedElement,
    elements,
    selectedElement,
    addElement,
    setFormId,
  } = useDesigner()
  const [isReady, setIsReady] = useState(false)
  const [parent] = useAutoAnimate()

  const getTaskPos = (id: string) =>
    elements.findIndex((element) => element.id === id)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id === over?.id || !over) return

    setElements((elements) => {
      const originalPosition = getTaskPos(active.id as string)
      const newPosition = getTaskPos(over.id as string)

      return arrayMove(elements, originalPosition, newPosition)
    })
  }

  const appendElement = () => {
    const defaultType: ElementsType = 'Text'
    const newElement = FormElements[defaultType].construct(idGenerator())

    addElement(elements.length, newElement)
    return
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    }),
    useSensor(MouseSensor)
  )

  useEffect(() => {
    if (isReady) return

    setElements(element || [])
    setSelectedElement(null)
    setFormId(form.id)

    const readyTimeout = setTimeout(() => setIsReady(true), 500)

    return () => clearTimeout(readyTimeout)
  }, [isReady, setElements, setSelectedElement, element, form, setFormId])

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <div
        className='flex justify-center w-full'
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}
      >
        <div
          ref={parent}
          className='w-[95vw] md:w-[75vw] lg:w-[70vw] flex flex-col gap-3 p-4 items-center mb-10'
        >
          {isReady ? (
            <>
              <HeaderForm
                id={form.id}
                name={form.name}
                description={form.description || ''}
                anonymous={form.isAnonymous}
              />
              <SortableContext
                items={elements}
                strategy={verticalListSortingStrategy}
              >
                {elements.map((element) => (
                  <ElementWrapper key={element.id} element={element} />
                ))}
              </SortableContext>
              <div className='w-10 h-10 p-2 rounded-full cursor-pointer bg-primary text-primary-foreground'>
                <Plus onClick={appendElement} />
              </div>
            </>
          ) : (
            <div className='w-full flex flex-col justify-center items-center gap-5'>
              <LoaderCircle className='animate-spin text-primary' />
              <p>Setup form builder, Please wait.....</p>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  )
}
