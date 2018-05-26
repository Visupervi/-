import Vue from 'vue'
import Router from 'vue-router'
import Exhibition from '@/components/exhibition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Exhibition',
      component: Exhibition
    }
  ]
})
