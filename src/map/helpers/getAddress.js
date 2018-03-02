const isAddressValid = address => (
  address && address.trim().length && (address.trim() !== ', N/A')
);

const isCrossStreetValid = crossStreet => (
  crossStreet && crossStreet.trim().length
);

export const getAddress = serviceRequest => {
  if (isAddressValid(serviceRequest.address)) {
    return serviceRequest.address.trim();
  } else if (isCrossStreetValid(serviceRequest.cross_streets)) {
    return serviceRequest.cross_streets.trim();
  }

  return serviceRequest.location_details;
};