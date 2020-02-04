import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
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

    // Se for antes que 8am e depois que 6pm não pode começar entrega

    // STATUS 1 = Começar entrega   STATUS 2 = Terminar entrega

    const { start_date } = req.query;

    const searchDate = Number(start_date);

    const dayDeliveries = await Order.findAll({
      where: {
        distributor_id: order.distributor_id,
        start_date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    if (dayDeliveries.length >= 5) {
      return res
        .status(401)
        .json({ error: 'You can only do five deliveries a day' });
    }

    const current_hour = new Date().getHours();
    const start_hour = 8;
    const end_hour = 23;

    if (status === 1 && current_hour > start_hour && current_hour < end_hour) {
      order.start_date = new Date();
    } else {
      return res
        .status(401)
        .json({ error: 'You can only start a delivery between 8am and 18pm' });
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
