import Route from 'ember-route';
import ajax from 'ember-ajax';
import config from 'github-pull-request/config/environment';

export default Route.extend({
  redirect({ number }) {
    this.redirectTo('pull.conversation', number);
  },

  model({ id }) {
    return ajax(`https://api.github.com/repos/ember-cli/ember-cli/pulls/${id}?access_token=${config.github_token}`);
  }
});
