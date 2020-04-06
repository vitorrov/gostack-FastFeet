import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const { name, email } = await User.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, oldPassword, password_hash, password } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      // Se o usuario preencheu um email e ele for diferente do atual
      const userExists = await User.findOne({ where: { email } }); // Checa se o novo email já existe no banco

      if (userExists) {
        return res.status(400).json({ error: 'Email already registered' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (password_hash) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (password && !oldPassword) {
      return res
        .status(401)
        .json({ error: 'You need to fill your old password' });
    }

    const { name } = await user.update(req.body);

    return res.json({
      name,
      email,
    });
  }
}

export default new UserController();
