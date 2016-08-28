var mongoose = require('mongoose');

//makes mongoose connection to mongoDB programmatically, ie from our program
//(like server URL? this is where we tell hosted DB to "listen?")
mongoose.connect('mongodb://localhost/NAME OF DB');

//mongoose mimics a schema and validates data, fields and data types
//MongoDB stores objects as plain JSON and mongoose works with the JSON
//adds the extra layer of validation

//just tells us what are the fields and the types
var FormSchema = new mongoose.Schema({
	name: String,
	//extra fields
	created: { type: Date, default: Date.now }
}, { collection: "Form" }); //mongoDB will sometimes try to change the name if your
							//collection, second argument prevents that

//we now have a formSchema, BUT FIRST, inorder to create a new form
//first we need to create a data model from the schema

//then we create a data model representation of the collection
//we can only insert the fields that MATCH the schema
var Form = mongoose.model("Form", FormSchema);
//this new data model is the object that allows us to interact with the database
//ie Form.Find(getData)  takes callback function
/*	function getData(error, data) {
		if (error) {
			console.error(error);
		}
		console.log(data);
	}

	takes callback function, arg1 = id from mongo arg2 = callback
	OR Form.findById(function("ID", error, data) {
		//once we retrieve the data, it is an obj that is STILL connected to the DB
		//thus we can manipulate it and syncronize it with the DB
		data.name = "someother name";
		data.save();
		//this is an update
	});*/

//these calls are all sync
//mongoose.model("NAME OF THE MODEL WE ARE CREATING", THE SCHEMA WE WANT TO USE);


//once we have this form we can start instantiation instances of this form, and save them

var form = new Form({ name: "form", created: new Date() });
//once we have the new instance we can save it to the db
//save will insert, execute an .insert(), create a new document obj with
//these valuse into the database but first it will be validated against the schema
form.save();
