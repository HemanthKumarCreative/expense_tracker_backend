const Expense = require("../models/Expense");
const AWS = require("aws-sdk");
const Excel = require("exceljs");
require("dotenv").config();

let s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
});

const saveToWorkBook = (jsonData, workbook, worksheet) => {
  const headerRow = worksheet.addRow(Object.keys(jsonData[0].dataValues));
  worksheet.addRow(headerRow);

  jsonData.forEach((row) => {
    const dataRow = Object.values(row.dataValues);
    worksheet.addRow(dataRow);
  });

  // Save the workbook
  console.log("After worksheet");
  return new Promise((resolve, reject) => {
    workbook.xlsx
      .writeFile("report.xlsx")
      .then(() => {
        resolve(workbook);
      })
      .catch((error) => {
        reject("Error generating Excel report:", error);
      });
  });
};

const generateReport = async (req, res) => {
  const emptyWorkbook = new Excel.Workbook();
  const worksheet = emptyWorkbook.addWorksheet("Expenses");
  const { user_id } = req.params; // Extract user_id from params
  try {
    const expenses = await Expense.findAll({
      where: { user_id }, // Filter expenses by user_id
    });

    const workbook = await saveToWorkBook(expenses, emptyWorkbook, worksheet);
    // Convert workbook to a buffer
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const params = {
        Bucket: "expensetracker250923",
        Key: `expense_report${user_id}${new Date().toLocaleTimeString()}.xlsx`,
        Body: buffer,
        ContentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ACL: "public-read",
      };

      // Upload to S3
      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            reject("Error uploading to S3:", err);
          } else {
            resolve(res.status(200).json({ report_url: data.Location }));
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  generateReport,
};
