import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('word-cloud', 'Unit - WordCloudComponent');

test('render word cloud component', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});



