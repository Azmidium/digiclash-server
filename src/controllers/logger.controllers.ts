import express from "express";

import winston from "winston";

const { transports, createLogger, format } = winston;

const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "digiclash.log" })
  ]
});

namespace LogManager {
  export const info = (message: string) => logger.info(message);

  export const debug = (debug: string) => logger.debug(debug);

  export const error = (err: string) => logger.error(err);

  export const infoWithResponse = (message: string, res) => {
    logger.info(message);
    res.send({ message });
  };

  export const errorWithResponse = (err: string, res) => {
    logger.error(err);
    res.send({});
  };

  export const throwAuthError = (err: string, done: any) => {
    logger.error(err);
    done(err);
  };

  export const getErrorRouter = () => {
    return express.Router().use((req, res, next) => {
      const message = "Incorrect request to: " + req.originalUrl;

      logger.error(message);
      res.send({ message });
    });
  };
}

export { LogManager };
