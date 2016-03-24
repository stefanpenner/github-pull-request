import Route from 'ember-route';
import ajax from 'ember-ajax';
import config from 'github-pull-request/config/environment';
import RSVP from  'rsvp';

export default Route.extend({
  model() {
    let pull = this.modelFor('pull');

    return RSVP.hash({
      pull,
      comments: ajax(`https://api.github.com/repos/ember-cli/ember-cli/issues/${pull.number}/comments?access_token=${config.github_token}`)
    });
  }
});
