import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    { path: "/test", component: () => import("../views/test.vue")},
    { path: "/login", component: () => import("../views/Login.vue")},
    { path: "/dashboard", 
      component: () => import("../views/dashboard/DashBoard.vue"),
      children: [
        { path: "/dashboard/article", component: () => import("../views/dashboard/Article.vue")},
        { path: "/dashboard/category", component: () => import("../views/dashboard/Category.vue")}
      ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export { router, routes }