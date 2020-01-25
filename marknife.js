const http = require('https');

class Marknife
{
    constructor(user, key)
    {
        this.token      = user;
        this.user       = user;
        this.key        = key;
        this.method     = 'GET';
        this.version    = 1;
        this.authtype   ='Bearer';
    }
    SayHello()
    {
        return ('Hello world!');
    }
    Help(callback, options)
    {
        this.Read('/help', callback, options)
    }
    Me(callback, options)
    {
        this.Read('/me', callback, options)
    }
    Contacts(callback, options)
    {
        this.Read('/contacts', callback, options)
    }
    Messages(callback, options)
    {
        this.Read('/messages', callback, options)
    }
    Forms(callback, options)
    {
        this.Read('/forms', callback, options)
    }
    Books(callback, options)
    {
        this.Read('/books', callback, options)
    }
    Qrs(callback, options)
    {
        this.Read('/qrs', callback, options)
    }
    Events(callback, options)
    {
        this.Read('/events', callback, options)
    }
    Resources(callback, options)
    {
        this.Read('/resources', callback, options)
    }

    Read(path, callback, params)
    {
        this.method = 'GET';
        this.Call(path, callback, params);
    }
    Save(path, callback, params)
    {
        this.method = 'POST';
        this.Call(path, callback, params);
    }
    Delete(path, callback, params)
    {
        this.method = 'DELETE';
        this.Call(path, callback, params);
    }
    Update(path, callback, params)
    {
        this.method = 'PUT';
        this.Call(path, callback, params);
    }
    Patch(path, callback, params)
    {
        this.method = 'PATCH';
        this.Call(path, callback, params);
    }
    Purge(path, callback, params)
    {
        this.method = 'PURGE';
        this.Call(path, callback, params);
    }
    Call(path, callback, params)
    {
    	var req = null;

        if(typeof this.token == 'undefined' ||  this.token == '')
        {
            if (callback && typeof callback === 'function')
                return callback(new Error('Marknife Invalid Token'));
            return [new Error('Marknife Invalid Token')];
        }
        if(typeof path == 'undefined' ||  path == '')
        {
            if (callback && typeof callback === 'function')
                return callback(new Error('Invalid Path'));
            return [new Error('Invalid Path')];
        }

        var bearer = this.authtype + ' ' + this.token;

        var headers = {};
        if(bearer.length > 0) headers['Authorization'] = bearer;
        if(params)
        {
            params = {params : params};
            headers['Content-Type'] = 'application/json';
            headers['Content-Length'] = Buffer.byteLength(JSON.stringify(params));
        }

        if (!req)
    	{
            var postRequest =
            {
                host: 'api.marknife.com',
                path: '/v' + this.version + path,
                port: 443,
                method: this.method,
                headers: headers
            };
            var buffer = "";

            const req = http.request( postRequest, (res) =>
            {
                var buffer = "";
                res.on( "data", data  =>
                {
                    buffer = buffer + data;
                });
                res.on("end", data =>
                {
                    buffer = JSON.parse(buffer);
                    if (callback && typeof callback === 'function')
                        return callback(null, buffer, params);
                    return [null, buffer, params];
                });
            });

            req.on('error', function(err)
            {
                console.log(err);
                throw err;
            });

            if(params) req.write(JSON.stringify(params));
            req.end();
        }
    }
}

module.exports = Marknife;
