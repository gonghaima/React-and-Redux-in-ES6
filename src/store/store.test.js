import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function () {
    it('Should handle creating courses', function () {
        //arrange
        const store = createStore(rootReducer, initialState);
        const course = {
            title: "Clean Code"
        };

        //act
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        //assert
        const actual = store.getState().courses.present[0];
        // const actualState = store.getState();
        // debugger;
        // const actualCourses=actualState.courses;
        // debugger;
        const expected = {
            title: "Clean Code"
        };

        expect(actual).toEqual(expected);
    });
});