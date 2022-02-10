const express=require('express');
const path=require('path')
const hbs=require('hbs');
const geoCode=require("./utils/geocode")
const forecast=require("./utils/forecast")

const app=express();

const publicPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');


app.use(express.static(publicPath));

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        title :'Dynamic Weather App',
        name:'Sourav'
    });
});
 
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name :'Sourav Pati'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name :'Sourav Pati'
    })
})

app.get("/weather",(req,res)=>{
    let address=req.query.address;
    if(!address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
        geoCode(address,(error,data)=>{
            if(error){
               return res.send({
                error :error
            });
            }
          forecast(data.latitude,data.longitude,(error,forecastData)=>{
              if(error){
                return  res.send({
                    error :error
                });
              }
            res.send({
                forecastData:forecastData,
                location:data.location,
                address
            })
        })
        })
       /*  location:"kolkata",
        forecast:"It's 30'c",
        address :req.query.address */
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg:'Help Page Not Avilable!',
        title: 'Help',
        name :'Sourav Pati'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMsg:'404 Page Not Found !',
        title: 'Page Not Found',
        name :'Sourav Pati'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000.');
})