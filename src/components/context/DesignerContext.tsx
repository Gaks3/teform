'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '../FormElements'
import { idGenerator } from '@/lib/utils'

type DesignerContextType = {
  elements: FormElementInstance[]
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>
  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  selectedElement: FormElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
  updateElement: (id: string, element: FormElementInstance) => void
  updateTypeElement: (prevId: string, type: ElementsType) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([])
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null)

  const addElement = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]

      newElements.splice(index, 0, element)
      return newElements
    })
  }

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id))
  }

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]

      const index = newElements.findIndex((el) => el.id === id)
      newElements[index] = element

      return newElements
    })
  }

  const updateTypeElement = (prevId: string, type: ElementsType) => {
    const element = FormElements[type].construct(idGenerator())
    console.log(type, element)

    setElements((prev) => {
      const newElements = [...prev]

      const index = newElements.findIndex((el) => el.id === prevId)

      newElements.splice(index, 1, element)

      return newElements
    })

    setSelectedElement(element)
  }

  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        updateTypeElement,
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}
