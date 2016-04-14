/**
 * Application controller view
 * Starts application, inits a new CommentCollection collection, assigns the empty list to
 * a CommentlistView controller, also inits a NewButtonView instance to handle new comment insertion.
 *
 * Check index.html to find the place where App is initialized, it's right after the container
 * DOM node is rendered.
 *
 * @class App
 * @extends Backbone.View
 * @author Bodnar Istvan <istvan@gawker.com>
 */

import 'demo.css';

define([
  'backbone',
  'jquery',
  'model/commentcollection',
  'view/newbuttonview',
  'view/randombuttonview',
  'view/listview'
], function (Backbone,
             $,
             CommentCollection,
             NewButtonView,
             RandomButtonView,
             CommentlistView) {
  var App = Backbone.View.extend(
    /** @lends App.prototype */
    {
      /**
       * Initialize new application instance
       */
      initialize: function () {
        // create empty comment collection
        const getDirectText = el => $(el).clone().children().remove().end().text();

        const $comments = $('ul.commentlist > li');
        const preRenderedData = $comments.map((index, el) => ({
          author: $(el).find('strong').text(),
          text: getDirectText(el).trim(),
        })).get();
        var collection = new CommentCollection(preRenderedData);

        // bind the NewButtonView to the already rendered 'newcomment' DOM element, we'll need to know the
        // collection to work with so FormView can insert the new comment properly
        new NewButtonView({ collection: collection, el: this.$el.find('.newcomment') });

        // bind the RandomButtonView to the already rendered 'randomcomment' DOM element
        new RandomButtonView({ collection: collection, el: this.$el.find('.randomcomment') });

        // create comment list view, assign our empty collection
        new CommentlistView({ collection: collection, el: this.$el.find('.commentlist') });
      }
    }
  );

  /* i'm not sure about this at all */
  window.App = App;
  window.$ = $;

  //return App;
});

/**
 * Documentation related comments
 */
/**
 * @name Backbone
 * @class Backbone
 * Application is a Backbone based application
 * @link http://documentcloud.github.com/backbone/
 */


/**
 * @name Backbone.Model
 * @class Backbone.Model
 * Backbone model superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.Collection
 * @class Backbone.Collection
 * Backbone collection superclass
 * @link http://documentcloud.github.com/backbone/
 */

/**
 * @name Backbone.View
 * @class Backbone.View
 * By default all views extend Backbone.View
 * @link http://documentcloud.github.com/backbone/
 */

