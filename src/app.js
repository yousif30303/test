const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request');
const geocode = require('./utilies/geocode')
const forecast = require('./utilies/forecast')



const app = express()
const port = process.env.port || 3000

const dir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templet/view')
const partPath = path.join(__dirname,'../templet/partials')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partPath)

app.use(express.static(dir));

app.get('',(reg,res)=>{
    res.render('index',{
        title:'fuck',
        name:'yousif'
    })
})



app.get('/about',(reg,res)=>{
    res.render('about',{
        title:'about',
        name:'yousif',
        age:25
    })
})

app.get('/about/*',(reg,res)=>{
    res.render('404',{
        title:'there is no data'
    })
})
app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        res.send(
         {
             error:'please enter the address'
         }
        )
    }
    else{
        geocode(address, (error, {latitude,longitude,location}={}) => {

            if(error){
                return res.send(
                    {
                        error:error
                    }
                   )
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send(
                        {
                            error:error
                        }
                       )
                }
                res.send({
                    forecast:forecastData,
                    location:location,
                    address:req.query.address
                })
        
              })
          })
        
    }
    
})

app.get('*',(reg,res)=>{
    res.render('404',{
        title:'the page not exist'
    })
})


/* 
app.get('/about',(req,res)=>{
    res.send({
        name:'yousif',
        age:25
    })
}) */

app.listen(port)
