const http = require('https');

class Marknife
{
    constructor(token)
    {
        this.token      = token;
        this.method     = 'GET';
        this.version    = 1;
        this.authtype   ='Bearer';
    }

    SayHello()
    {
        return ('Hello world!');
    }

    Help(options, callback)
    {
        this.Read('/help', function(err, data, params)
        {
            callback(err, data, params);

        }, options);
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
        this.method = 'patch';
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
            return callback(new Error('Marknife Invalid Token'));

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
            var path = '/help';

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
                    if (callback && typeof callback === 'function')
                    {
                        buffer = JSON.parse(buffer);
                        callback(null, buffer, params);
                    }
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
