import startApp from '../helpers/start-app';
import Resolver from '../helpers/resolver';
import Ember from 'ember';

var App;

module('Acceptance: Topics', {
    setup: function() {
        var topic = Resolver.resolve('model:topic');
        topic.reopenClass({
            FIXTURES: [
                {
                    "id": "1751295897__Berlin",
                    "label": "Berlin",
                    "volume": 165,
                    "type": "topic",
                    "sentiment": {
                        "negative": 3,
                        "neutral": 133,
                        "positive": 29
                    },
                    "sentimentScore": 65
                },
                {
                    "id": "1751295897__DJ",
                    "label": "DJ",
                    "volume": 48,
                    "type": "topic",
                    "sentiment": {
                        "neutral": 46,
                        "positive": 2
                    },
                    "sentimentScore": 54
                },
                {
                    "id": "1751295897__Ostgut Ton",
                    "label": "Ostgut Ton",
                    "volume": 24,
                    "type": "topic",
                    "sentiment": {
                        "neutral": 22,
                        "positive": 2
                    },
                    "sentimentScore": 58
                }
            ]});

        App = startApp();
    },

    teardown: function() {
        Ember.run(App, 'destroy');
    }
});

function exists(selector) {
    return !!window.find(selector).length;
}

test('visiting /topics', function() {
  visit('/');

  andThen(function() {
    equal(currentPath(), 'topics.index');
  });
});

test('topics renders', function() {
    expect(5);

    visit('/');

    andThen(function() {
        ok(exists('#div-header'));
        ok(exists('#div-word-cloud'));
        ok(exists('#div-topic-details'));
        ok(exists('#word-cloud-topics'));
        ok(exists('#table-topic-details'));
    });
});

test('show all words', function() {
    visit('/');

    andThen(function() {
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(1)').text(), 'Berlin');
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(2)').text(),'Ostgut Ton');
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(3)').text(),'DJ');
    });
});

test('click word', function() {
    visit('/');

    andThen(function() {
        click('#word-cloud-topics :first :nth-child(1)').then(function(){
            ok( true, "word was clicked!" );
        });
    });
});


