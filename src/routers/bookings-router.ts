import { getBooking, postBooking, putBooking } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const bookingsRouter = Router();

bookingsRouter.all("/*", authenticateToken).get("/", getBooking).post("/", postBooking).put("/:bookingId", putBooking);

export { bookingsRouter };
