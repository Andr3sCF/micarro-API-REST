import app from "./app"

/**
 * "The main function is a function that calls the app.listen function, which is a function that takes 
 * the app.get function.
 */
const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};
main();