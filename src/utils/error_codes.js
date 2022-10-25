const RENDER_BAD_REQUEST = (res, error) => {
  console.log(error);
  res.status(400).json({
    code: 400,
    message: "Something went wrong Please Contaact Support",
  });
};

module.exports = {
  RENDER_BAD_REQUEST,
};
