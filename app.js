const express =  require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");


const app =  express();

const items =[];
const workitems=[];
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public")); 

app.get("/",function(req,res){

const day = date.getDate();

res.render("list", {listTitle : day,newTasks :items});
});

app.post("/",function(req,res){
	const new_Item=req.body.AddTask;
	if(req.body.list === "Work")
	{
		workitems.push(new_Item);
		res.redirect("/work");
	}
	else
	{
	items.push(new_Item);
	res.redirect("/");
}
});



app.get("/work",function(req,res){

res.render("list",{listTitle: "Work List",newTasks : workitems});


});

app.listen(3000,function(){
	console.log("Server runs at port 3000.")
});