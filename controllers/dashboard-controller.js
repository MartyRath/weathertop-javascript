export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "WeatherTop",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};
