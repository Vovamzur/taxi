import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="ui middle aligned center aligned grid">
    <div className="column">
      <h2 className="ui teal" style={{ "fontSize": "2rem" }}>Not Founded</h2>
      <h1 className="ui huge label">
        <Link to='/'>Take me back</Link>
      </h1>
    </div>
  </div>
)
