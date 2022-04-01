const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const dir = `resources/static/uploads/`;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
const config = {};
config.upload = util.promisify(uploadFile);
config.dir = dir;
config.maxFileSize = fileSize(maxSize, 0);

function fileSize(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "KB" },
    { value: 1e6, symbol: "MB" },
    { value: 1e9, symbol: "GB" },
    { value: 1e12, symbol: "TB" },
    { value: 1e15, symbol: "E" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : 0;
}

module.exports = config;
