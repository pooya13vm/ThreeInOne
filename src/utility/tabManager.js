import NoteNavigator from '../note/noteNavigation';
import ShoppingNavigator from '../shopping/shoppingNavigation';
import TodoNavigator from '../todo/TodoNavigation';
export const tabManager = type => {
  switch (type) {
    case 'NST':
      return [
        {
          name: 'Note',
          component: NoteNavigator,
          color: '#4e97ce',
          iconName: 'text',
        },
        {
          name: 'Shopping',
          component: ShoppingNavigator,
          color: 'red',
          iconName: 'shopping-cart',
        },
        {
          name: 'To do',
          component: TodoNavigator,
          color: '#75e1a4',
          iconName: 'list',
        },
      ];
      break;
    case 'NTS':
      return [
        {
          name: 'Note',
          component: NoteNavigator,
          color: '#4e97ce',
          iconName: 'text',
        },
        {
          name: 'To do',
          component: TodoNavigator,
          color: '#75e1a4',
          iconName: 'list',
        },
        {
          name: 'Shopping',
          component: ShoppingNavigator,
          color: 'red',
          iconName: 'shopping-cart',
        },
      ];
      break;
    case 'TSN':
      return [
        {
          name: 'To do',
          component: TodoNavigator,
          color: '#75e1a4',
          iconName: 'list',
        },
        {
          name: 'Shopping',
          component: ShoppingNavigator,
          color: 'red',
          iconName: 'shopping-cart',
        },
        {
          name: 'Note',
          component: NoteNavigator,
          color: '#4e97ce',
          iconName: 'text',
        },
      ];
      break;
    case 'TNS':
      return [
        {
          name: 'To do',
          component: TodoNavigator,
          color: '#75e1a4',
          iconName: 'list',
        },
        {
          name: 'Note',
          component: NoteNavigator,
          color: '#4e97ce',
          iconName: 'text',
        },
        {
          name: 'Shopping',
          component: ShoppingNavigator,
          color: 'red',
          iconName: 'shopping-cart',
        },
      ];
      break;
    case 'SNT':
      return [
        {
          name: 'Shopping',
          component: ShoppingNavigator,
          color: 'red',
          iconName: 'shopping-cart',
        },
        {
          name: 'Note',
          component: NoteNavigator,
          color: '#4e97ce',
          iconName: 'text',
        },
        {
          name: 'To do',
          component: TodoNavigator,
          color: '#75e1a4',
          iconName: 'list',
        },
      ];
      break;
    case 'STN':
      return [
        {
          name: 'Shopping',
          component: ShoppingNavigator,
          color: 'red',
          iconName: 'shopping-cart',
        },
        {
          name: 'To do',
          component: TodoNavigator,
          color: '#75e1a4',
          iconName: 'list',
        },
        {
          name: 'Note',
          component: NoteNavigator,
          color: '#4e97ce',
          iconName: 'text',
        },
      ];
      break;

    default:
      break;
  }
};
