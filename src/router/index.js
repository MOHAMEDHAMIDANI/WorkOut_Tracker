import { createRouter, createWebHistory } from 'vue-router'
import {supabase} from '../supabase/supabase'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        title: "Home",
        auth : true,
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: {
        title: "Register",
        auth : false,

      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: {
        title: "Login",
        auth : false,
      }
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('../views/Create.vue'),
      meta: {
        title: "Create",
        auth : true,
      }
    },
    {
      path: '/Vue-workout/:id',
      name: 'Vue-workout',
      component: () => import('../views/VueWork.vue'),
      meta: {
        title: "Vue Workout",
        auth : false,
      }
    },
  ]
})
// change titles
router.beforeEach((to) => {
  document.title = `${to.meta.title} | Mr.tracker`;
}) 
// router guard 
// router.beforeEach((to,from,next) => {
//   const user = supabase.auth.getUser;
//   if (to.matched.some((res) => res.meta.auth)) {
//     if(user) {
//       next();
//       return
//     }
//     next({name:"Login"});
//     return
//   }
//   next();
// }) ;



export default router
