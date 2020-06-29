import * as Yup from 'yup';
import { response } from 'express';
import User from '../models/User';
import Wallet from '../models/Wallet';

class WalletController {
  async index(req, res) {
    const user = req.userId;

    const wallets = await Wallet.findAll({
      where: {
        user_id: user,
      },
    });
    return res.json(wallets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      card_number: Yup.number().required(),
      card_name: Yup.string().required(),
      cvc: Yup.number().min(3),
      due_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { card_number, card_name, cvc, due_date } = req.body;

    const user = await User.findByPk(req.userId);

    const wallet = await Wallet.create({
      card_number,
      card_name,
      cvc,
      due_date,
      user_id: req.userId,
    });

    return res.json(wallet);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      card_number: Yup.number(),
      card_name: Yup.string(),
      cvc: Yup.number().min(3),
      due_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { card_number, card_name, cvc, due_date } = req.body;

    const { id } = req.params;

    const wallet = await Wallet.findOne({
      where: {
        id,
      },
    });

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet not exists' });
    }

    await wallet.update(req.body);

    return res.json(wallet);
  }

  async delete(req, res) {
    const { id } = req.params;

    const wallet = await Wallet.findByPk(id);

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet not exists' });
    }

    await wallet.destroy();

    return res.sendStatus(204);
  }
}
export default new WalletController();
