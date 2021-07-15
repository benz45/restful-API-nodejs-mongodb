import { connect, CallbackError } from "mongoose";
import { get } from "config";
import log from "../log";

const dbUrl: string = get("dbUrl");
const dbName: string = get("dbName");

const connectDatabase = async () => {
  await connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
  })
    .then(() => log.info(`Database connected : ${dbName}`))
    .catch((err: CallbackError) => {
      log.error(`Database connect error! : ${err?.message}`);

      // Exit node after connect database error
      process.exit(1);
    });
};

export default connectDatabase;
