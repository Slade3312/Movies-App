import React from 'react';
import { ServiceConsumer } from '../serviceContext/serviceContext';

const withServiceContext = (Wrapper) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {(options) => {
          return <Wrapper {...props} options={options} />;
        }}
      </ServiceConsumer>
    );
  };
};
export default withServiceContext;
