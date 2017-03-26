import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, numcourse}) => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/courses" activeClassName="active">Courses</Link>
            {" | "}
            <Link to="/authors" activeClassName="active">Authors</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {" | "}
            {numcourse && <span><strong>Total number of courses: {numcourse}</strong></span>}
            {loading && <LoadingDots interval={100} dots={20} />}
        </nav>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    numcourse: PropTypes.number.isRequired
};

export default Header;