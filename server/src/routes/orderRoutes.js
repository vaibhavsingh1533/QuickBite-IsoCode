import { Router } from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { authorize } from '../middleware/authorize.js'
import { listMyOrders, getMyOrder } from '../controllers/orderController.js'
export const orderRouter = Router()
orderRouter.use(authenticate, authorize('customer'))
orderRouter.get('/', listMyOrders)
orderRouter.get('/:id', getMyOrder)
