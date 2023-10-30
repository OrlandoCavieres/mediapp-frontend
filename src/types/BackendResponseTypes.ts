import type { Professional, Question, User } from "@/types/Objects";

export type LoginSuccessResponse = {
  success: boolean
  user: {
    id: number
    email: string
    name?: string | null
    city?: string | null
    user_type?: {
      id: number
      name: 'Administrador' | 'Paciente'
    } | null
    assignedProfessional?: {
      id: number
      name: string
      specialty: string
    } | null
  }
  token: string
  message?: string
}


export type ListResponse = {
  success: boolean,
  list: Array<any>
}

export type ElementResponse = {
  success: boolean,
  element: any
}

export type AssignProfResponse = {
  success: boolean,
  assignedProfessional: Professional,
  message: string
}
