import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('octicon-diff', 'Integration | Component | octicon diff', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{octicon-diff}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#octicon-diff}}
      template block text
    {{/octicon-diff}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
