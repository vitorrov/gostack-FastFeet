import * as Yup from 'yup';
import Order from '../models/Order';
import Distributor from '../models/Distributor';

import OrderdeleteMail from '../jobs/OrderdeleteMail';
import NewdeliveryMail from '../jobs/NewdeliveryMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();

    if (orders.length === 0) {
      return res.json({ error: 'No orders found' });
    }

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      distributor_id: Yup.number().required(),
    });

    const distributorExists = await Distributor.findByPk(
      req.body.distributor_id
    );

    if (!distributorExists) {
      return res.status(400).json({ error: 'Distributor id does not exist' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const order = await Order.create(req.body);
    const distributor = await Distributor.findByPk(order.distributor_id);
    const { product } = order;

    await Queue.add(NewdeliveryMail.key, {
      distributor,
      order,
      product,
    });

    return res.json(order);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    const { recipient_id, distributor_id, product } = req.body;

    if (recipient_id && !(recipient_id !== order.recipient_id)) {
      return res.status(401).json({
        error:
          'This is the same recipient that is already registered for this order',
      });
    }

    if (distributor_id && !(distributor_id !== order.distributor_id)) {
      return res.status(401).json({
        error:
          'This is the same distributor that is already registered for this order',
      });
    }

    if (product && !(product !== order.product)) {
      return res.status(401).json({
        error:
          'This is the same product name that is already registered for this order',
      });
    }

    await order.update(req.body);

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);
    const { product } = order;

    if (!order) {
      return res.status(400).json({ error: 'Order id does not exist' });
    }

    const distributor = await Distributor.findByPk(order.distributor_id);

    await order.destroy();

    await Queue.add(OrderdeleteMail.key, {
      distributor,
      order,
      product,
    });

    return res.json({
      success: `Order #${order.id} was deleted succesfully`,
    });
  }
}

export default new OrderController();
