import * as Yup from 'yup';

import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';

class WalletController {
  async show(req, res) {
    const { id } = req.params;

    const transaction = await Transaction.findAll({
      where: {
        wallet_id: id,
      },
    });
    return res.json(transaction);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      description: Yup.string().required(),
      value_transaction: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { date, description, value_transaction } = req.body;

    const { id } = req.params;

    const walletExist = await Wallet.findByPk(id);

    if (!walletExist) {
      return res.status(400).json({ error: 'Cartão não existe' });
    }

    const user = req.userId;

    const transaction = await Transaction.create({
      date,
      description,
      value_transaction,
      wallet_id: id,
      user_id: user,
    });

    return res.json(transaction);
  }

  async delete(req, res) {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(400).json({ error: 'Transação não existe' });
    }

    await transaction.destroy();

    return res.send(204);
  }
}
export default new WalletController();
