import Ember from 'ember';

var Router = Ember.Router.extend({
  location: WordCloudEmberENV.locationType
});

Router.map(function() {
    this.resource('topics', {path: ''}, function() {

    });
});

export default Router;
