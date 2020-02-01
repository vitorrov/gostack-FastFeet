import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    const orders = await Order.findAll();

    res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      distributor_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const order = await Order.create(req.body);

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

    await order.destroy();

    return res.json({
      success: `Order #${order.id} was deleted succesfully`,
    });
  }
}

export default new OrderController();
