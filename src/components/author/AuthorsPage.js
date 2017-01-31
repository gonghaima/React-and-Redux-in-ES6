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
    setpage(nm){
        this.setState({ offset: nm });
    }
    render() {
        const {authors} = this.props;
        // let initialOffset = 0;
        console.log("state.offset in render before return: " + this.state.offset);
        let localAuthors = authors.slice(this.state.offset, this.state.offset + 3);
        let prevButton = <li><a href="#" onClick={this.dosth}>Prev</a></li>;
        let nextButton = <li><a href="#">Next</a></li>;
        let pageButtons = <li><a href="#">Next</a></li>;





        let totalAuthorsNumber = authors.length;
        let totalPages = Math.ceil(totalAuthorsNumber / 3);

        let totalPagesArray = [];
        if (totalPagesArray !== []) {
            for (let i = 1; i <= totalPages; i++) {
                totalPagesArray.push(i);
            }
        }
        let pageHtml = totalPagesArray.map(s => {
            // return <li key={s} ><a href="#" onClick={mockClick(event, { s })}>{s}</a></li>;
            return <li key={s} ><Link to={`/authors/page/${s}`}>{s}</Link></li>;
        });








        return (
            <div>{this.state.offset}localAuthors.length:{authors.length}
                <ul className="pagination">
                    {prevButton}
                    {pageHtml}
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