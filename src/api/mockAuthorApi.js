import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const authors = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  },
  {
    id: 'james-smith',
    firstName: 'James',
    lastName: 'Smith'
  },
  {
    id: 'maria-garcia',
    firstName: 'Maria',
    lastName: 'Garcia'
  },
  {
    id: 'mary-rodriguez',
    firstName: 'Mary',
    lastName: 'Rodriguez'
  },
  {
    id: 'aiden-emily',
    firstName: 'Aiden',
    lastName: 'Emily'
  },
  {
    id: 'hamza-thompson',
    firstName: 'Hamza',
    lastName: 'Thompson'
  },
  {
    id: 'musa-jackson',
    firstName: 'Musa',
    lastName: 'Jackson'
  },
  {
    id: 'owen-hill',
    firstName: 'Owen',
    lastName: 'Hill'
  },
  {
    id: 'robert-wright',
    firstName: 'Robert',
    lastName: 'Wright'
  },
  {
    id: 'syed-walker',
    firstName: 'Syed',
    lastName: 'Walker'
  },
  {
    id: 'maxwell-lewis',
    firstName: 'Maxwell',
    lastName: 'Lewis'
  },
  {
    id: 'leighton-robinson',
    firstName: 'Leighton',
    lastName: 'Robinson'
  },
  {
    id: 'kacper-martinez',
    firstName: 'Kacper',
    lastName: 'Martinez'
  },
  {
    id: 'yahya-anderson',
    firstName: 'Yahya',
    lastName: 'Anderson'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (author) => {
  return author.firstName.toLowerCase() + '-' + author.lastName.toLowerCase();
};

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], authors));
      }, delay);
    });
  }

  static saveAuthor(author) {
	author = Object.assign({}, author); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minAuthorNameLength = 3;
        if (author.firstName.length < minAuthorNameLength) {
          reject(`First Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.lastName.length < minAuthorNameLength) {
          reject(`Last Name must be at least ${minAuthorNameLength} characters.`);
        }

        if (author.id) {
          const existingAuthorIndex = authors.findIndex(a => a.id == author.id);
          authors.splice(existingAuthorIndex, 1, author);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new authors in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          author.id = generateId(author);
          authors.push(author);
        }

        resolve(author);
      }, delay);
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfAuthorToDelete = authors.findIndex(author => {
          author.id == authorId;
        });
        const deletedAuthor = authors.splice(indexOfAuthorToDelete, 1);
        resolve(deletedAuthor[0]);
      }, delay);
    });
  }
}

export default AuthorApi;
