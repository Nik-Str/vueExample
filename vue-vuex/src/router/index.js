import { createRouter, createWebHistory } from 'vue-router';
import CounterView from '../views/CounterView.vue';
import FetchView from '../views/FetchView';
import HelperView from '../views/HelperView';

const routes = [
  {
    path: '/',
    name: 'counter',
    component: CounterView,
  },
  {
    path: '/fetch',
    name: 'fetch',
    component: FetchView,
  },
  {
    path: '/helper',
    name: 'helper',
    component: HelperView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
