const { Download } = require("../models/Download");

const createDownloadRecord = async (req, res) => {
  try {
    const download = await Download.create(req.body);

    res.status(201).json(download);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllDownloadsRecord = async (req, res) => {
  const { user_id } = req.params; // Extract user_id from params
  console.log({ user_id });
  try {
    const downloads = await Download.findAll({
      where: { user_id }, // Filter expenses by user_id
    });
    console.log({ downloads });
    res.status(200).json(downloads);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createDownloadRecord,
  getAllDownloadsRecord,
};
