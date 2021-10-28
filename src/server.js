const express=require('express')
const path=require('path')
const app=express()
const fs=require('fs')
const PORT=8080
const publicLocation=path.join(__dirname,'..','public')
const tasksArrayLocation=path.join(__dirname,'..','files','comments.json')
app.use(express.json())
app.use(express.static(publicLocation))


app.get('/comments',(req,res)=>{
try{
    const tasksArray=JSON.parse(fs.readFileSync(`${tasksArrayLocation}`,'utf8'))
    res.send(tasksArray)
}
catch(err){
    res.sendStatus(404)
}
})
app.get('/comments/:id',(req,res)=>{
 try{   
    const tasksArray=JSON.parse(fs.readFileSync(`${tasksArrayLocation}`,'utf8'))
    const id=req.params.id
    const task=tasksArray.find((taska)=>taska.id==id)
    if(task){
        res.send(task)
        return
    }    
    throw 404 
}
catch(err){
    res.sendStatus(err)
}
})
app.post('/comments',(req,res)=>{
try{
    const tasksArray=JSON.parse(fs.readFileSync(`${tasksArrayLocation}`,'utf8'))
    let freeId=0
    let location=1
    if(tasksArray.length>=1){
        freeId=(tasksArray[tasksArray.length-1].id+1)
        location=tasksArray[tasksArray.length-1].location+1
}    
    const name=req.body.name
    const email=req.body.email
    const emailSign=/@/g    
    const message=req.body.message
    if(message[0]==" "||name[0]==" "||email[0]==" "){
        throw 401
    }
    if(email.match(emailSign).length!=1){
       throw 401 
    }
    
    const task={name:name,message:message,email:email,id:freeId,location:location}
    tasksArray.push(task)
    freeId++
    res.send(task)
    fs.writeFileSync(`${tasksArrayLocation}`,JSON.stringify(tasksArray))
}
catch(err){
    res.sendStatus(err)
}
})
app.delete('/comments/:id',(req,res)=>{
try{
    const tasksArray=JSON.parse(fs.readFileSync(`${tasksArrayLocation}`,'utf8'))
    const id=req.params.id 
    const task=tasksArray.findIndex((item)=>item.id==id)
    if(task!=-1){
        const deleted= tasksArray.splice(task,1)
        for (let index = task; index < tasksArray.length; index++) {
                tasksArray[index].location--
    }
    res.send(deleted)
    fs.writeFileSync(`${tasksArrayLocation}`,JSON.stringify(tasksArray))
    return
}
            throw 404
}
catch(err){
res.sendStatus(err)
} }
)

app.patch('/comments/:id',(req,res)=>{
try{
    const tasksArray=JSON.parse(fs.readFileSync(`${tasksArrayLocation}`,'utf8'))
    if(tasksArray.length<1){
        res.statusCode(401)
        return
    }
    const id=req.params.id
    const taskLocation=tasksArray.findIndex((item)=>item.id==id)
    if(taskLocation!=-1){
        const name=req.body.name
        const email=req.body.email
        const emailSign=/@/g    
        const message=req.body.message
    if(message[0]==" "||name[0]==" "||email[0]==" "){
            throw 401
    }
    if(email.match(emailSign).length!=1){
       throw 401
    }
    
    tasksArray[taskLocation].name=name
    tasksArray[taskLocation].email=email
    tasksArray[taskLocation].message=message
    res.send(tasksArray)
    fs.writeFileSync(`${tasksArrayLocation}`,JSON.stringify(tasksArray)) 
    return
}
throw 404
}
catch(err){
    res.sendStatus(err)
}

})

app.listen(PORT,()=>`LISTENING TO ${PORT}`)