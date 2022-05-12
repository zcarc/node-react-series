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

module.exports = router;
