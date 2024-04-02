import { GetAnswersByQuestionId } from '@/lib/actions/answer'
import { FormElementInstance } from './FormElements'
import ResultComponent from './ResultComponent'

export default async function ResultWrapper({
  element,
}: {
  element: FormElementInstance & {
    questionId: number
  }
}) {
  const answers = await GetAnswersByQuestionId(element.questionId, element.type)

  return <ResultComponent elementInstance={element} values={answers} />
}
