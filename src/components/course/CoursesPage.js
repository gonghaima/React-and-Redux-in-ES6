import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends Component {
    constructor(props, context) {
        super(props, context);

    }
    courseRow(course, index){
        return <div key={index}>{course.title}</div>;
    }
    render() {
        console.log(`this.props.courses: ${this.props.courses}`);
        return (
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
            </div>
        );
    }
}
CoursesPage.propTypes={
    courses: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps){
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);