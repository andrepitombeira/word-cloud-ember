import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('topic-details', 'Unit - TopicDetailsComponent');

test('render topic details component', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});

test("show topic details table", function() {
    ok(this.subject() instanceof Ember.Component);
    ok(this.$().find(':first-child').is('table'), 'is a table');
});

