import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
    it('should add course when passed CREATE_COURSE_SUCCESS', () => {
        // arrange
        const initialState = [
            { title: 'A' },
            { title: 'B' }
        ];

        const newCourse={title: 'C'};
        const action=actions.createCourseSuccess(newCourse);

        //act
        const newState=courseReducer(initialState, action);

        expect(newState.present.length).toEqual(1);
        expect(newState.present[0].title).toEqual('C');
    });

    it('should add course when passed UPDATE_COURSE_SUCCESS', () => {
        // arrange
        const initialState = [
            {id:'A', title: 'A' },
            {id:'B', title: 'B' },
            {id:'C', title: 'C' }
        ];
        const course={id:'B', title: 'New Title'};
        const action=actions.updateCourseSuccess(course);

        //act
        const newState=courseReducer(initialState, action);
        const udpatedCourse=newState.present[0];
        
        //assert
        expect(udpatedCourse.title).toEqual('New Title');
        //expect(untouchedCourse.title).toEqual('A');

    });
});