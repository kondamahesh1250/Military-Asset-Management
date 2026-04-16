const router = require("express").Router();
const Assignment = require("../models/Assignment");
const Asset = require("../models/Asset");
const auth = require("../middleware/auth");

router.post("/", auth(["COMMANDER"]), async (req, res) => {
  const { assetName, quantity, base, type } = req.body;

  try {
    const asset = await Asset.findOne({ assetName, base });

    if (!asset || asset.quantity < quantity) {
      return res.status(400).json("Not enough stock");
    }

    asset.quantity -= quantity;
    await asset.save();

    const assignment = new Assignment(req.body);
    await assignment.save();

    res.json({
      message: `${type} successful`,
      assignment
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/", auth(), async (req, res) => {
  const data = await Assignment.find();
  res.json(data);
});

module.exports = router;