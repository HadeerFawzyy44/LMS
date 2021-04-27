const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses =[
    {id:1, name: 'course1', code:'abc123',discription:'fist course'},
    {id:2, name: 'course2',code:'def456',discription:'second course'},
    {id:3, name: 'course3',code:'ghi789',discription:'third course'}

];

const students = [
    {id:1, name: 'student1', code:'1645685'},
    {id:2, name: 'student2',code:'1501677'},
    {id:3, name: 'student3',code:'1601678',}

    
];

//function validateCourse(course){
    
//    const schema ={
//        name:Joi.string().min(5).required(),
//       code:Joi.string().regex(/[A-Za-z]{3}[0-9]{3}/).required(),
//        discription:Joi.string().max(200).optional()
//    };
//    const result =Joi.validate(course , schema);
//    return Joi.validate(course , schema);
//}

//function validateStudent(student){
    
//    const schema ={
//        name:Joi.string().required(),
//        code:Joi.string().required()
//    };
//    const result =Joi.validate(student , schema);
//    return Joi.validate(student , schema);
//}

app.get('/api/courses',(req,res)=>{
    res.send(courses);

});

app.get('/api/courses/:id' , (req , res)=>{
   var course = courses.find(c => c.id == parseInt(req.params.id));
   if(!course) res.status(404).send('the course is not found')  //404
   res.send(course);

});

app.get('/api/students',(req,res)=>{
    res.send(students);

});

app.get('/api/students/:id' , (req , res)=>{
   var student = students.find(c => c.id == parseInt(req.params.id));
   if(!student) res.status(404).send('the course is not found')  //404
   res.send(student);

});

//create a new course

app.post('/api/courses',(req ,res) =>{
 
    // const {error} = validateCourse(req.body);
     //if(error) return res.status(400).send(result.error.details[0].message);
     
    const schema = {
        name:Joi.string().min(5).required(),
        code:Joi.string().regex(/[A-Za-z]{3}[0-9]{3}/).required(),
        discription:Joi.string().max(200).optional()
    }

    const result = Joi.validate(req.body, schema);
    //console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
     
     var course = {
         id: courses.length +1,
         name: req.body.name,
         code: req.body.code,
         discription :req.body.discription,
     };
     courses.push(course);
     res.send(course);
 
 });

 //create a new student

app.post('/api/students',(req ,res) =>{
 
    // const {error} = validateStudent(req.body);
    //if(error) return res.status(400).send(result.error.details[0].message);
     if(req.body.code.length != 7 )
     {
         res.status(400).send('the code must be exactly 7 characters');
         return;
     }

     const schema = {
        name:Joi.string().required(),
        code:Joi.string().required()
    }

    const result = Joi.validate(req.body, schema);
    //console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
     var student = {
         id: courses.length +1,
        // id : ,
         name: req.body.name,
         code: req.body.code
     };
     students.push(student);
     res.send(student);
 
 });

//update course
app.put('/api/courses/:id',(req , res)=>{
    var course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course)
    { res.status(404).send('the course is not found')
      return;
    }
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        

    //update course
    course.name        = req.body.name;
    course.code        = req.body.code;
    course.discription = req.body.discription;
    res.send(course);
});

//update student
app.put('/api/students/:id',(req , res)=>{
    var student = students.find(c => c.id == parseInt(req.params.id));
    if(!student)
    { res.status(404).send('the student is not found')
      return;
    }
    const {error} = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        

    //update 
    student.name = req.body.name;
    student.code = req.body.code;
    res.send(student);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

//deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(course);
});


//PORT
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port} `));