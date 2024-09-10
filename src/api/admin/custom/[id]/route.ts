import {
  CustomerService,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/medusa";
import { EntityManager } from "typeorm";

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const id = req.params.id;
  res.json({ message: `Get Method ${id}` });
  res.sendStatus(200);
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const id = req.params.id;
  const customerService: CustomerService = req.scope.resolve("customerService");

  const manager: EntityManager = req.scope.resolve("manager");

  const productFaq = await manager.transaction(async (transactionManager) => {
    return await customerService.withTransaction(transactionManager).delete(id);
  });

  res.json({ message: `Delete Method ${id}` });

  res.status(200).json({ productFaq });
}

export const AUTHENTICATE = false;
