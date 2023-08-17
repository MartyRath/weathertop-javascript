import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    try {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  }
  catch (error) {
    console.error("Something went wrong", error);
    response.render("error-view");
  }
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    console.log("rendering login");
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    console.log("signing out");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    console.log("rendering signup");
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/dashboard");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    console.log(request.body.password);
    if (user && userStore.checkPassword(user, request.body.password)) {
      console.log("Authentication successful");
      response.cookie("station", user.email);
      response.cookie("userId", user._id);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },

  async getLoggedInUserById(request) {
    const userId = request.cookies.userId;
    return await userStore.getUserById(userId);
  },
 
};
