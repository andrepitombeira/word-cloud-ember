import { test, moduleFor } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:topics', 'TopicsController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

function mock(properties) {
    return Ember.Object.create(properties || {});
}

test('get topics', function() {
    var topic1 = mock({ label: 'label test' });
    var topic2 = mock({ label: 'label test' });
    var topic3 = mock({ label: 'label test' });

    var controller = this.subject({
        model: [
            topic1,
            topic2,
            topic3,
        ]
    });

    deepEqual(controller.get('content'), [topic1, topic2, topic3]);
});

test('set selected topic', function() {
    var controller = this.subject();
    var topic1 = mock({ label: 'label test' });

    equal(controller.selectedTopic, null);

    controller.set('selectedTopic', topic1);

    deepEqual(controller.selectedTopic, topic1);
});

test('get selected topic', function() {
    var topic1 = mock({ label: 'label test' });

    var controller = this.subject({
        selectedTopic: topic1
    });

    deepEqual(controller.selectedTopic, topic1);
});





