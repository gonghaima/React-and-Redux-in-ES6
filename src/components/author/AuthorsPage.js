import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            offset: 0
        };
        this.dosth = this.dosth.bind(this);
    }
    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }
    dosth() {
        this.setState({ offset: 3 });
    }
    setpage(nm){
        this.setState({ offset: nm });
    }
    render() {
        const {authors} = this.props;
        // let initialOffset = 0;
        // console.log("state.offset in render before return: " + this.state.offset);
        // console.log("route value: " + this.props.params.pid);
        let localAuthors={};
        let totalAuthorsNumber = authors.length;
        let totalPages = Math.ceil(totalAuthorsNumber / 3);
        let prevButton = <li><a>Previous</a></li>;
        let nextButton = <li><Link to={'/authors/2'}>Next</Link></li>;
        if(this.props.params.pid){
            const startCt=(this.props.params.pid-1)*3;
            localAuthors= authors.slice(startCt, startCt + 3);
            if(this.props.params.pid>1)prevButton = <li><Link to={`/authors/${this.props.params.pid-1}`}>Previous</Link></li>;
            console.log(`totalPages:${totalPages}`);
            console.log(`this.props.params.pid:${this.props.params.pid}`);
            if(this.props.params.pid<totalPages)
            nextButton = <li><Link to={`/authors/${Number(this.props.params.pid)+1}`}>Next</Link></li>;
            else
            nextButton = <li><a>Next</a></li>;
        }else{
            localAuthors= authors.slice(this.state.offset, this.state.offset + 3);
        }






        let totalPagesArray = [];
        if (totalPagesArray !== []) {
            for (let i = 1; i <= totalPages; i++) {
                totalPagesArray.push(i);
            }
        }
        let pageButtons = totalPagesArray.map(s => {
            return <li key={s} ><Link to={`/authors/${s}`}>{s}</Link></li>;
        });








        return (
            <div>{this.state.offset}localAuthors.length:{authors.length}
                <ul className="pagination">
                    {prevButton}
                    {pageButtons}
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