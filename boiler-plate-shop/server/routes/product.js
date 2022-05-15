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

// 업로드 상품 저장
router.post("/", (req, res) => {
  //받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

// 모든 상품 정보 가져오기
router.post("/products", (req, res) => {
  // skip부터 limit까지 db에서 데이터를 가져올 수 있다.
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;

  Product.find()
    .populate("writer") // 추가해주면 기존 writer의 오직 id 값만 가져오는 대신 writer의 모든 정보를 가져온다.
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, productInfo });
    });
});

module.exports = router;
