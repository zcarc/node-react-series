const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = "./uploads";
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

// 여행 상품 업로드에서 드랍존에 파일 드랍 시 파일을 저장하는 API
router.post("/image", (req, res) => {
  // 가져온 이미지 저장

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: req.file.path,
      fileName: req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
