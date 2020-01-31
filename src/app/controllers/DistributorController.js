import Distributor from '../models/Distributor';

class DistributorController {
  async store(req, res) {
    const distributor = await Distributor.create(req.body);

    return res.json({
      name: distributor.name,
      email: distributor.email,
    });
  }
}

export default new DistributorController();
