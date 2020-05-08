const error500 = (): Error => {
  return new Error("INTERNAL_SERVER_ERROR");
};

export default error500;
