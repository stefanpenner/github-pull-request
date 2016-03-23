import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('octicon-comment-discussion', 'Integration | Component | octicon comment discussion', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{octicon-comment-discussion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#octicon-comment-discussion}}
      template block text
    {{/octicon-comment-discussion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
