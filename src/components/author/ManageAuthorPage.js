import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';

import toastr from 'toastr';

class ManageAuthorPage extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            author: Object.assign({}, this.props.author),
            errors: {},
            saving: false
        };
    }


    render() {
        return (
            <div>
                <p>{this.props.author.firstName}</p>
            </div>
        );
    }
}

ManageAuthorPage.propTypes = {

};

function getAuthorById(authors, id) {
    const author = authors.filter(author => author.id == id);
    if (author) return author[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id; // from the path `/author/:id`
    let author = { id: '', firstName: '', lastName: '' };
    if (authorId && state.authors.length > 0) {
        author = getAuthorById(state.authors, authorId);
        console.log(author);
    }

    return {
        author: author,
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);