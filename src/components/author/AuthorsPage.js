import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            offset: 6
        };
        this.dosth = this.dosth.bind(this);
    }
    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }
    dosth() {
        this.setState({ offset: 3 });
        // this.forceUpdate();
        // console.log('initialOffset: ' + initialOffset);
    }
    render() {
        const {authors} = this.props;
        // let initialOffset = 0;
        console.log("state.offset in render before return: " + this.state.offset);
        let localAuthors = authors.slice(this.state.offset, this.state.offset + 3);
        let prevButton = <li><a href="#" onClick={this.dosth}>Prev</a></li>;
        let nextButton = <li><a href="#">Next</a></li>;
        return (
            <div>{this.state.offset}
                <ul className="pagination">
                    {prevButton}
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    {nextButton}
                </ul>
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
                        {localAuthors.map(author =>
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