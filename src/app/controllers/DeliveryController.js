import Order from '../models/Order';

class DeliveryController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: { distributor_id: req.params.id, done: false, canceled: false },
    });

    if (orders.length === 0) {
      return res.json({ error: 'No pendent deliveries found' });
    }

    return res.json(orders);
  }

  async show(req, res) {
    const orders = await Order.findAll({
      where: {
        distributor_id: req.params.id,
        done: true,
      },
    });

    if (orders.length === 0) {
      return res.json({ error: 'No completed deliveries found' });
    }

    return res.json(orders);
  }

  async update(req, res) {
    const { status } = req.body;

    const order = await Order.findByPk(req.params.orderid);

    if (!order) {
      return res.json({ error: 'Order not found, check if the id is correct' });
    }

    if (status === 1 && order.start_date !== null) {
      return res
        .status(401)
        .json({ error: 'Delivery progress already started for this order' });
    }

    if (status === 2 && order.done === true) {
      return res
        .status(401)
        .json({ error: 'Delivery progress already finished for this order' });
    }

    if (!status) {
      return res.status(401).json({ error: 'Please, fill a status' });
    }

    // STATUS 1 = Começar entrega   STATUS 2 = Terminar entrega

    if (status === 1) {
      order.start_date = new Date();
    }

    if (status === 2) {
      order.end_date = new Date();
      order.done = true;
    }

    await order.save();

    return res.json(order);
  }
}

export default new DeliveryController();
