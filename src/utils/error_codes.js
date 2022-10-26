const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  res.status(400).json({
    code: 400,
    message: "Something went wrong Please Contaact Support",
  });
};

const WRONG_HTTP_METHOD = (req, res) => {
  res.status(405).json({
    code: 405,
    message: "Http Method not allowed",
  });
};

module.exports = {
  RENDER_BAD_REQUEST,
  WRONG_HTTP_METHOD,
};
