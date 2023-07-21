import { userStore } from "../models/user-store.js";
import { accountsController } from "./accounts-controller.js";

export const profileController = {
    async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUserId(request);
      const viewData = {
        title: "Profile",
        user: loggedInUser,
      };
      console.log("profile rendering");
      response.render("profile-view", viewData);
    },


    async showProfile(request, response) {
        const userId = request.params.id;
        const user = await userStore.getUserById(userId);
        response.render("profile-view", {user});
      },
      
      
}