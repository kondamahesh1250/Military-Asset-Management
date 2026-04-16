const router = require("express").Router();
const Transfer = require("../models/Transfer");
const Asset = require("../models/Asset");
const auth = require("../middleware/auth");

router.post("/", auth(["ADMIN", "COMMANDER"]), async (req, res) => {
  const { assetName, quantity, fromBase, toBase } = req.body;

  try {
    const source = await Asset.findOne({ assetName, base: fromBase });

    if (!source || source.quantity < quantity) {
      return res.status(400).json("Not enough stock in source base");
    }

    source.quantity -= quantity;
    await source.save();

    let destination = await Asset.findOne({ assetName, base: toBase });

    if (destination) {
      destination.quantity += quantity;
      await destination.save();
    } else {
      destination = new Asset({
        assetName,
        quantity,
        base: toBase,
      });
      await destination.save();
    }

    const transfer = new Transfer(req.body);
    await transfer.save();

    res.json({ message: "Transfer successful", transfer });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/", auth(), async (req, res) => {
  const data = await Transfer.find();
  res.json(data);
});

module.exports = router;
