const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// app.get('/', (req, res)=>{
//     res.status(200).send({msg: 'From port 3000', app: 'Notours'})
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tours-simple.json`));

app.get('/api/v1/tours', (req,res)=>{     
    res.status(200).json({
        status: 'success',
        length: tours.length,
        data: {
            tours
        }

    }) 
})

app.get('/api/v1/tours/:id', (req, res)=>{
    
    const id = req.params.id * 1;
    const tour = tours.find(el=> el.id === id);
    
    if(!tour){
        res.status(404).json({
            status: "failed",
            message: "Invalid Id"
        })
    }
    
    res.status(200).json({
        status: "success",
        data: {tour}
    })
})

app.post('/api/v1/tours', (req, res)=>{

    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status: 'success',
            result: tours.length,
            data: {
                tour: newTour
            }
        })
    })
})

const port = 3000;
app.listen(port, ()=>{
    console.log('App running on port 3000');
});

