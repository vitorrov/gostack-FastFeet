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
}

export default new DeliveryController();
