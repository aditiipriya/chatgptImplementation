const express = require('express');
const config =  require("./config").cfg;
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: config.openaikey,
});
const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.json());

app.post("/factual-answering", async(req,res)=> { 
    try{
        const {prompt} = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`, // {"prompt": "Q: Pros and cons of callback and Promise\nA:"}
            max_tokens: 100,
          });
        return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})
  
app.post("/find-complexity", async(req,res)=> {
    try{
        const {prompt} = req.body;
        const response = openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt} The complexity of this function is `, //{"prompt": "const example = (arr)=> { arr.map((item)=> { console.log(item)});}"}
          });
        return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})

app.post("/imageGenerator-from-text", async(req,res)=> {
    try{
        const {prompt} = req.body;
        const response = await openai.createImage({
            prompt: `${prompt}`, //{"prompt": "kasoli in winter"}
            n: 2, // number of images to create
            size: "1024x1024",
          });          
        return res.status(200).json({success:true,data:(await response).data})
    }catch(error){console.log(error,"error....")}
})

app.post("/notes-to-summary", async(req,res)=> {
    try{
        const {prompt} = req.body;
        const response = openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt} The notes to the summary is`, //{"prompt": "What are 5 key points I should know when studying ancient india?"}
            max_tokens: 100,
          });
        return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})

app.post("/js-to-python", async(req,res)=> {
    try{
        const {prompt} = req.body;
        const response = await openai.createCompletion({
            model: "code-davinci-002",
            prompt: `${prompt}` , //{  "prompt": "JavaScript: \ndogs = [\"bill\", \"joe\", \"carl\"]\ncar = []\ndogs.forEach((dog) {\ncar.push(dog);\n});\n\nPython:"}
            max_tokens: 64,
            top_p: 1.0,
        });
        return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})

app.post("/movietitles-to-emojis", async(req,res)=> {
    try{
        const {prompt} = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`//{  "prompt": "Batman: 🤵🦇 \nSpiderman:"}
          });
        return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})

app.post("/interview-questions", async(req,res)=> {
    try{
        const {prompt} = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,//{  "prompt": "Create a list of 8 questions for interview in MERN:"}
            max_tokens : 150
        });

    return res.status(200).json({success:true,data:(await response).data.choices[0].text})
    }catch(error){console.log(error,"error....")}
})

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
