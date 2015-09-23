// pulled from plainjs.com
module.exports =  {
  serializeArray: function(form) {
    var field, l, s = [];
    if (typeof form == 'object' && form.nodeName == "FORM") {
      var len = form.elements.length;
      for (i=0; i<len; i++) {
        field = form.elements[i];
        if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
          if (field.type == 'select-multiple') {
            l = form.elements[i].options.length;
            for (j=0; j<l; j++) {
              if(field.options[j].selected)
                s[s.length] = { name: field.name, value: field.options[j].value };
            }
          } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
              s[s.length] = { name: field.name, value: field.value };
          }
        }
      }
    }
    return s;
  },

  insertAfter: function(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  },

  insertBefore: function(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
  },

  addEvent: function(el, type, handler) {
    if (el.attachEvent) {
      el.attachEvent('on'+type, handler);
    }
    else  {
      el.addEventListener(type, handler);
    }
  },

  addClass: function(el, className) {
      if (el.classList) el.classList.add(className);
      else if (!hasClass(el, className)) el.className += ' ' + className;
  },

  removeClass: function(el, className) {
      if (el.classList) el.classList.remove(className);
      else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
  }
};
