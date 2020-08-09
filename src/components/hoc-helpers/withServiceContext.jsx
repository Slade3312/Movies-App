import React from 'react';
import { ServiceConsumer } from '../serviceContext/serviceContext';

const withServiceContext = (Wrapper) => {
  return (props) => {
    return (
      <ServiceConsumer>
        {(genres) => {
          return <Wrapper {...props} genres={genres} />;
        }}
      </ServiceConsumer>
    );
  };
};
export default withServiceContext;
