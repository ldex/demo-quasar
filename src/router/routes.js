const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      { path: "admin", component: () => import("pages/AdminPage.vue") },
      { path: "products", component: () => import("pages/ProductsPage.vue") },
      {
        path: "product/:id",
        name: "product",
        component: () => import("pages/ProductDetailsPage.vue"),
        props: castRouteParamsId,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

export default routes;
