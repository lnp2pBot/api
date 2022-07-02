import app from "./app";
import mongoConnect from "./db_connect";
import logger from "./logger";
import { loadApiEndpoints } from "./routes/api";

// Connect to database
const mongoose = mongoConnect();
mongoose.connection
  .once("open", async () => {
    logger.info("Connected to Mongo instance.");
  })
  .on("error", (error) => logger.error(`Error connecting to Mongo: ${error}`));

loadApiEndpoints(app);

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
