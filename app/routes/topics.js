import Ember from 'ember';

/**
 * Route for topic
 * @class TopicRoute
 */
export default Ember.Route.extend({

    /**
     * Load topics from topic fixtures
     * @method model
     * @returns topics
     */
    model: function() {
        return this.store.find('topic');
    }
});
