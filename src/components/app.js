import React, { Component, PropTypes } from 'react';
import Header from './common/Header';
import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Header loading={this.props.loading} numcourse={this.props.numcourse}/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    numcourse: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0,
        numcourse: state.courses.present.length
    };
}

export default connect(mapStateToProps)(App);