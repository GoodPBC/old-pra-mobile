import React, { PropTypes } from 'react';
import SectionWithIcon from './SectionWithIcon';
import OnsiteTime from './OnsiteTime';
import timeIcon from './img/time-icon-active.png';

export default function OnsiteSection({ serviceRequest }) {
  return (
    <SectionWithIcon icon={timeIcon}>
      <OnsiteTime serviceRequest={serviceRequest} />
    </SectionWithIcon>
  );
}

OnsiteSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};