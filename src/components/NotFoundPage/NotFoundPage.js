import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const NotFoundPage = ({ currentPosition }) => {
  return (
    <div className="not-found-page">
      <h2>Error 404</h2>
      <h4>Page Not Found</h4>
      <p>
        The resource you are trying to access could not be found. Navigate back
        to the Home Page and try again.
      </p>
      <Button tag={Link} to="/" color="primary">
        Go Home
      </Button>{' '}
    </div>
  );
};

export default NotFoundPage;
