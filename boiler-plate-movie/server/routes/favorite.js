const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");

router.post("/favoriteNumber", (req, res) => {
  // mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // 에러가 없다면 프론트에 몇명이 영화를 favorite 하는지 보내주기
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  // 사용자가 해당 영화를 Favorite 리스트에 넣었는지 DB에서 정보를 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    // 좋아요를 눌렀다면 사용자가 Favorite에 있어서 true
    if (info.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
});

// 영화 좋아요 삭제
router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

// 영화 좋아요 추가
router.post("/addToFavorite", (req, res) => {
  // 클라이언트에서 보낸 variables는 Favorite의 모델과 변수명이 일치해서 이렇게 생성이 가능하다.
  const favorite = new Favorite(req.body);

  // 생성한 생성자를 save하면 mongoDB에 저장된다.
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
