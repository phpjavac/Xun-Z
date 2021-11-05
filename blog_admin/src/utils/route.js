import router from '../router'

router.beforeEach((to, path, next) => {
    if (to.name === "login" && localStorage.token) {
        return next('/index')
    }
    next()
})