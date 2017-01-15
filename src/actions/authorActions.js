import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors){
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors(){
    return dispatch=>{
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then(authors=>{
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error=>{
            throw(error);
        });
    };
}

export function saveAuthor(author) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return AuthorApi.saveAuthor(author).then(savedAuthor => {
            author.id ?
                dispatch(updateCourseSuccess(savedAuthor))
                : dispatch(createCourseSuccess(savedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw (error);
        });
    };
}