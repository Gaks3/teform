'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '../FormElements'
import { idGenerator } from '@/lib/utils'
import {
  CreateQuestion,
  RemoveQuestion,
  UpdateQuestionById,
  UpdateTypeQuestion,
} from '@/lib/actions/question'

type DesignerContextType = {
  elements: FormElementInstance[]
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>
  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void
  selectedElement: FormElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>
  updateElement: (id: string, element: FormElementInstance) => void
  updateTypeElement: (prevId: string, type: ElementsType) => void
  setFormId: Dispatch<SetStateAction<string | undefined>>
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
  const [formId, setFormId] = useState<string | undefined>(undefined)

  const addElement = async (index: number, element: FormElementInstance) => {
    const prevState = elements

    setElements((prev) => {
      const newElements = [...prev]

      newElements.splice(index, 0, element)
      return newElements
    })

    try {
      if (formId) await CreateQuestion(formId, element)
    } catch (error) {
      setElements(prevState)
    }
  }

  const removeElement = async (id: string) => {
    const prevState = elements

    setElements((prev) => prev.filter((element) => element.id !== id))

    try {
      if (formId) await RemoveQuestion(formId, id)
    } catch (error) {
      setElements(prevState)
    }
  }

  const updateElement = async (id: string, element: FormElementInstance) => {
    const prevState = elements

    setElements((prev) => {
      const newElements = [...prev]

      const index = newElements.findIndex((el) => el.id === id)
      newElements[index] = element

      return newElements
    })

    try {
      if (formId) await UpdateQuestionById(formId, element)
    } catch (error) {
      setElements(prevState)
    }
  }

  const updateTypeElement = async (prevId: string, type: ElementsType) => {
    const prevState = elements
    const prevSelected = selectedElement
    const element = FormElements[type].construct(idGenerator())

    setElements((prev) => {
      const newElements = [...prev]

      const index = newElements.findIndex((el) => el.id === prevId)

      newElements.splice(index, 1, element)

      return newElements
    })

    setSelectedElement(element)

    try {
      if (formId) await UpdateTypeQuestion(formId, prevId, element)
    } catch (error) {
      setElements(prevState)
      setSelectedElement(prevSelected)
    }
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
        setFormId,
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}
