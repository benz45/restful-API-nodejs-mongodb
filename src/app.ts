import Express from "express";
import { get } from "config";
import log from "./log";
import connectDatabase from "./database/connect_database";
import routes from "./routes";

const host: string = get("host");
const port: number = get("port");

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.listen(port, host, () => {
  // Server listing
  log.info(`Server listing : http://${host}:${port}`);

  // Connection database
  connectDatabase();

  // Use the route after connected the database successful
  routes(app);
});
