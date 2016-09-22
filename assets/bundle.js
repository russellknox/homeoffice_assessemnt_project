'use strict';

$(document).ready(function () {
  GOVUK.modules.start();
});

(function (global) {
  "use strict";

  var $ = global.jQuery;
  var GOVUK = global.GOVUK || {};
  GOVUK.Modules = GOVUK.Modules || {};

  GOVUK.modules = {
    find: function find(container) {
      var modules,
          moduleSelector = '[data-module]',
          container = container || $('body');

      modules = container.find(moduleSelector);

      // Container could be a module too
      if (container.is(moduleSelector)) {
        modules = modules.add(container);
      }

      return modules;
    },

    start: function start(container) {
      var modules = this.find(container);

      for (var i = 0, l = modules.length; i < l; i++) {
        var module,
            element = $(modules[i]),
            type = camelCaseAndCapitalise(element.data('module')),
            started = element.data('module-started');

        if (typeof GOVUK.Modules[type] === "function" && !started) {
          module = new GOVUK.Modules[type]();
          module.start(element);
          element.data('module-started', true);
        }
      }

      // eg selectable-table to SelectableTable
      function camelCaseAndCapitalise(string) {
        return capitaliseFirstLetter(camelCase(string));
      }

      // http://stackoverflow.com/questions/6660977/convert-hyphens-to-camel-case-camelcase
      function camelCase(string) {
        return string.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
      }

      // http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
      function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }
  };

  global.GOVUK = GOVUK;
})(window);
'use strict';

(function (window) {

  $ = window.jQuery;

  $('.js-shortList').on('click', function () {

    var applicantId = $(this).data('id');

    $.post({
      url: 'shortList/' + applicantId,
      data: {
        applicantId: applicantId
      }
    }).success(function (response) {
      console.log('response');
      location.reload();
    });
  });
})(window);
'use strict';

(function (Modules) {
  "use strict";

  var RepeatElement = function RepeatElement() {
    this.start = function ($element) {

      this.repeatOn = $element.data('repeat-on');
      //url of database
      this.repeatData = $element.data('repeat-data');

      $element.on('click', '.js-href', function () {
        return console.log('sdfdsfsdf');
      });

      this.element = $element;
      this.parent = $element.parent();

      //hide elemenet if data is async to minic delay from database
      this.getElementData();
    };
  };

  RepeatElement.prototype.getElementData = function () {
    var _this = this;

    $.get({
      url: this.repeatData
    }).success(function (inputToRepeat) {
      //once have data, call this.iterateOverData with the data from database
      //and reference to orginal node to clone
      _this.iterateOverData(_this.element[0], inputToRepeat);
    });
  };

  RepeatElement.prototype.interpolateTextContent = function (string, inputToRepeat) {
    //split values
    var inputData = string.split('.');

    var key = inputData[0];
    var value = inputData[1];

    return inputToRepeat[value];
  };

  RepeatElement.prototype.loopOverChildNodes = function (nodes, inputToRepeat) {
    var _this2 = this;

    var children = nodes.children;
    var test = /{\s*([^}]+)\s*}/;

    //loop over all children nodes
    for (var i = 0; i < children.length; i++) {
      //check to see if any data-href child nodes exist
      if ($(children[i]).data('href')) {
        var hrefDataValueString = $(children[i]).data('href');
        var hrefDataElement = $(children[i]);
        //add <a href> with the value of interpolatd data-href value
        hrefDataElement[0].href = hrefDataValueString.replace(test, function (a, b) {
          return _this2.interpolateTextContent(b, inputToRepeat);
        });
        //remove data-href tag
        hrefDataElement[0].removeAttribute('data-href');
      }

      //check to see if any data-if child nodes exist
      if ($(children[i]).data('if')) {
        var ifDataValueString = $(children[i]).data('if');
        var ifChildren = $(children[i].children);
        //determine where 'if' value returns true/false
        var truthify = ifDataValueString.replace(test, function (a, b) {
          return _this2.interpolateTextContent(b, inputToRepeat);
        });
        //set display to either true/false
        var display = truthify === "true" ? true : false;

        //loop through all ifChildren to find nodes with class js-true or js-false
        //look for more eleqount way of determining this outcomes
        for (i = 0; i < ifChildren.length; i++) {
          if (display) {
            //if js-false - hide element
            if (ifChildren[i].classList.contains('js-false')) {
              $(ifChildren[i]).css("display", "none");
            } else {
              $(ifChildren[i]).css("display", "show");
            }
          } else {
            //if js-true - show element
            if (ifChildren[i].classList.contains('js-true')) {
              $(ifChildren[i]).css("display", "none");
            } else {
              $(ifChildren[i]).css("display", "show");
            }
          }
        }
      }
      // test all children nodes to see if text content should be interpolated
      //i.e. {textContent}
      if (test.test(children[i].textContent))
        //change textcontent
        children[i].textContent = children[i].textContent.replace(test, function (a, b) {
          return _this2.interpolateTextContent(b, inputToRepeat);
        });
    }

    return nodes;
  };

  RepeatElement.prototype.appendToParentElement = function (docFrag) {
    //append the dogFrac to the repeatElement parent
    this.parent.append(docFrag);
  };

  RepeatElement.prototype.iterateOverData = function (element, data, docFrag, length) {

    if (length === 0) return this.appendToParentElement(docFrag);
    var length = length ? length - 1 : data.length - 1;

    //keep reference to original Node for future cloning template
    var clonedElement = element.cloneNode(true);

    //node element to be looped over where all textContent will be interpolated if needed
    var clonedNode = element;
    this.loopOverChildNodes(clonedNode, data[length]);

    //append all cloned nodes to docFrac on every iteration for better performance
    var docFrag = docFrag || document.createDocumentFragment();
    docFrag.appendChild(clonedNode);

    //iterate for the data provided length, passing in clonedElement for reference,
    //and docFrag to append new repeated element
    this.iterateOverData(clonedElement, data, docFrag, length);
  };

  Modules.RepeatElement = RepeatElement;
})(window.GOVUK.Modules);