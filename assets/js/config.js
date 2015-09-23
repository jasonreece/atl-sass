var utils = require('./utilities.js');

module.exports =  {
  init: function() {
    // addDirectory();
    bindEvent('.js-btn-save', 'click', saveDirectory);
    // buildConfig();
  }
};

// config constructor
var Config = function(sassDirectory, sassImportFile, modulesDirectory, modulesImportFile, pathToSassDirectory) {
  this.sassDirectory = sassDirectory || 'stylesheets';
  this.sassImportFile = sassImportFile || 'application.scss';
  this.modulesDirectory = modulesDirectory || 'modules';
  this.modulesImportFile = modulesImportFile || '_modules.scss';
  this.pathToSassDirectory = pathToSassDirectory || './';
};

// organizes Config Constructor data into object
Config.prototype.data = function() {
  if (this.sassImportFile.indexOf('.scss') === -1) {
    this.sassImportFile += '.scss';
  }

  if (this.modulesImportFile.indexOf('.scss') === -1) {
    this.modulesImportFile += '.scss';
  }

  var sort = sortDirectories();

  return {
    'settings':  {
      'root':  {
        'pathToSassDirectory': this.pathToSassDirectory,
        'sassDirectory': this.sassDirectory,
        'sassImportFile': this.sassImportFile
      },
      'modules': {
        'modulesDirectory': this.modulesDirectory,
        'modulesImportFile': this.modulesImportFile,
        'moduleFiles': []
      }
    },
    "template": {
      "directories": sort.directories,
      "files": sort.files
    }
  };
};

// creates new instance of config constructor based off of serialized data from form inputs
function createConfig() {
  var form = document.querySelector('form');
  var data = utils.serializeArray(form);
  var config = new Config(data[0].value, data[1].value, data[2].value, data[3].value, data[4].value);
  console.log(data);
  displayConfig(config.data());
}

// displays json data at bottom of page
function displayConfig(obj) {
  var container = document.querySelector('.js-display-config');
  var data = JSON.stringify(obj, null, 2);
  container.innerHTML = '<pre><code>' + data + '</code></pre>';
}

// button to add new directories
function addDirectory() {
  var btn = document.querySelector('.js-btn-directory button');
  var container = document.querySelector('.js-directories');
  // add click listener to the directory button
  utils.addEvent(btn, 'click', function(e) {
    e.preventDefault();
    // insert the div before the button
    container.innerHTML += '<div class="form__flex-wrapper"><input type="text" class="form__flex-input" placeholder="directory name" data-type="directory"><button class="js-btn-save btn-save">save</button></div><div class="js-files"></div>';
    // bind the click on the new save button
    bindEvent('.js-btn-save', 'click', saveDirectory);

    // remove the add directories button
  this.parentNode.removeChild(this);
  });
}

// save directory click handler
function saveDirectory(e) {
  e.preventDefault();
  // save a reference to the button
  var btn = this;
  // save a reference to the input
  var input = this.previousSibling.previousSibling;

  // set the attrs on the  input
  input.setAttribute('name', input.value);
  input.setAttribute('id', input.value);
  input.setAttribute('value', input.value);

  // change the save btn to the delete btn
  btn.innerHTML = 'delete';
  utils.removeClass(this, 'js-btn-save');
  utils.removeClass(this, 'btn-save');
  utils.addClass(this, 'js-btn-delete');
  utils.addClass(this, 'btn-delete');

  // bind the click on the new delete btn
  bindEvent('.js-btn-delete', 'click', deleteDirectory);

  // generate a new config
  createConfig();
}


// delete directory click handler
function deleteDirectory(e) {
  e.preventDefault();
  // create reference to the parent container
  var container = this.parentNode;
  // remove the container
  container.parentNode.removeChild(container);
  createConfig();
}

// attempt at sorting directories
function sortDirectories() {
  var inputs = document.querySelectorAll('input');
  var template = {
    directories: [],
    files: []
  };
  for (var i = 0; i < inputs.length; i++) {
    if ( inputs[i].getAttribute('data-type', 'directory') === 'directory' ){
      if (inputs[i].value) {
        template.directories.push(inputs[i].value);
      }
    }
    if ( inputs[i].getAttribute('data-type', 'file') === 'file' ){
      if (inputs[i].value) {
        template.files.push(inputs[i].value);
      }
    }
  }

  return template;
}

function bindEvent(el, event, fn) {
  el = document.querySelectorAll(el);
  if (el.length ) {
    for (var i = 0; i < el.length; i++) {
      utils.addEvent(el[i], event, fn);
    }
  }
}

// submit button for config
function buildConfig() {
  var btn = document.querySelector('.js-btn-submit');
  utils.addEvent(btn, 'click', function(e) {
    e.preventDefault();
    createConfig();
  });
}

