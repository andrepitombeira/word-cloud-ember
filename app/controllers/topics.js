/*global _:true*/
import Ember from 'ember';

export default Ember.ArrayController.extend({
    selectedTopic: null,

    topic: function() {
        return this.get('selectedTopic');
    }.property('selectedTopic.text'),

    generateTopics: function() {
        var topics = this.get('content.content');

        if (!topics || _.isEmpty(topics)) {
            return;
        }

        topics = _.map(topics, function(topic) {
            return Ember.Object.create(topic.get('data'));
        });

        return topics;
    },

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
        setTopic: function(topic) {
            this.set('selectedTopic', topic);
        }
    }
});
