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
                    "id": "1751295897__Hammered",
                    "label": "Hammered",
                    "volume": 48,
                    "type": "topic",
                    "sentiment": {
                        "neutral": 18,
                        "negative": 30
                    },
                    "sentimentScore": 20
                },
                {
                    "id": "1751295897__Barcelona",
                    "label": "Barcelona",
                    "volume": 7,
                    "type": "topic",
                    "sentiment": {
                        "neutral": 7
                    },
                    "sentimentScore": 50
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

test('should visiting /topics', function() {
  visit('/');

  andThen(function() {
    equal(currentPath(), 'topics.index');
  });
});

test('should render', function() {
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

test('should show all words', function() {
    visit('/');

    andThen(function() {
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(1)').text(), 'Berlin');
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(2)').text(),'Barcelona');
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(3)').text(),'Hammered');
    });
});

test('should click on a word', function() {
    visit('/');

    andThen(function() {
        click('#word-cloud-topics :first :nth-child(1)').then(function(){
            ok( true, "word was clicked!" );
        });
    });
});

test('word should have green color', function() {
    visit('/');

    andThen(function() {
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(1)').css("fill"), 'rgb(0, 128, 0)');
    });
});

test('word should have gray color', function() {
    visit('/');

    andThen(function() {
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(2)').css("fill"), 'rgb(128, 128, 128)');
    });
});

test('word should have red color', function() {
    visit('/');

    andThen(function() {
        equal(find('#word-cloud-topics').children(":first").find(':nth-child(3)').css("fill"), 'rgb(255, 0, 0)');
    });
});


