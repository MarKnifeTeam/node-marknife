const Marknife  = require('./marknife');

var token   = 'aa';
var m       = new Marknife(token);

var p = [];

    p.push(new Promise(function(resolve, reject)
    {
        if(m.SayHello() == 'Hello world!') return resolve();
        reject(new Error('SayHello'));
    }));

    //HELP
    p.push(new Promise(function(resolve, reject)
    {
        m.Help(null, function(err, data, params)
        {
            if(err || data.application.name != 'Marknife')
            {
                reject(new Error('Help'));
            }
            return resolve();
        });
    }));

Promise.all(p).then(function(r)
{
    console.log("Ok!");

}).catch(function(err)
{
    console.log(err);
    throw err;
});
