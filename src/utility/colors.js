export const colorThemeHandler = light => {
  if (light) {
    return {
      note: {main: '#4E97CE', textColor: '#2F5B7D', background: '#ffffff'},
      todo: {main: '#75e1a4', textColor: '#5C7065', background: '#ffffff'},
      shopping: {main: '#FF84D6', textColor: '#705C69', background: '#ffffff'},
    };
  } else {
    return {
      note: {main: '#4E97CE', textColor: '#ffffff', background: '#2F5B7D'},
      todo: {main: '#75e1a4', textColor: '#ffffff', background: '#5C7065'},
      shopping: {main: '#FF84D6', textColor: '#ffffff', background: '#705C69'},
    };
  }
};
//npx react-native run-ios
//react-native start --reset-cache

// eval "$(/opt/homebrew/bin/brew shellenv)"
// eval "$(/opt/homebrew/bin/brew shellenv)"
