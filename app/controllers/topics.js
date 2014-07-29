/*global _:true*/
import Ember from 'ember';

/**
 * Controller responsible for handling topics model
 * @class TopicsController
 */
export default Ember.ArrayController.extend({
    selectedTopic: null,

    /**
     * Topic selected on the word cloud by user. This property is used in topic details component
     * @property topic
     * @type {Object}
     */
    topic: function() {
        return this.get('selectedTopic');
    }.property('selectedTopic'),

    /**
     * Load the topics from fixtures and transform each item in a ember object.
     * @method generateTopics
     * @return {Array} Returns topics
     */
    generateTopics: function() {
        var topics = this.get('content.content');

        if (!topics || _.isEmpty(topics)) {
            return topics;
        }

        topics = _.map(topics, function(topic) {
            return Ember.Object.create(topic.get('data'));
        });

        return topics;
    },

    /**
     * Topics load from fixtures
     * @property topics
     * @type {Object} Returns topics
     */
    topics: function() {
        var topics = this.generateTopics();

        if (topics) {
            topics = topics.map(function(topic) {
                return _.pick(topic, ['label', 'sentimentScore', 'volume', 'sentiment']);
            });
        }

        return topics;
    }.property('@each.label', '@each.sentimentScore', '@each.volume', '@each.sentiment'),

    actions: {
        /**
         * Set selected topic
         * @method setSelectedTopic
         * @param {Object} selected topic
         */
        setSelectedTopic: function(topic) {
            this.set('selectedTopic', topic);
        }
    }
});
