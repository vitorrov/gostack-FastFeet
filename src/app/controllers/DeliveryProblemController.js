import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Distributor from '../models/Distributor';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll();

    if (problems.length === 0) {
      return res.json({ error: 'No problems found' });
    }

    return res.json(problems);
  }

  async store(req, res) {
    const delivery_id = req.params.orderid;
    const { description } = req.body;

    const problemExists = await DeliveryProblem.findOne({
      where: { delivery_id },
    });

    if (problemExists) {
      return res.status(401).json({
        error: 'Problem for this delivery has already been registered',
      });
    }

    if (!description) {
      return res.status(400).json({ error: 'Please, fill a description' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(problem);
  }

  async show(req, res) {
    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.orderid },
    });

    return res.json(problems);
  }

  async delete(req, res) {
    const problem = await DeliveryProblem.findByPk(req.params.problemid);
    const order = await Order.findByPk(problem.delivery_id);
    const distributor = await Distributor.findByPk(order.distributor_id);

    if (order.canceled === true) {
      return res.status(401).json({ error: 'Order has already been canceled' });
    }

    if (order) {
      order.canceled_at = new Date();
      order.canceled = true;
    }

    await order.save();

    await Queue.add(CancellationMail.key, {
      distributor,
      order,
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
