import React from 'react-native';

import RouteList from './containers/routeList';
import Accounts from './containers/accounts';
import BattlesContainer from './containers/battles';
import Dojo from './containers/dojo';
import Battle from './containers/battle/battle';
import Game from './containers/game/game';

// redux:
import { Provider } from 'react-redux';
import createStore from './store';
const store = createStore();


const Router = {
  getList() {
    return {
      renderScene(nav) {
        return <RouteList navigator={nav} />
      },

      getTitle() {
        return 'Home';
      }
    }
  },

  getAccounts() {
    return {
      renderScene(nav) {
        return <Accounts navigator={nav} />
      },

      getTitle() {
        return 'Accounts';
      }
    }
  },

  getBattles() {
    return {
      renderScene(nav) {
        return <BattlesContainer navigator={nav} />
      },

      getTitle() {
        return 'Battles';
      }
    }
  },

  getDojo() {
    return {
      renderScene(nav) {
        return <Dojo navigator={nav} />;
      },

      getTitle() {
        return 'Dojo';
      }
    }
  },

  getBattle(battleId) {
    return {
      renderScene(nav) {
        return <Battle navigator={nav} battleId = {battleId}/>
      },

      getTitle() {
        return 'Battle Detail';
      }
    }
  },

  getGame(battleId) {
    return {
      renderScene(nav) {
        return (
          <Provider store={store}>
            <Game />
          </Provider>
        )
      },

      getTitle() {
        return 'Game';
      }
    }
  }
};

export default Router;
