import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends Component {
    constructor(props, context) {
        super(props, context);
    }
    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }
    render() {
        const {authors} = this.props;
        return (
            <div>
                <h1>Authors</h1>
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
                            <tr key={author.id}>
                                <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
                                <td>{author.firstName}</td>
                                <td>{author.lastName}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAddAuthorPage} />
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    // actions: React.PropTypes.object.isRequired
    authors: React.PropTypes.array.isRequired
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