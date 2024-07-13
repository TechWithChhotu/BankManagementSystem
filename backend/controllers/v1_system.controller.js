import { Account, Employee, Transaction } from "../models/v1_models.mongoDB.js";
import oracledb from "oracledb";
import { Customer } from "../models/v1_models.mongoDB.js";
import { Aadhaar } from "../Aadhar/aadhar.models.js";
import sendOTPonNumber from "../utils/send.phone.utils.js";

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

import redisClient from "../helper/redis.helper.js";

/*======================Sign-In======================*/
const login = async (req, res, next) => {
  console.log("login ===> 1");
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

const getUserData = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await Customer.findById(id);
    const account = await Account.findOne({ customer_id: user._id });
    console.log(account);
    if (account) {
      return res.status(200).json({
        success: true,
        msg: "data available",
        data: { account, user },
      });
    }
  } catch (err) {}
};

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

export {
  addBranch,
  getAllBranches,
  addEmp,
  login,
  getUserData,
  transactionRecords,
};
