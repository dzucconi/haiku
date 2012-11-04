(function () {
  'use strict';

  var Haiku = {
    size: function (word) {
      var size;

      word = word.toLowerCase();

      if (word.length === 0) { return 0; }
      if (word.length <= 3) { return 1; }

      size = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
                 .replace(/^y/, '')
                 .match(/[aeiouy]{1,2}/g).length;

      return size;
    },

    initialize: function () {
      var editor = document.getElementById('editor'),
          count = document.getElementById('count');

      editor.onkeyup = function () {
        var number_of_syllables = Haiku.size(editor.value);
        count.innerHTML = number_of_syllables;
      };
    }
  };

  window.onload = Haiku.initialize;
}());
