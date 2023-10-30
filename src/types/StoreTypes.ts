import type { Professional } from "@/types/Objects";


export type UserInfoStore = {
  id: number,
  email: string | null,
  name: string | null,
  city: string | null,
  token: string | null,
  group: 'Administrador' | 'Paciente' | null,
  professional: Professional | null
}
