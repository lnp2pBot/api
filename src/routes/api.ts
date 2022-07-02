import { Application, Request, Response } from "express";

import logger from "../logger";
import { Order } from "../models";

interface Order {
  _id: string;
  description: string;
  amount: number;
  status: string;
  calculated: boolean;
}

export const loadApiEndpoints = (app: Application): void => {
  app.get("/order/:id", async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        return res.status(404).send({
          success: false,
          error: "Order Id required!",
        });
      }

      const order = await Order.findById(req.params.id);

      res.status(200).send({ success: true, order });
    } catch (error) {
      res.status(500).send({ success: false });
    }
  });

  app.post("/consignment", async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .send({ success: false, error: "Consignment file is missing!" });
      }

      return res.status(200).send({ success: true });
    } catch (error) {
      res.status(500).send({ success: false });
    }
  });

  app.post("/ack", async (req: Request, res: Response) => {
    try {
      if (!req.body.blindedutxo) {
        return res
          .status(400)
          .send({ success: false, error: "blindedutxo missing!" });
      }
      const c = {};

      if (!c) {
        return res
          .status(404)
          .send({ success: false, error: "No consignment found!" });
      }

      if (!!c) {
        return res
          .status(403)
          .send({ success: false, error: "Already responded!" });
      }

      return res.status(200).send({ success: true });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false });
    }
  });

  app.get("/ack/:blindedutxo", async (req: Request, res: Response) => {
    try {
      if (!req.params.blindedutxo) {
        return res
          .status(400)
          .send({ success: false, error: "blindedutxo missing!" });
      }

      return res.status(200).send({
        success: true,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false });
    }
  });
};
