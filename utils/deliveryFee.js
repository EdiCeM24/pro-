const calculateDeliveryFee = (state) => {
  // Example logic for Nigeria
  if (state.toLowerCase() === 'lagos') return 1500;
  if (state.toLowerCase() === 'abuja') return 2000;

  return 3000; // other states
};

export default calculateDeliveryFee;