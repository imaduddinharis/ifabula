const responseHandler = (response) => {
  return response.text().then((text) => {
    const result = text && JSON.parse(text);
    if (!result.success) {
      const error = (result && result.msg) || response.statusText;
      return Promise.reject(error);
    }
    return result;
  });
};
module.exports = { responseHandler };
