import Route from 'ember-route';
import ajax from 'ember-ajax';
import config from 'github-pull-request/config/environment';

export default Route.extend({
  model() {
    let id = this.modelFor('pull').number;
    return ajax(`https://api.github.com/repos/ember-cli/ember-cli/pulls/${id}/commits?access_token=${config.github_token}`);
  }
});
