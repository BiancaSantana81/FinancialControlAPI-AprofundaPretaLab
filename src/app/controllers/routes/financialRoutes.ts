import { Router } from "express";
import { GetAllTransactionsController } from "../GetAllTransactionsController";

const router = Router();

const getAllTransactionsController = new GetAllTransactionsController();

// GET
router.get("/transactions", (req, res) => getAllTransactionsController.handle(req, res));

export { router as financialRoutes };
