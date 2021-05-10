import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Profile from '../views/Profile.vue'
import Feed from '../views/Feed.vue'
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  },
]

const router = new VueRouter({
  routes
})

export default router
