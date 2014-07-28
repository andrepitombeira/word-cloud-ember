import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('topic-details', 'TopicDetailsComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});

test("show table", function() {
    ok(this.subject() instanceof Ember.Component);
    ok(this.$().find(':first-child').is('table'), 'is a table');
});

