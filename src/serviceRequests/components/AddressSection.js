import PropTypes from 'prop-types';
import React from 'react';
import SectionWithIcon from './SectionWithIcon';
import ShortFormLocation from './ShortFormLocation';
import LongFormLocation from '../containers/LongFormLocation';
import locationIcon from './img/location-icon-inactive.png';

export default class AddressSection extends React.PureComponent {
  render() {
    const { serviceRequest, fullLength, switchTab } = this.props;

    return (
      <SectionWithIcon icon={locationIcon}>
        {
          fullLength ? (
            <LongFormLocation
              serviceRequest={serviceRequest}
              switchTab={switchTab}
            />
          ) : (
            <ShortFormLocation
              serviceRequest={serviceRequest}
            />
          )
      }
    </SectionWithIcon>
  );
  }
}

AddressSection.propTypes = {
  fullLength: PropTypes.bool,
  serviceRequest: PropTypes.object.isRequired,
  switchTab: PropTypes.func,
};
