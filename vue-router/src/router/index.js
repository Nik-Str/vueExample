import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import EffectView from '../views/EffectView.vue';
import AltPropsView from '../views/AltPropsView';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/effect',
    name: 'effect',
    component: EffectView,
  },
  {
    path: '/altProps',
    name: 'altProps',
    component: AltPropsView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
