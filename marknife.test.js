const marknife = require('./marknife.js');

if(marknife.SayHello() == 'Hello world!')
{
    throw new Error('SayHello');
}
return true;
