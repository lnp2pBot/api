import { Application, Request, Response } from "express";

import logger from "../logger";
import { Community, Order } from "../models";

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

      if (!order) {
        return res.status(404).send({
          success: false,
          error: "Order not found!",
        });
      }

      res.status(200).send({
        success: true,
        order: {
          id: order.id,
          description: order.description,
          amount: order.amount,
          type: order.type,
          fiat_amount: order.fiat_amount,
          fiat_code: order.fiat_code,
          payment_method: order.payment_method,
          price_margin: order.price_margin,
        },
      });
    } catch (error) {
      res.status(500).send({ success: false });
    }
  });

  app.get("/community", async (req: Request, res: Response) => {
    try {
      const comms = await Community.find();

      return res.status(200).send({
        success: true,
        comms,
      });
    } catch (error) {
      logger.error(error);
      res.status(500).send({ success: false });
    }
  });

  app.get("/community/:id", async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .send({ success: false, error: "Community Id required!" });
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
