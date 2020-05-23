import React from 'react';

const Spinner = () => {
  return (
    <div className="ui middle aligned center aligned grid">
      <div className="ui active inverted dimmer">
        <div className="ui massive text loader">Loading</div>
      </div>
    </div>
  );
};

export default Spinner;
