fetch("http://localhost:3000/api/teddies")

.then(function(res){
    if(res.ok){
        let data= res.json();
        console.log(data);
        return data;
    }
})
.then(function(value){
    console.log(value);
})
.catch(function(err){

});