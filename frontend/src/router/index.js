import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage';
import SubforumPage from '@/pages/SubforumPage';
import ThreadPage from '@/pages/ThreadPage';
import ThreadCreationPage from '@/pages/ThreadCreationPage';
import ProfilePage from '@/pages/ProfilePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/forum/:subforum',
    name: 'SubforumPage',
    component: SubforumPage,
    props: true,
  },
  {
    path: '/thread/:thread',
    name: 'ThreadPage',
    component: ThreadPage,
    props: true,
  },
  {
    path: '/threadCreation/:subforum',
    name: 'threadCreation',
    component: ThreadCreationPage,
    props: true,
  },
  {
    path: '/profile/:userId',
    name: 'ProfilePage',
    component: ProfilePage,
    props: true,
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;