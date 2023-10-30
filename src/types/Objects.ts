export type Professional = {
  id: number
  name: string
  specialty: string
}


export type QuestionAlternative = {
  id: number
  sentence: string
  answerWeight: number
}


export type Question = {
  id: number
  statement: string
  alternatives: QuestionAlternative[]
}


export type UserType = {
  id: number
  name: 'Administrador' | 'Paciente'
}


export type User = {
  id: number
  name: string | null
  email: string
  user_type: UserType
  assignedProfessional: Professional | null
}