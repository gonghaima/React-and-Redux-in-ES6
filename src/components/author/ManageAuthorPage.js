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
            authors: Object.assign({}, this.props.authors),
            courses: Object.assign({}, this.props.courses),
            errors: {},
            saving: false,
            editing: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    componentDidMount() {
        this.context.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.editing) {
                return confirm('Unsaved changes, are you sure to leave?');
            } else {
                return true;
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.author.id != nextProps.author.id) {
            //Necessary to populate form when existing course is loaded directly.
            this.setState({ author: Object.assign({}, nextProps.author) });
        }
    }

    updateAuthorState(event) {
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({ author: author, editing: true});
    }

    AuthorFormIsValid() {
        let formIsValid = true;
        let errors = {};

        if (this.state.author.firstName.length < 3) {
            errors.firstName = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            errors.lastName = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    saveAuthor(event) {
        event.preventDefault();

        if (!this.AuthorFormIsValid()) {
            return;
        }

        this.setState({ saving: true, editing:false});
        this.props.actions.saveAuthor(this.state.author)
            .then(() => this.redirect())
            .catch(error => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    deleteAuthor(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.deleteAuthor(this.state.author)
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
        let courseLocal = this.state.courses;
        let arrayCourse = Object.keys(courseLocal).map((k) => courseLocal[k]);
        let cWithAuthors = arrayCourse.filter(c => c.authorId === this.state.author.id);
        return (
            <AuthorForm
                author={this.state.author}
                coursesTeaching={cWithAuthors}
                onSave={this.saveAuthor}
                onDelete={this.deleteAuthor}
                onChange={this.updateAuthorState}
                errors={this.state.errors}
                saving={this.state.saving}
                />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function getAuthorById(authors, id) {
    const author = authors.filter(author => author.id == id);
    if (author) return author[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id; // from the path `/author/:id`
    let author = { id: '', firstName: '', lastName: '' };
    if (authorId && state.authors.length > 0 && state.authors.findIndex(c => c.id === authorId) !== -1) {
        author = getAuthorById(state.authors, authorId);
    }

    return {
        author: author,
        authors: state.authors,
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);