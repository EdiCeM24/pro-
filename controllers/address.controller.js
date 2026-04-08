import Address from "../models/Address.model";

const addAddress = async (req, res) => {
  const address = await Address.create({
    ...req.body,
    UserId: req.user.id
  });

  res.json(address);
};

const getUserAddresses = async (req, res) => {
  const addresses = await Address.findAll({
    where: { UserId: req.user.id }
  });

  res.json(addresses);
};

export { addAddress, getUserAddresses };