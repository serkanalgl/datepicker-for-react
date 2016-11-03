var getUniqueIdentifier = function() {
    return Math.random().toString(36).substr(2, 10);
}

var parentsHaveClassName = function(element, className) {
    var parent = element;
    while (parent) {
      if (parent.className && parent.className.indexOf(className) > -1)
        return true;

      parent = parent.parentNode;
    }

    return false;
}


export { getUniqueIdentifier, parentsHaveClassName };