import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

/**
 * Application entry point. Create an ember application
 * @class Application
 */
var App = Ember.Application.extend({
  modulePrefix: 'word-cloud-ember',
  Resolver: Resolver
});

loadInitializers(App, 'word-cloud-ember');

export default App;
