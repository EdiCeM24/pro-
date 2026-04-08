import axios from "axios";
import { PAYSTACK_TEST_SECRET_KEY } from "../config/env";


const verifyPayment = async (req, res) => {
  const { reference } = req.query;  
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_TEST_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
      );
    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyPayment;