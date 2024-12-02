const shortid = require("shortid");
const { URL } = require("../models/url");

async function urlRandom(req, res) {
  try {
    const { url } = req.body;
    if (!url) {
      return res
        .status(400)
        .json({ message: "Please provide a URL.", success: false });
    }
    const shortId = shortid.generate();
    const urlShortener = await URL.create({
      shortId,
      redirectUrl: url,
      visitHistory: [],
    });
    await urlShortener.save();
    return res.status(200).json({ message: urlShortener, success: true });
  } catch (error) {
    console.error("Error creating shortened URL:", error);
    return res
      .status(500)
      .json({ message: "Server Error. Please try again.", success: false });
  }
}

async function urlRedirect(req, res) {
  try {
    const {ShortId}  = req.params;
    console.log("redirectUrl", ShortId);
    
    const redirectedDoc = await URL.findOneAndUpdate(
      {
        shortId: ShortId,
      },
      {
        $push: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      }
    );
    console.log("redirectedDoc", redirectedDoc);
    return res.redirect(redirectedDoc.redirectUrl)
  } catch (error) {
    console.error("Error redirecting url");
    return res
      .status(500)
      .json({ message: "Server Error. Please Try again", success: false });
  }
}

module.exports = {
  urlRandom,
  urlRedirect,
};
