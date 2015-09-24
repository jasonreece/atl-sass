#!/usr/bin/env node

var fs = require('fs');
var prompt = require('prompt');

init();

function init() {
  prompt.start();

  // customize the prompt message and delimiter
  prompt.message = "New Post?".red;
  prompt.delimiter = " ".green;

  // get the info
  prompt.get([
    {
      name: 'title',
      description: 'add a title'.green
    },
    {
      name: 'excerpt',
      description: 'add an excerpt'.green
    },
    {
      name: 'date',
      description: 'add a date (yyyy-mm-dd)'.green
    },
    {
      name: 'time',
      description: 'add the time'.green
    },
    {
      name: 'rsvp',
      description: 'add the rsvp id from Meetup.com'.green
    }
  ],

  function (err, result) {
    // write out the file with the passed in options
    fs.writeFileSync(getFileName(result), writeText(result));

    // provide a success message
    writeSuccessMessage(result);
  });
}

function getFileName(result) {
  var fileName = './_posts/' + result.date + '-' + result.title.replace(/\s+/g, '-').toLowerCase() + '.md';
  return fileName;
}

function writeText(result) {
  // create the text for the file
  var text = '---\n';
  text += 'layout: post\n'
  text += 'title: "' + result.title + '"\n'
  text += 'excerpt: "' + result.excerpt + '"\n'
  text += 'date: ' + result.date + '\n'
  text += 'time: "' + result.time + '"\n'
  text += 'rsvp_id: ' + result.rsvp + '\n'
  text += '---\n\n';
  text += result.excerpt + '\n';

  return text;
}

function writeSuccessMessage(result) {
  console.log('Success!\n');
  console.log('You\'ve created a file named ' + getFileName(result) + '!\n');
  console.log('and the file text looks like this:\n');
  console.log(writeText(result));
}
