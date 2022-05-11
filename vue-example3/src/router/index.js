import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MaleView from '../views/MaleView.vue';
import FemaleView from '../views/FemaleView.vue';
import Favourites from '../views/Favourites.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/male',
    name: 'male',
    component: MaleView,
  },
  {
    path: '/female',
    name: 'female',
    component: FemaleView,
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: Favourites,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
