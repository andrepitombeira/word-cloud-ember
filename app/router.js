import Ember from 'ember';

/**
 * Create application router
 * @class Router
 * @type {*|extend|void|Object|extend|extend}
 */
var Router = Ember.Router.extend({
  location: WordCloudEmberENV.locationType
});

Router.map(function() {
    //create a route for topics and set the path to root
    this.resource('topics', { path: '/' }, function() {

    });
});

export default Router;
