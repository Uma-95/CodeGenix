const express=require("express");
const cors= require("cors");
const {generateFile} = require("./generateFile");
const{executeCpp}=require("./executeCpp");

const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// the below block of code gets execurted when I hit the / route
// app.get("/",(req,res)=>{
// return res.json({hello:"world!"});
// });


app.post("/run",async (req,res)=>{
    const {language="cpp",code} = req.body;

    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty code body"});
    }
    try{
    //generating the c++ file with content from the request
const filepath= await generateFile(language,code);
 
//we need to run the file and send the response
const output=await executeCpp(filepath);

return res.json({filepath,output});
// the body will contain the actual language and code that we send from the browser
} catch (err){
res.status(500).json({err})
}
});





app.listen(5000,()=>{
    console.log('Listening on port 5000!');
})