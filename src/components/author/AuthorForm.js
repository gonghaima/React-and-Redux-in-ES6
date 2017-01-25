import React from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, coursesTeaching, onSave, onDelete, onChange, errors, saving}) => {
    return (
        <form>
            <h1>Manage Author</h1>
            <TextInput
                name="firstName"
                label="First Name"
                value={author.firstName}
                onChange={onChange} />
            <TextInput
                name="lastName"
                label="Last Name"
                value={author.lastName}
                onChange={onChange} />
            <h2>Course teaching</h2>
            {coursesTeaching.map(cs => <p key={cs.id}>{cs.id}</p>)}
            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
            <button
                type="button"
                disabled={saving || coursesTeaching.length>0}
                className="btn btn-primary"
                onClick={onDelete}>Delete</button>
        </form>
    );
};

AuthorForm.propTypes = {
    onSave: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    author: React.PropTypes.object.isRequired,
    coursesTeaching: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default AuthorForm;