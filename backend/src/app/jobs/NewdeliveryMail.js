import Mail from '../../lib/Mail';

class NewdeliveryMail {
  get key() {
    return 'NewdeliveryMail';
  }

  async handle({ data }) {
    const { distributor, order } = data;

    await Mail.sendMail({
      to: `${distributor.name} <${distributor.email}>`,
      subject: 'FastFeet | Nova entrega registrada para você!',
      template: 'new',
      context: {
        distributor: distributor.name,
        order: order.id,
        product: order.product,
      },
    });
  }
}

export default new NewdeliveryMail();
