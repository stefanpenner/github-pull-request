import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('pull', { path: 'pull/:id' }, function() {
    this.route('conversation');
    this.route('commits');
    this.route('files');
    this.route('comments');
  });
});

export default Router;
