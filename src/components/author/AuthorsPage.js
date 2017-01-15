import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {authors} = this.props;
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map(author =>
                        <tr>
                            <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
                            <td>{author.firstName}</td>
                            <td>{author.lastName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

AuthorsPage.propTypes = {
    // authors: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);