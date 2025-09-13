const fs = require('fs');
const archiver = require('archiver');

// Create a file to stream archive data to
const output = fs.createWriteStream('portfolio-ruban-as.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('Portfolio zip file created successfully!');
  console.log(archive.pointer() + ' total bytes');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append files
archive.file('index.html', { name: 'index.html' });
archive.file('style.css', { name: 'style.css' });
archive.file('script.js', { name: 'script.js' });
archive.file('package.json', { name: 'package.json' });

// Finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();