import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
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

    updateAuthorState(event) {
        // const field = event.target.name;
        // let author = this.state.author;
        // author[field] = event.target.value;
        // return this.setState({ author: author });
    }

    AuthorFormIsValid() {
        return true;
    }

    saveAuthor(event) {
        event.preventDefault();

        if (!this.AuthorFormIsValid()) {
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveAuthor(this.state.author)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: true });
        toastr.success('Author saved!');
        this.context.router.push('/authors');
    }

    render() {
        return (
            <AuthorForm
                author={this.props.author}
                onSave={this.saveAuthor}
                onChange={this.updateAuthorState}
                errors={this.state.errors}
                saving={this.state.saving}
                />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
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