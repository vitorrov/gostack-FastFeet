import Order from '../models/Order';

class DeliveryController {
  async index(req, res) {
    // const distributor = await Distributor.findByPk(req.params.id);
    const orders = await Order.findAll({
      where: { distributor_id: req.params.id, done: false, canceled: false },
    });

    return res.json(orders);
  }

  async show(req, res) {
    const orders = await Order.findAll({
      where: {
        distributor_id: req.params.id,
        done: true,
      },
    });

    return res.json(orders);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.orderid);

    const { status } = req.body;

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
