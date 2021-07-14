import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  prettifier: true,
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `"time": ${dayjs().format("YYYY-MM-DD hh:mm:ss A")}"`,
});

export default log;
