import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';

moduleFor('route:topics', 'TopicsRoute', {
    subject: function(options, factory) {
        return factory.create({
            store: { }
        });
    }
});

test('it exists', function() {
    expect(2);
    var route = this.subject();

    ok(route);
    ok(route instanceof Ember.Route);
});

test('#model', function() {
    expect(2);
    var route = this.subject();

    var expectedModel = {
        id: '1',
        label: 'label test',
        volume: 1,
        type: 'type test',
        sentiment: {
            "negative": 1,
            "neutral": 1,
            "positive": 1
        },
        sentimentScore: 1,
        burst: 1,
        days: [
            {
                date: '2014-06-06T00:00:00.000+0000',
                volume: 1
            }
        ],
        pageType: {
            "blog": 1
        },
        queries: [
            {
                id: 1751295897,
                name: 'Berghain',
                volume: 165
            }
        ]
    };

    route.store.find = function(type) {
        equal(type, 'topic');

        return expectedModel;
    };

    equal(route.model(), expectedModel, 'did not correctly invoke store');
});
