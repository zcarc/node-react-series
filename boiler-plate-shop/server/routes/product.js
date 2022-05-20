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
  // skip 가져올 시작번호, limit 개수만큼 db에서 데이터를 가져올 수 있다.
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let term = req.body.searchTerm;

  // 랜딩 페이지에서 필터링한 부분 찾기
  const findArgs = {};

  console.log("req.body.filters: ", req.body.filters);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log("key: ", key);

      if (key === "price") {
        findArgs[key] = {
          // MongoDB 에서 사용하는 문법
          // $gte: 이것보다 크거나 같은 경우 (Greater than equal)
          // $lte: 이것보다 작거나 같은 경우 (Less than equal)
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log("findArgs: ", findArgs);

  // 랜딩페이지에서 검색하는 경우
  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer") // 추가해주면 기존 writer의 오직 id 값만 가져오는 대신 writer의 모든 정보를 가져온다.
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find(findArgs)
      .populate("writer") // 추가해주면 기존 writer의 오직 id 값만 가져오는 대신 writer의 모든 정보를 가져온다.
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.get("/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;
  console.log("productIds: ", productIds);

  if (type === "array") {
    //id = 123123123, 324234234, 324234234 를 다음으로 바꿔주기
    // productIds = ['123123123', '324234234', '324234234']
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => item);

    console.log("배열로 바꾼 productIds: ", productIds);
  }

  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, product });
    });
});

module.exports = router;
