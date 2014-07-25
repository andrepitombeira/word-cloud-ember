/*global _:true*/
import Ember from 'ember';

export default Ember.ArrayController.extend({
    generateTopics: function() {
        var topics = this.get("content.content");

        topics = _.map(topics, function(topic) {
            return Ember.Object.create(topic.get('data'));
        });

        return topics;
    },

    topics: function() {
        var topics = this.generateTopics().map(function(topic) {
            return _.pick(topic, ["label","sentimentScore"]);
        });

        return topics;
    }.property('@each.label', '@each.sentimentScore')
});
