//link package
var connect= require('connect');
//link to url module
var url= require('url');
//link accounting
var accounting= require('accounting');

//create new app
var app= connect();

//create hello world request
var helloWorld= function(req, res, next){
	//set header
	res.writeHead(200, {
		'content-type': 'text-plain'
	});

	//send hello responce
	res.end('Hello World');

};

var goodbyeWorld= function(req, res, next){
	res.writeHead(200, {
		'content-type': 'text-plain'
	});

	res.end('goodbye');

};


var calculateTax= function(req, res, next){
	// get sub title from query string
	var qs = url.parse(req.url, true).query;
	console.log(qs);

	//get sub total from query string
	var subTotal= qs.subTotal;

	//calculate tax
	var tax= parseFloat(subTotal) * 0.13;

	//calculate total
	var total = parseFloat(subTotal) + tax;

	// convert final values to currency format
	tax= accounting.formatMoney(tax);
	total= accounting.formatMoney(total);

	res.writeHead(200,{
		'content-type': 'text-plain'
	});

	res.write('Tax: '+ tax+ '\n'+ 'Total: '+ total);
	//not ending would keep it looking for content untill it times out
	res.end();

};

var loop= function(req, res, next){
	res.writeHead(200, { 'Content-Type': 'text-plain' });

    for (var i = 1; i <= 20; i++) {
        res.write(i + '\n');

        console.log(i);
    }

    res.end();
}

//install connect
//install nodemon in global with -g
//create root directory under home
var home= function(req,res,next){
	res.writeHead(200, {'Content-Type': 'text-plain'});
	res.write('homepage');
	re.end();
}

//route each url
app.use('/tax', calculateTax);
app.use('/hello', helloWorld);
app.use('/bye', goodbyeWorld);
app.use('/loop', loop);
app.use('/', home)

app.listen(3000);

console.log('app running');