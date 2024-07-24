import {
  Account,
  Employee,
  FDAccount,
  RDAccount,
  Transaction,
} from "../models/v1_models.mongoDB.js";
import oracledb from "oracledb";
import { Customer } from "../models/v1_models.mongoDB.js";
import { Aadhaar } from "../Aadhar/aadhar.models.js";
import sendOTPonNumber from "../utils/send.phone.utils.js";
import redisClient from "../helper/redis.helper.js";
import generateUniqueCardNumber from "../helper/generateCardNUmber.js";
import sendSMSonNumber from "../utils/msg.Phon.utils.js";
import { ATMCard } from "../models/v1_models.mongoDB.js";
import getMaskedAccountNumber from "../helper/maskedAC.js";

const addBranch = async (req, res) => {
  let connection;

  try {
    const {
      branch_id,
      branchName,
      address,
      areaDistrict,
      areaPinCode,
      managerName,
      contactNumber,
      email,
      ifscCode,
      servicesOffered,
    } = req.body;

    connection = await oracledb.getConnection();
    const time_stamp = new Date().toISOString();
    const result = await connection.execute(
      `INSERT INTO Branch (
        branch_id,
        branch_name,
        address,
        area_district,
        area_pin_code,
        manager_name,
        contact_number,
        email,
        ifsc_code,
        timeStamp,
        services_offered
      ) VALUES (
        :branch_id,
        :branchName,
        :address,
        :areaDistrict,
        :areaPinCode,
        :managerName,
        :contactNumber,
        :email,
        :ifscCode,
        :timeStamp,
        :servicesOffered
      )`,
      {
        branch_id,
        branchName,
        address,
        areaDistrict,
        areaPinCode,
        managerName,
        contactNumber,
        email,
        ifscCode,
        timeStamp: time_stamp,
        servicesOffered: {
          val: servicesOffered,
          dir: oracledb.BIND_IN,
          type: oracledb.STRING,
        },
      },
      { autoCommit: true }
    );

    res.status(200).json({
      success: true,
      msg: 'Data inserted into "Branches" successfully',
      data: result,
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({
      success: false,
      msg: "Error inserting data",
      error: err.message,
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

// Function to retrieve inserted data from the branches table
const getAllBranches = async (req, res) => {
  let connection;

  try {
    // Get a connection from the connection pool
    connection = await oracledb.getConnection();

    // SQL query to select all data from the branches table
    const sql = `SELECT * FROM Branch`;

    // Execute the query
    const result = await connection.execute(sql);

    // Log the fetched rows

    // to convert in json formate
    const josnData = result.rows.map((e) => ({
      branch_id: `${e[0]}`,
      branch_name: `${e[1]}`,
      address: `${e[2]}`,
      area_district: `${e[3]}`,
      area_pin_code: `${e[4]}`,
      manager_name: `${e[5]}`,
      contact_number: `${e[6]}`,
      email: `${e[7]}`,
      ifsc_code: `${e[8]}`,
      operating_hours: `${e[9]}`,
      services_offered: `${e[10]}`,
    }));

    res.status(200).json({
      success: true,
      msg: "Fetched Successfully",
      data: josnData,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  } finally {
    // Release the connection
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
};

const addEmp = async (req, res) => {
  try {
    const { name, phone, email, password, position, adharNumber, PANNumber } =
      req.body;

    const newEmp = new Employee({
      name,
      phone,
      email,
      password,
      position,
      adharNumber,
      PANNumber,
      branch_id: "BRSHK01",
    });

    await newEmp.save();

    res.status(201).json({
      success: true,
      msg: "Employee added successfully",
      data: newEmp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "failed to add employee",
      Error: err.message,
    });
  }
};

/*======================Sign-In======================*/
const login = async (req, res, next) => {
  try {
    const { phone, password, lp, branchId, otp } = req.body; // lp--> login pin, later i`ve integrate it ||| branchId, if loger is employee

    if (branchId) {
      const emp = await Employee.findOne({ phone });
      if (emp) {
        const token = emp.generateToken();
        res.cookie("BankOfBihar", token, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day in milliseconds
        return res.status(200).json({
          success: true,
          message: "Login successfully",
          data: emp,
        });
      } else {
        return res.status(404).json({
          success: false,
          msg: "Login failed, Data not found!",
        });
      }
    } else {
      const user = await Customer.findOne({ phone, password });

      if (user) {
        const otpKey = `otp:${phone}`;

        if (!otp) {
          const TSV = await Aadhaar.findOne({
            adharNumber: user.adharNumber,
          });
          const linkedMobWithAadhar = TSV.phone;
          const OTP = await sendOTPonNumber(`+91${linkedMobWithAadhar}`);
          await redisClient.setEx(otpKey, 300, `${OTP}`); // 300 seconds or 5 minutes to expire otp
          if (OTP) {
            return res.status(200).json({
              success: true,
              msg: "OTP sent to phone, linked with aadhar",
            });
          } else {
            return res.status(500).json({
              success: false,
              msg: "Failed to send OTP",
            });
          }
        } else {
          const storedOtp = await redisClient.get(otpKey);
          if (storedOtp) {
            if (storedOtp === otp) {
              const checkDel = await redisClient.del(otpKey);
              if (!checkDel) {
                await redisClient.del(otpKey);
              }
              const token = user.generateToken();

              const account = await Account.findOne({
                customer_id: user._id,
              });

              res.cookie("BankOfBihar", token, { maxAge: 24 * 60 * 60 * 1000 }); // 1 day in milliseconds

              return res.status(200).json({
                success: true,
                msg: "Login successfully",
                data: { account, user },
              });
            }
          }
        }
      } else {
        return res.status(404).json({
          success: false,
          msg: "Login failed, Data not found!",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*======================>>getUserData<<======================*/
const getUserData = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await Customer.findById(id);
    const account = await Account.findOne({ customer_id: user._id });
    if (account) {
      return res.status(200).json({
        success: true,
        msg: "data available",
        data: { account, user },
      });
    }
  } catch (err) {}
};

/*======================>>transactionRecords<<======================*/
const transactionRecords = async (req, res) => {
  try {
    const { accountNumber } = req.body;
    const allTransactions = await Transaction.find({
      $or: [
        { senderAccountNumber: accountNumber },
        { receiverAccountNumber: accountNumber },
      ],
    });

    return res.status(200).json({
      success: true,
      msg: "Your Transactions Records",
      data: allTransactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

/*======================>>issueAtmCard<<======================*/
const issueAtmCard = async (req, res) => {
  try {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 4)
    );

    const { position, id } = req.user;
    const { otp, accountNumber, pin } = req.body;

    if (!position) {
      //user try kiya h
      const customer = await Customer.findById(id);

      const otpKey = `otp:${customer.phone}`;
      const account = await Account.findOne({ customer_id: id });
      if (!account.atmCard.isAtmCard) {
        if (pin) {
          const newCard = new ATMCard({
            card_number: await generateUniqueCardNumber(),
            customer_id: id,
            expiry_date: futureDate,
            pin,
            status: "Active",
          });

          account.atmCard.isAtmCard = true;
          account.atmCard.atmCardId = newCard._id;
          await newCard.save();
          await account.save();

          console.log(newCard.card_number);
          await sendSMSonNumber(
            `+91${customer.phone}`,
            `Your ATM card order successfully, your Card Number: ${getMaskedAccountNumber(
              `${newCard.card_number}`
            )}. Remember your pin and don't share with anyone. ATM card delivered within 15 working day's through speed post.`
          );

          return res.status(201).json({
            success: true,
            msg: "Your atm card order successfully, Remember your pin and don`t share with anyone",
          });
        } else if (!otp) {
          const TSV = await Aadhaar.findOne({
            adharNumber: customer.adharNumber,
          });
          const linkedMobWithAadhar = TSV.phone;

          const OTP = await sendOTPonNumber(`+91${linkedMobWithAadhar}`);
          await redisClient.setEx(otpKey, 300, `${OTP}`); // 300 seconds or 5 minutes to expire otp
          if (OTP) {
            return res.status(200).json({
              success: true,
              msg: "OTP sent to phone, linked with aadhar",
            });
          } else {
            return res.status(500).json({
              success: false,
              msg: "Failed to send OTP",
            });
          }
        } else if (otp) {
          const storedOtp = await redisClient.get(otpKey);
          if (storedOtp) {
            if (storedOtp === otp) {
              const checkDel = await redisClient.del(otpKey);
              if (!checkDel) {
                await redisClient.del(otpKey);
              }

              return res
                .status(200)
                .json({ success: true, msg: "OTP velidate successfully" });
            } else {
              return res.status(400).josnData({
                success: false,
                msg: "Invalid OTP",
              });
            }
          }
        }
      } else {
        return res
          .status(409)
          .json({ success: false, msg: "ATM card alredy exist" });
      }
    } else {
      /*======================>>Employee ke liye<<======================*/
      res.status(200).json({
        success: true,
        msg: "Card Issued successfully, employee",
      });
    }
  } catch (err) {
    console.log("ERROR =========================================>>>>>>>  ");
    console.log(err);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

/*======================>>blockAtmCard<<======================*/
const blockAtmCard = async (req, res) => {
  const { otp, pin } = req.body;
  const { id, position } = req.user;
  try {
    if (!position) {
      //user try kiya h
      const customer = await Customer.findById(id);

      const otpKey = `otp:${customer.phone}`;

      if (pin) {
        const card = await ATMCard.findOneAndDelete({
          customer_id: id,
          pin,
        });

        console.log("Card info(Block) ===> ");
        console.log(card);

        const account = await Account.findOne({ customer_id: id });
        account.atmCard.isAtmCard = false;
        account.atmCard.atmCardId = null;

        await sendSMSonNumber(
          `+91${customer.phone}`,
          `Your ATM card has been successfully Blocked, your Card Number: ${getMaskedAccountNumber(
            `${card.card_number}`
          )}. You will not be able to use this card anywhere`
        );

        return res.status(201).json({
          success: true,
          msg: "Your ATM card has been successfully Blocked. You will not be able to use this card anywhere",
        });
      } else if (!otp) {
        const TSV = await Aadhaar.findOne({
          adharNumber: customer.adharNumber,
        });
        const linkedMobWithAadhar = TSV.phone;

        const OTP = await sendOTPonNumber(`+91${linkedMobWithAadhar}`);
        await redisClient.setEx(otpKey, 300, `${OTP}`); // 300 seconds or 5 minutes to expire otp
        if (OTP) {
          return res.status(200).json({
            success: true,
            msg: "OTP sent to phone, linked with aadhar",
          });
        } else {
          return res.status(500).json({
            success: false,
            msg: "Failed to send OTP",
          });
        }
      } else if (otp) {
        const storedOtp = await redisClient.get(otpKey);
        if (storedOtp) {
          if (storedOtp === otp) {
            const checkDel = await redisClient.del(otpKey);
            if (!checkDel) {
              await redisClient.del(otpKey);
            }
            return res
              .status(200)
              .json({ success: true, msg: "OTP velidate successfully" });
          } else {
            return res.status(400).josnData({
              success: false,
              msg: "Invalid OTP",
            });
          }
        }
      }
    } else {
      /*======================>>Employee ke liye<<======================*/
      res.status(200).json({
        success: true,
        msg: "Card Issued successfully, employee",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

/*======================>>activateAtmCard<<======================*/
const activateAtmCard = async (req, res) => {
  const { cardId } = req.body;

  try {
    const updatedCard = await AtmCard.findByIdAndUpdate(
      cardId,
      { $set: { status: "Active" } },
      { new: true }
    );

    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*======================>>investInFD<<======================*/
const investInFD = async (req, res) => {
  const { amount, rate, timePeriod } = req.body;
  const { id } = req.user;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, msg: "Customer not found" });
    }

    const maturityAmount =
      parseFloat(amount) * Math.pow(1 + rate / 100, parseInt(timePeriod));

    const fdAccount = new FDAccount({
      customer_id: id,
      principal: amount,
      rate,
      timePeriod,
      maturityAmount: maturityAmount.toFixed(2),
    });

    await fdAccount.save();

    res.status(201).json({
      success: true,
      msg: "FD Account created successfully",
      fdAccount,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

/*======================>>investInRD<<======================*/
const investInRD = async (req, res) => {
  const { amount, rate, timePeriod, autoDebit } = req.body;
  const monthlyDeposit = amount;
  const { id } = req.user;
  console.log("id =============> ", id);

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, msg: "Customer not found" });
    }

    const interestRate = rate / 100 / 4;
    const quarters = timePeriod * 4;
    const maturityAmount =
      (monthlyDeposit * (Math.pow(1 + interestRate, quarters) - 1)) /
      (1 - Math.pow(1 + interestRate, -1 / 3));

    const rdAccount = new RDAccount({
      customer_id: id,
      monthlyDeposit,
      rate,
      timePeriod,
      autoDebit,
      maturityAmount: maturityAmount.toFixed(2),
    });

    await rdAccount.save();

    res.status(201).json({
      success: true,
      msg: "RD Account created successfully",
      rdAccount,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
export {
  addBranch,
  getAllBranches,
  addEmp,
  login,
  getUserData,
  transactionRecords,
  issueAtmCard,
  blockAtmCard,
  activateAtmCard,
  investInFD,
  investInRD,
};
