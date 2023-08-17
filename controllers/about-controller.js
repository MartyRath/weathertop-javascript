export const aboutController = {
  index(request, response) {
    try {
    const viewData = {
      title: "About WeatherTop",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  }
  catch (error) {
    console.error("Something went wrong", error);
    response.render("error-view");
  }
  },
};
