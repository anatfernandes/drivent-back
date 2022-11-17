import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import paymentsService, { CreatePaymentParams, FindPaymentParams } from "@/services/payments-service";

export async function getUserPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query as FindPaymentParams;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const ticket = Number(ticketId);

  try {
    const payment = await paymentsService.getUserPayment(userId, ticket);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body as CreatePaymentParams;
  const { userId } = req;

  if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.postPayment(userId, { ticketId, cardData });

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
