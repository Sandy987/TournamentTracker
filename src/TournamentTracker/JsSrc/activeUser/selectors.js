import { createSelector } from 'reselect'

//Don't use a selector here if we're just returning the object
export const getActiveUser = (state) => state.activeUser.user


// export const getVisibleTodos = createSelector(
//   [ getActiveUser ],
//   (visibilityFilter, todos) => {
//     switch (visibilityFilter) {
//       case 'SHOW_ALL':
//         return todos
//       case 'SHOW_COMPLETED':
//         return todos.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return todos.filter(t => !t.completed)
//     }
//   }
// )