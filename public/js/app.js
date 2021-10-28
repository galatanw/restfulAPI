
const preview = document.getElementById('fileData')
const dataForm = document.getElementById('dataForm')
const options = document.getElementById('options')
const responseTable = document.getElementById('responseTable')
options.addEventListener("change", () => {
    console.log(options.value);
    switch (options.value) {
        case 'NUN':
            dataForm.innerHTML = ""
            responseTable.innerHTML = ""
            break;
        case "POST":
            responseTable.innerHTML = ""
            dataForm.innerHTML =
                `
        <label for="name">NAME</label><br>
        <input required type="text" class="method"><br>
        <label for="options">EMAIL</label><br>
        <input required type="email" class="method"><br>
        <label for="options">MESSAGE</label><br>
        <input required type="text" class="method"><br>
        <input  type="submit" id="start">
            
                `
        break
        case "DELETE":
            responseTable.innerHTML = ""
            dataForm.innerHTML =
            ` <label for="options">DELETE BY ID</label><br>
            <input required type="number" class="method" placeholder="ID..">
            <input  type="submit" id="start">`
            break;
        case "GET":
            responseTable.innerHTML = ""
            dataForm.innerHTML =
                ` <label for="options">SEARCH BY ID</label><br>
              <input required type="number" class="method" placeholder="ID..">
              <input  type="submit" id="start">`
            break;
        case "PATCH":
            responseTable.innerHTML = ""
            dataForm.innerHTML =
                `
            <label for="options">SEARCH BY ID</label><br>
              <input required type="number" class="method" placeholder="ID.."><br>
             <label for="options">NAME</label><br>
             <input required type="text" class="method"><br>
            <label for="options">EMAIL</label><br>
             <input required type="email" class="method"><br>
              <label for="options">MESSAGE</label><br>
              <input required type="text" class="method"><br>
              <input  type="submit" id="start">

            `
            break

    }
})

dataForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const methodInput = document.getElementsByClassName('method')
    let Idurl = `/comments/${methodInput[1].value}`


switch (options.value) {
case "POST":
    axios
.post("/comments", { name: methodInput[1].value, email: methodInput[2].value, message: methodInput[3].value })
.then((data) => {
            responseTable.innerHTML = `
                <tr>
                <td>located</td>
                <td>name</td>
                <td>message</td>
                <td>email</td>
                <td>id</td>
            </tr>
            <tr>
            <td>row:${data.data.location}</td>
            <td>${data.data.name}</td>
            <td>${data.data.message}</td>
            <td>${data.data.email}</td>
                    <td>${data.data.id}</td>
                    </tr> `
               console.log(data);
                })
    .catch((err)=>{
    dataForm.reset()
        alert(err)
    })
break


case "DELETE":
    axios
.delete(Idurl)
.then((data) => {
      
        responseTable.innerHTML = `
           <tr>
           <td>located</td>
           <td>name</td>
           <td>message</td>
           <td>email</td>
           <td>id</td>
            </tr>
            <tr>
            <td>row:${data.data[0].location}</td>
             <td>${data.data[0].name}</td>
            <td>${data.data[0].message}</td>
            <td>${data.data[0].email}</td>
             <td>${data.data[0].id}</td>
             </tr>
             `

   

    })
.catch((err)=>{
    dataForm.reset()
    alert(err)
})
 break



case "GET":
    axios
.get(Idurl)
.then((data) => {
console.log(data);
    responseTable.innerHTML = `
        <tr>
        <td>located</td>
        <td>name</td>
        <td>message</td>
        <td>email</td>
        <td>id</td>
    </tr>
    <tr>
            <td>row:${data.data.location}</td>
            <td>${data.data.name}</td>
            <td>${data.data.message}</td>
            <td>${data.data.email}</td>
            <td>${data.data.id}</td>
            </tr>
            `

     
})
.catch((err)=>{
    dataForm.reset()
    alert(err)
}
)
break


default:
        axios
    .patch(Idurl, { name: methodInput[2].value, email: methodInput[3].value, message: methodInput[4].value })
    .then((data) => {          
        responseTable.innerHTML = `
        <tr>
        <td>located</td>
        <td>name</td>
        <td>message</td>
        <td>email</td>
        <td>id</td>
        </tr>
         <tr>
        <td>row:${data.data[0].location}</td>
        <td>${data.data[0].name}</td>
        <td>${data.data[0].message}</td>
        <td>${data.data[0].email}</td>
        <td>${data.data[0].id}</td>
        </tr>
      `
        



})
.catch((err)=>{
    dataForm.reset()
    alert(err)

})
break
}
    GetFullData()
})






function GetFullData() {
    axios
        .get("/comments")
        .then((response) => {
            preview.innerHTML = `
        <tr>
        <td><h3>located</h3></td>
        <td><h3>name</h3></td>
        <td><h3>message</h3></td>
        <td><h3>id</h3></td>
        <td><h3>email</h3></td>
        </tr>
        `

            for (const iterator of response.data) {
                preview.innerHTML += `
            <tr>
            <td class="dataRow">row:${iterator.location}</td>
            <td class="dataRow">${iterator.name}</td>
            <td class="dataRow">${iterator.message}</td>
            <td class="dataRow">${iterator.email}</td>
            <td class="dataRow">${iterator.id}</td>
            </tr>
        `
            }
        }
        )
        .catch((err) => {
            
            dataForm.innerHTML = ""
            alert(err);

        })
        .then()
}
GetFullData()


