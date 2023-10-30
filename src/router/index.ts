import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from "@/views/RegisterView.vue"
import AdminLayout from "@/views/Admin/AdminLayout.vue"
import WelcomeAdmin from "@/views/Admin/WelcomeAdmin.vue"
import QuestionsList from "@/views/Admin/QuestionsList.vue"
import ProfessionalsList from "@/views/Admin/ProfessionalsList.vue"
import PatientLayout from "@/views/Patient/PatientLayout.vue"
import Onboard from "@/views/Patient/Onboard.vue"
import Diagnostic from "@/views/Patient/Diagnostic.vue"
import AssociationResult from "@/views/Patient/AssociationResult.vue"
import UserAssociations from "@/views/Admin/UserAssociations.vue";
import { useUserInformationStore } from "@/stores/userInformation";
import ProfessionalsForm from "@/views/Admin/ProfessionalsForm.vue";
import QuestionsForm from "@/views/Admin/QuestionsForm.vue";
import LoginView from "@/views/LoginView.vue";


declare module 'vue-router' {
  interface RouteMeta {
    isAdmin: boolean
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin',
      name: 'adminLayout',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'adminWelcome',
          meta: { isAdmin: true },
          component: WelcomeAdmin
        },
        {
          path: 'questions',
          name: 'questions',
          meta: { isAdmin: true },
          component: QuestionsList
        },
        {
          path: 'questions/create',
          name: 'questionsCreate',
          meta: { isAdmin: true },
          component: QuestionsForm
        },
        {
          path: 'questions/:id',
          name: 'questionsUpdate',
          meta: { isAdmin: true },
          component: QuestionsForm
        },
        {
          path: 'professionals',
          name: 'professionals',
          meta: { isAdmin: true },
          component: ProfessionalsList
        },
        {
          path: 'professionals/create',
          name: 'professionalsCreate',
          meta: { isAdmin: true },
          component: ProfessionalsForm
        },
        {
          path: 'professionals/:id',
          name: 'professionalsUpdate',
          meta: { isAdmin: true },
          component: ProfessionalsForm
        },
        {
          path: 'associations',
          name: 'associations',
          meta: { isAdmin: true },
          component: UserAssociations
        }
      ]
    },
    {
      path: '/patient',
      name: 'patientLayout',
      component: PatientLayout,
      children: [
        {
          path: '',
          name: 'onboard',
          meta: { isAdmin: false },
          component: Onboard
        },
        {
          path: 'diagnostic',
          name: 'diagnostic',
          meta: { isAdmin: false },
          component: Diagnostic
        },
        {
          path: 'result',
          name: 'associationResult',
          meta: { isAdmin: false },
          component: AssociationResult
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from) => {
  const userInfo = useUserInformationStore()

  if (userInfo.user.token === null && to.name !== 'login' && to.name !== 'register') {
    return { name: 'login' }
  }
})

router.beforeEach(async (to, from) => {
  const userInfo = useUserInformationStore()

  if (userInfo.user.group === 'Paciente' && to.meta.isAdmin) {
    return { name: 'onboard' }
  }
})

router.beforeEach(async (to, from) => {
  const userInfo = useUserInformationStore()

  if (userInfo.user.group === 'Administrador' && !to.meta.isAdmin) {
    return { name: 'adminWelcome' }
  }
})

export default router
