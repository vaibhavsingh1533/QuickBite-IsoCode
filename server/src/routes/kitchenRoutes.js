import { Router } from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { authorize } from '../middleware/authorize.js'
import { listKitchenOrders, updateKitchenOrder } from '../controllers/kitchenController.js'
export const kitchenRouter = Router()
kitchenRouter.use(authenticate, authorize('kitchen_staff'))
kitchenRouter.get('/orders', listKitchenOrders)
kitchenRouter.patch('/orders/:id/status', updateKitchenOrder)
