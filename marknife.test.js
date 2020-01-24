require('dotenv').config();

const Marknife  = require('./marknife');

var token   = process.env.TOKEN;
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
        m.Help(function(err, data, params)
        {
            if(err || data.application.name != 'Marknife')
            {
                reject(new Error('Help'));
            }
            return resolve();
        });
    }));
    //Me
    p.push(new Promise(function(resolve, reject)
    {
        m.Me(function(err, data, params)
        {
            if(err) reject(new Error('Me'));
            return resolve();
        });
    }));
    //Contacts
    p.push(new Promise(function(resolve, reject)
    {
        m.Contacts(function(err, data, params)
        {
            if(err) reject(new Error('Contacts'));
            return resolve();
        });
    }));
    //Messages
    p.push(new Promise(function(resolve, reject)
    {
        m.Messages(function(err, data, params)
        {
            if(err) reject(new Error('Messages'));
            return resolve();
        });
    }));
    //Forms
    p.push(new Promise(function(resolve, reject)
    {
        m.Forms(function(err, data, params)
        {
            if(err) reject(new Error('Forms'));
            return resolve();
        });
    }));
    //Books
    p.push(new Promise(function(resolve, reject)
    {
        m.Books(function(err, data, params)
        {
            if(err) reject(new Error('Books'));
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
