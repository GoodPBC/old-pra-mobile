export function formatLocationData(serviceRequest, dataField) {
  if (dataField === 'cross_streets') {
    return `Cross Streets: ${serviceRequest.cross_streets}`;
  }
  return serviceRequest[dataField];
}

export function prioritizeLocationData(serviceRequest) {
  const {
    address,
    cross_streets: crossStreets,
  } = serviceRequest;
  let primaryLocation = null;
  let secondaryLocation = null;
  if (address) {
    primaryLocation = 'address';
    secondaryLocation = crossStreets ? 'cross_streets' : 'location_details';
  } else if (crossStreets) {
    primaryLocation = 'cross_streets';
    secondaryLocation = 'location_details';
  } else {
    primaryLocation = 'location_details';
  }
  return { primaryLocation, secondaryLocation };
}