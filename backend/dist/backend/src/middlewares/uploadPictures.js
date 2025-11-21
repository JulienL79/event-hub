"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPictures = void 0;
// middlewares/uploadPictures.ts
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../utils");
const storage = multer_1.default.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PNG et JPG sont autorisés"));
  }
};
const uploadPictures = (maxFiles) => {
  const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max par fichier
    fileFilter,
  });
  return (req, res, next) => {
    utils_1.logger.info(`[MIDDLEWARE] : uploadPictures (max ${maxFiles})`);
    upload.array("pictures", maxFiles)(req, res, (err) => {
      if (err) {
        if (err instanceof multer_1.default.MulterError) {
          utils_1.logger.error("Erreur Multer", err);
          return (0, utils_1.APIResponse)(res, null, err.message, 400);
        }
        utils_1.logger.error("Erreur d'upload", err);
        return (0, utils_1.APIResponse)(
          res,
          null,
          err.message || "Erreur d'upload",
          400,
        );
      }
      next();
    });
  };
};
exports.uploadPictures = uploadPictures;
