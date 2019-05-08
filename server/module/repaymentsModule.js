import Repayments from '../model/repaymants';
import repaymantsHelpers from '../helpers/repaymentsHelpers';
import repaymentDb from '../storage/repayments.db';
import loanHelpers from '../helpers/loansHelpers';
import idGenerator from '../helpers/idGenerator';
import loanDb from '../storage/loans.db';
import balanceCalculator from '../helpers/balanceCalculator';

export default {
  createRepayment: async (req) => {
    const repaymentId = Number(idGenerator());
    const [{
      id, amount, balance, paymentInstallment,
    }] = loanHelpers
      .getLoanById(loanDb, Number(req.params.id));
    const createdOn = new Date();
    const paidAmount = req.body.paid_amount;
    const loanBalance = balanceCalculator(Number(balance), Number(paidAmount));

    await loanHelpers.getNewBalance(loanDb, Number(req.params.id), loanBalance.toFixed(2));

    const repayment = await new Repayments(repaymentId, createdOn,
      id, amount, paymentInstallment, Number(paidAmount).toFixed(2), loanBalance.toFixed(2));
    repaymentDb.push(repayment);
    return {
      id: repayment.id,
      loanId: repayment.loanId,
      createdOn: repayment.createdOn,
      amount: repayment.amount,
      monthlyInstallment: repayment.monthlyInstallment,
      paidAmount: repayment.paidAmount,
      balance: repayment.balance,
    };
  },

  getRepaymentByLoanId: async (req) => {
    const repayments = await repaymantsHelpers
      .getRepaymentsByLoanId(repaymentDb, Number(req.params.id));
    return repayments;
  },

  getRepayments: async () => {
    const repayments = await repaymantsHelpers.getRepayments(repaymentDb);
    return repayments;
  },
};
