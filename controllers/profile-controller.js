import { userStore } from "../models/user-store.js";
import { accountsController } from "./accounts-controller.js";

export const profileController = {
    async index(request, response) {
    try {
      const loggedInUser = await accountsController.getLoggedInUserById(request);
      const viewData = {
        title: "Profile",
        user: loggedInUser,
      };
      console.log("profile rendering");
      response.render("profile-view", viewData);
    }
    catch (error) {
      console.error("Something went wrong", error);
      response.render("error-view");
    }
    },

    async updateProfile(request, response) {
      const user = await userStore.getUserById(request.params.id);
      const updatedUser = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
      };
      
      console.log("Updating user details");
      await userStore.updateUser(user, updatedUser);
      response.redirect("/profile/");
      },
    

}