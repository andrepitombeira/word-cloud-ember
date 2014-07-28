import { test, moduleForModel } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('topic', 'Topic', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();

  ok(model);
});

test('promise', function () {
    return Ember.run(function() {
        return new Ember.RSVP.Promise(function(resolve) {
            Ember.run.later(function(){

                ok(true, "correct");
                resolve("ok");
            }, 1000);
        });
    });
});
