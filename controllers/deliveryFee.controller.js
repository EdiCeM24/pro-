import DeliveryZone from "../models/DeliveryZone.model";
import distance from "../utils/calculateDistance";


const getDeliveryFee = async (lat, lng) => {
  const zones = await DeliveryZone.findAll();

  for (let zone of zones) {
    const dist = distance(lat, lng, zone.latitude, zone.longitude);

    if (dist <= zone.radius) {
      return zone.fee;
    }
  }

  return 5000; // fallback fee
};