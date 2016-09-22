
(function(Modules) {
  "use strict";

  var RepeatElement = function() {
    this.start = function($element) {

      this.repeatOn = $element.data('repeat-on');
      //url of database
      this.repeatData = $element.data('repeat-data')

      $element.on('click', '.js-href', () => console.log('sdfdsfsdf'))

      this.element = $element
      this.parent = $element.parent()

      //hide elemenet if data is async to minic delay from database
      this.getElementData()

    }
  };

  RepeatElement.prototype.getElementData = function() {
    $.get({
      url: this.repeatData
    })
    .success((inputToRepeat) => {
      //once have data, call this.iterateOverData with the data from database
      //and reference to orginal node to clone
      this.iterateOverData(this.element[0], inputToRepeat)
    })
  }

  RepeatElement.prototype.interpolateTextContent = function(string, inputToRepeat){
      //split values
      const inputData = string.split('.')

      const key = inputData[0]
      const value = inputData[1]

      return inputToRepeat[value]
  }

  RepeatElement.prototype.loopOverChildNodes = function(nodes, inputToRepeat){

      let children = nodes.children
      const test = /{\s*([^}]+)\s*}/

      //loop over all children nodes
      for(var i=0;i<children.length;i++){
          //check to see if any data-href child nodes exist
          if ($(children[i]).data('href')) {
            const hrefDataValueString = $(children[i]).data('href')
            const hrefDataElement = $(children[i])
            //add <a href> with the value of interpolatd data-href value
            hrefDataElement[0].href = hrefDataValueString.replace(test, (a, b) =>
              this.interpolateTextContent(b, inputToRepeat))
            //remove data-href tag
            hrefDataElement[0].removeAttribute('data-href')
          }

          //check to see if any data-if child nodes exist
          if ($(children[i]).data('if')) {
            const ifDataValueString = $(children[i]).data('if')
            const ifChildren = $(children[i].children)
            //determine where 'if' value returns true/false
            const truthify = ifDataValueString.replace(test, (a, b) =>
              this.interpolateTextContent(b, inputToRepeat))
            //set display to either true/false
            const display = (truthify === "true") ? true : false

            //loop through all ifChildren to find nodes with class js-true or js-false
            //look for more eleqount way of determining this outcomes
            for(i=0;i<ifChildren.length;i++){
              if (display){
                //if js-false - hide element
                if (ifChildren[i].classList.contains('js-false')) {
                  $(ifChildren[i]).css("display", "none")
                } else {
                  $(ifChildren[i]).css("display", "show")
                }
              } else {
                //if js-true - show element
                if (ifChildren[i].classList.contains('js-true')) {
                  $(ifChildren[i]).css("display", "none")
                } else {
                  $(ifChildren[i]).css("display", "show")
                }
              }

            }

        }
        // test all children nodes to see if text content should be interpolated
        //i.e. {textContent}
       if (test.test(children[i].textContent))
          //change textcontent
       		children[i].textContent = children[i].textContent.replace(test, (a, b) =>
            this.interpolateTextContent(b, inputToRepeat))
        }

    return nodes
  }


  RepeatElement.prototype.appendToParentElement = function(docFrag){
    //append the dogFrac to the repeatElement parent
    this.parent.append(docFrag)
  }


  RepeatElement.prototype.iterateOverData = function(element, data, docFrag, length){

    if (length === 0) return this.appendToParentElement(docFrag)
    var length = length ? length - 1 : data.length - 1

    //keep reference to original Node for future cloning template
    const clonedElement = element.cloneNode(true)

    //node element to be looped over where all textContent will be interpolated if needed
    const clonedNode = element
    this.loopOverChildNodes(clonedNode, data[length])

    //append all cloned nodes to docFrac on every iteration for better performance
    var docFrag = docFrag || document.createDocumentFragment()
    docFrag.appendChild(clonedNode)

    //iterate for the data provided length, passing in clonedElement for reference,
    //and docFrag to append new repeated element
    this.iterateOverData(clonedElement, data, docFrag, length)
  }

  Modules.RepeatElement = RepeatElement
})(window.GOVUK.Modules);
