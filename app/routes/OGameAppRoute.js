import Relay, {
  Route,
} from 'react-relay';

// TODO mirad e cambiar me por viewer
export default class OGameAppRoute extends Route {
  static queries = {
    me: () => Relay.QL`query { me }`,
  };
  static routeName = 'OGameAppRoute';
}
