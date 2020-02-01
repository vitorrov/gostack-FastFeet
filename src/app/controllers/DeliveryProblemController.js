import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Distributor from '../models/Distributor';
import Mail from '../../lib/Mail';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll();

    return res.json(problems);
  }

  async store(req, res) {
    const delivery_id = req.params.orderid;
    const problem = await DeliveryProblem.create({
      delivery_id,
      description: req.body.description,
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

    if (order) {
      order.canceled_at = new Date();
      order.canceled = true;
    }

    await order.save();

    await Mail.sendMail({
      to: `${distributor.name} <${distributor.email}>`,
      subject: 'Entrega cancelada',
      text: `A entrega #${order.id} foi deletada, nos desculpe pelo transtorno!`,
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
