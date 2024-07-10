import getMaskedAccountNumber from "../helper/maskedAC.js";
import utcToIstTimeConverter from "../helper/utcToIstTime.js";
import { Account, Customer, Transaction } from "../models/v1_models.mongoDB.js";
import sendSMSonNumber from "../utils/msg.Phon.utils.js";

const scanToPay = async (req, res) => {
  try {
    const { name, account, money } = req.body;

    // <<==== TEST CODE ===>>>
    const senderDet = await Customer.findById(req.user.id); //sender
    const receiverACDet = await Account.findOne({ accountNumber: account }); //receiver AC Det
    const receiverDet = await Customer.findById(receiverACDet.customer_id);

    // deposite amount in provided a/c number
    const userAccount = await Account.findOneAndUpdate(
      { customer_id: req.user.id }, // Find the document where the accountNumber matches
      { $inc: { balance: -money } }, // decreased the balance field by the amount of money
      { new: true, upsert: true } // Return the updated document, create if not exists
    );
    const creditAccount = await Account.findOneAndUpdate(
      { accountNumber: account },
      { $inc: { balance: money } },
      { new: true, upsert: true }
    );

    await creditAccount.save();
    await userAccount.save();

    const newTransaction = new Transaction({
      amount: money,
      transactionType: "Credit",
      modeOfTransaction: "Online",
      currentBalance: [userAccount.balance, creditAccount.balance],
      senderAccountNumber: userAccount.accountNumber, //debiter
      senderName: senderDet.name, //debiter
      receiverAccountNumber: receiverACDet.accountNumber, //crediter
      receiverName: receiverDet.name, //crediter
    });

    if (userAccount) {
      await newTransaction.save();
    } else {
      return res.status(500).json({
        success: false,
        msg: "deposit fail, plz try again",
      });
    }
    res.status(200).json({
      success: true,
      msg: "deposit successfully",
    });

    await sendSMSonNumber(
      `+91${senderDet.phone}`,
      `Your a/c ${getMaskedAccountNumber(
        userAccount.accountNumber
      )} is Debited for INR ${money} on ${utcToIstTimeConverter(
        newTransaction.createdAt
      )} through ${newTransaction.modeOfTransaction}. Available Bal INR ${
        userAccount.balance
      }.`
    );
    await sendSMSonNumber(
      `+91${receiverDet.phone}`,
      `Your a/c ${getMaskedAccountNumber(
        account
      )} is Credited for INR ${money} on ${utcToIstTimeConverter(
        newTransaction.createdAt
      )} through ${newTransaction.modeOfTransaction}. Available Bal INR ${
        receiverACDet.balance
      }.`
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export { scanToPay };
