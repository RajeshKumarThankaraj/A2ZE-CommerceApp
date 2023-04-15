const https = require("https");
const http = require("http");
const express = require("express");
const expressRateLimit = require("express-rate-limit");
const history = require("connect-history-api-fallback");
const compression = require("compression");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const winston = require("./middlewares/winston");
const authRoutes = require("./routes/auth.routes.js");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorHandler");
const connectDB = require("./services/mongoDB.conn");
const { verifyAccessToken } = require("./middlewares/auth.middleware");
const redisClient = require("./services/redis.conn");
const publicRoutes = require("./routes/user/user.public.routes");
const protectedRoutes = require("./routes/user/user.protected.routes");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// connect to mongoDB
connectDB();

// connect Redis
(async () => await redisClient.connect())();

let server;
const app = express();
const rateLimit = expressRateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: process.env.MAX_REQUESTS,
  message: "You have exceeded the 1000 requests in 24 hrs limit!",
  headers: true,
});

// const staticFileMiddleware = express.static(path.join(__dirname, './'))

const key = fs.readFileSync(process.env.PRIVATEKEY_SSL);
const cert = fs.readFileSync(process.env.CERT_SSL);
const certPayload = {
  key,
  cert,
};

/** Middlewares */

/** Logger */
app.use(morgan("combined", { stream: winston.stream }));

app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(rateLimit);

/** Routes **/
app.use("/api/auth", authRoutes);
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/private", verifyAccessToken, protectedRoutes);

app.use(
  history({
    // disableDotRule: true,
    verbose: false,
  })
);

// app.use(staticFileMiddleware)

// if (process.env.ENABLE_SSL === 'true') {
//   server = https.createServer(certPayload, app)
// } else {
server = http.createServer(app);
// }

server.listen(process.env.CLIENT_PORT, () => {
  console.log("Server Started at port", process.env.CLIENT_PORT);
});

/** Error middleware */
app.use(errorHandler);
