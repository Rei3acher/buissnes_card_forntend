import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "Visitenkarten",
    component: () => import("../components/UserData.vue"),
    props: true,
  },
  {
    path: "/Visitenkarte/:UUID",
    name: "Visitenkarte",
    component: () => import("../components/UserData.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../components/NotFound"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach((to, from, failure) => {
  if (failure) {
    router.push({ name: "NotFound" });
  }
});
export default router;
