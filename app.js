/**
 * Created by athiravijayan on 8/30/17.
 */
let express =require('express');
const path = require('path');
let app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
let users = [];


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');

app.get('/',function(req, res){
    res.render('./views/index')
});


app.post('/savedata',function(req, res){
    console.log('hello');
    users.push({Firstname:req.body.Firstname,Lastname:req.body.Lastname,email:req.body.email,age:req.body.age});
    // response = {
    //     Firstname:req.body.Firstname,
    //     Lastname:req.body.Lastname,
    //     email:req.body.email,
    //     age:req.body.age
    // };
    res.redirect('/user');
});

app.get('/user',function(req, res){
    console.log(users);
    //console.log('i am here');
    res.render('./views/user',{users:users});
    console.log(users)
});

app.get('/edit/:email',function(req, res){
    //res.send( {Firstname:req.body.Firstname,Lastname:req.body.Lastname,email:req.body.email,age:req.body.age});
    getUser(req.params.email).then((user)=>{
        removeUser(req.params.email);
        res.render('./views/edit', {
            user: user
        })
    });
});


app.post('/edit',function(req, res){
    users.push({Firstname:req.body.Firstname,Lastname:req.body.Lastname,email:req.body.email,age:req.body.age});
    res.redirect('/user');
});

app.get('/delete/:email', (req, res) => {
    removeUser(req.params.email);
    res.redirect('/user');
});
app.listen(3000,function(){
    console.log('Example app listening on port 3000!');
});

function removeUser(email) {
    users.forEach((user, index)=>{
        if (email == user.email) {
            users.splice(index, 1);
        }
    })
}
function getUser(email) {
    return new Promise(executor);
    function executor(resolve, reject) {
        users.forEach((user) => {
            if (email == user.email) {
                resolve(user);
            }
        });
        reject({message: 'no user found'})
    }
}


