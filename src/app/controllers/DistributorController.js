import * as Yup from 'yup';
import Distributor from '../models/Distributor';

class DistributorController {
  async index(req, res) {
    const distributors = await Distributor.findAll();

    return res.json(distributors);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const distributorExists = await Distributor.findOne({
      where: { email: req.body.email },
    });

    if (distributorExists) {
      return res.status(401).json({ error: 'Email already registered' });
    }

    const distributor = await Distributor.create(req.body);

    return res.json({
      id: distributor.id,
      name: distributor.name,
      email: distributor.email,
    });
  }

  async update(req, res) {
    const distributor = await Distributor.findByPk(req.params.id);

    const { name, email, avatar_id } = req.body;

    if (name && !(name !== distributor.name)) {
      return res
        .status(401)
        .json({ error: 'Name can not be the same as already registered' });
    }

    if (email && !(email !== distributor.email)) {
      return res
        .status(401)
        .json({ error: 'Email can not be the same as already registered' });
    }

    if (avatar_id && !(avatar_id !== distributor.avatar_id)) {
      return res
        .status(401)
        .json({ error: 'Avatar can not be the same as already registered' });
    }
    await distributor.update(req.body);

    return res.json(distributor);
  }

  async delete(req, res) {
    const distributor = await Distributor.findByPk(req.params.id);

    await distributor.delete();

    return res.json({
      success: `Distributor ${distributor.name} was deleted succesfully`,
    });
  }
}

export default new DistributorController();
