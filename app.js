const Mars = require('./js/src/mars');

m = new Mars;
r1 = m.addRover('spirit');
r2 = m.addRover('curiosity', 4, 4, 'S');

r1.right();
r1.forwards(2);
r1.left(3);
r1.forwards(4);
r1.right();
r1.backwards(3);

r2.command('xrzfzzzf!@#frflfrrbfrf123flbbb');

r1.done();
r2.done();

m.printGrid();
