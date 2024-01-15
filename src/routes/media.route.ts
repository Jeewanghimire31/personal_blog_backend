import { Router } from "express";
import multer from "multer";
import { Media } from "../entities/Media.entity";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads"); // Set the destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

const router = Router();

router.post("/upload", upload.single("media"), async (req, res, next) => {
  if (!req.body.type) {
    return res.send({
      message: "Please provide type as well.",
    });
  }
  const media = await Media.create({
    // @ts-ignore
    name: req.file.filename,
    type: req.body.type,
  }).save();

  return res.json({
    message: "Media uploaded successfully",
    data: media,
  });
});

export default router;
