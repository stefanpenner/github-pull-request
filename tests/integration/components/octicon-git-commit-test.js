import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('octicon-git-commit', 'Integration | Component | octicon git commit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{octicon-git-commit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#octicon-git-commit}}
      template block text
    {{/octicon-git-commit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
