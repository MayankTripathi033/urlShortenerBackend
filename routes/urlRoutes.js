const express = require('express');
const { urlRandom, urlRedirect } = require('../controller/urlRandom');
const router = express.Router();
router.post("/", urlRandom);
router.get("/:ShortId", urlRedirect)
module.exports = router;