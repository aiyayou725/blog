import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    { path: "/",
      redirect: "/home",
      component: () => import("../views/HomePage.vue"),
      children: [
        { path: "/home", component: () => import("../views/blogs/Home.vue")},
        { path: "/blog", component: () => import("../views/blogs/Blog.vue")},
      ]
    },
    { path: "/detail", component: () => import("../views/blogs/Detail.vue")},
    { path: "/login", component: () => import("../views/Login.vue")},
    { path: "/dashboard", 
      redirect: "/dashboard/article",
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