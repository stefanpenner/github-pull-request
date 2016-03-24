import Component from 'ember-component';
import stateFor from 'ember-state-services/state-for';

export default Component.extend({
  state: stateFor('comment', 'pull'),

  init() {
    this._super(...arguments);
    this.set('state.value', 'OMGG');
  },

  actions: {
    saveComment(commentText, event) {
      event.preventDefault();
      this.set('state.value', null);
    }
  }
});
