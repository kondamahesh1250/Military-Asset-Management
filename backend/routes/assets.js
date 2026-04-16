const router = require("express").Router();
const Asset = require("../models/Asset");
const auth = require("../middleware/auth");

router.post("/", auth(["ADMIN", "LOGISTICS"]), async (req, res) => {
  const asset = new Asset(req.body);
  await asset.save();
  res.json(asset);
});

router.get("/", auth(), async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

module.exports = router;