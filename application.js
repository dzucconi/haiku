(function () {
  'use strict';

  var Haiku = {
    size: function (word) {
      var syllableCount = 0,
        prefixSuffixCount = 0,
        wordPartCount = 0,
        problemWords,
        subSyllables,
        addSyllables,
        prefixSuffix;

      // Prepare word - make lower case and remove non-word characters
      word = word.toLowerCase().replace(/[^a-z]/g,"");

      // Specific common exceptions that don't follow the rule set below are handled individually
      // Array of problem words (with word as key, syllable count as value)
      problemWords = {
        "simile": 3,
        "forever": 3,
        "shoreline": 2,
        "changes": 2
      };

      // Return if we've hit one of those...
      if (problemWords[word]) { return problemWords[word]; }

      // These syllables would be counted as two but should be one
      subSyllables = [
        /cial/,
        /tia/,
        /cius/,
        /cious/,
        /giu/,
        /ion/,
        /iou/,
        /sia$/,
        /[^aeiuoyt]{2,}ed$/,
        /.ely$/,
        /[cg]h?e[rsd]?$/,
        /rved?$/,
        /[aeiouy][dt]es?$/,
        /[aeiouy][^aeiouydt]e[rsd]?$/,
        /^[dr]e[aeiou][^aeiou]+$/, // Sorts out deal, deign etc
        /[aeiouy]rse$/ // Purse, hearse
      ];

      // These syllables would be counted as one but should be two
      addSyllables = [
        /ia/,
        /riet/,
        /dien/,
        /iu/,
        /io/,
        /ii/,
        /[aeiouym]bl$/,
        /[aeiou]{3}/,
        /^mc/,
        /ism$/,
        /([^aeiouy])\1l$/,
        /[^l]lien/,
        /^coa[dglx]./,
        /[^gq]ua[^auieo]/,
        /dnt$/,
        /uity$/,
        /ie(r|st)$/
      ];

      // Single syllable prefixes and suffixes
      prefixSuffix = [
        /^un/,
        /^fore/,
        /ly$/,
        /less$/,
        /ful$/,
        /ers?$/,
        /ings?$/
      ];

      // Remove prefixes and suffixes and count how many were taken
      prefixSuffix.forEach(function(regex) {
        if (word.match(regex)) {
          word = word.replace(regex,"");
          prefixSuffixCount ++;
        }
      });

      wordPartCount = word
        .split(/[^aeiouy]+/ig)
        .filter(function(wordPart) {
          return !!wordPart.replace(/\s+/ig,"").length;
        })
        .length;

      // Get preliminary syllable count...
      syllableCount = wordPartCount + prefixSuffixCount;

      // Some syllables do not follow normal rules - check for them
      subSyllables.forEach(function(syllable) {
        if (word.match(syllable)) { syllableCount --; }
      });

      addSyllables.forEach(function(syllable) {
        if (word.match(syllable)) { syllableCount ++; }
      });

      return syllableCount || 0;
    },

    initialize: function () {
      var editor = document.getElementById('editor'),
          count = document.getElementById('count');

      editor.onkeyup = function () {
        var lines = editor.value.split('\n'),
            sizes = lines.map(function (line) {
              return line.split(' ').map(function (word) {
                return Haiku.size(word);
              }).reduce(function (memo, num) {
                return memo + num;
              });
            });
        
        count.innerHTML = sizes.join('<br>');
      };
    }
  };

  window.onload = Haiku.initialize;
}());
