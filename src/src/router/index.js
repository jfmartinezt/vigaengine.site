import Vue from "vue";
import Router from "vue-router";
import App from "@/App";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: App,
      children: [
        {
          path: "join",
          component: {
            template: "<router-view></router-view>"
          },
          children: [
            {
              path: "/",
              component: () => import("../components/game/Join.vue")
            },
            {
              path: "rooms",
              component: {
                template: "<router-view></router-view>"
              },
              children: [
                {
                  path: "/",
                  name: "rooms.master",
                  component: () =>
                    import("../components/game/rooms/Rooms.master.vue")
                },
                {
                  path: ":id",
                  name: "rooms.detail",
                  component: () =>
                    import("../components/game/rooms/Rooms.detail.vue")
                }
              ]
            }
          ]
        }
      ]
    }
  ]
});
