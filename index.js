var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const Cookie_Parser = require('cookie-parser');
const Joi = require('joi');
const session = require('express-session');
var {createConnection} = require('mysql');
var MySQLStore = require('express-mysql-session')(session);



const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}



app.use(express.json())
app.use(Cookie_Parser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors(corsOptions));

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
    clearExpired: true,
    checkExpirationInterval: 1000*60*60*365,
	expiration: 1000*60*60*365,
	database: 'gmc'
};



var sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
    cookie: {httpOnly: true, secure: false, maxAge: 1000*60*60*365 },
}));

var con = createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gmc",
  });


app.get("/", function(req, res,next){

    res.send({session:req.session.hod})
    next()

});


app.get("/loginstatus", function(req, res,next){
    if(req.session.hod){
       return res.send({LoggedIn:true,session:req.session.hod})
    }
    return res.send({LoggedIn:false,data:req.session.hod})
})

//Login
app.post("/login", function(req, res){
    Username = req.body.formData.Username
    Password = req.body.formData.Password

    con.query("SELECT * FROM admins WHERE Username=?",[Username], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ Message: "Incorrect Credentials",LoggedIn:false});
        }
        if(results[0].Password === Password){

            req.session.hod = results[0].Department
            
            return res.send({data: results, session : req.session.hod ,LoggedIn:true,HOD:true});
        }
        return res.send({ Message: "Incorrect Credentials",LoggedIn:false});
    });

});


app.post("/logout", function(req, res){
    res.clearCookie('session_cookie_name')
    if(req.session.hod){
        req.session.destroy()
        res.send({ Message: "Logout Success",LoggedIn:false,HOD:false});
    }
    else{
        console.log("has not session")
    }
    
});


// Addmission Form  
app.post('/addmissonform', function (req, res) {

const schema = Joi.object({
    Full_Name : Joi.string().required(),
    Father_Name : Joi.string().required(),
    Gender : Joi.string().required(),
    CNIC : Joi.string().required(),
    DOB : Joi.string().required(),
    Email : Joi.string().required(),
    Phone : Joi.string().required(),
    Address : Joi.string().required(),
    Department : Joi.string().required(),
    Matric_Roll : Joi.number().required(),
    Matric_Total_Marks : Joi.number().required(),
    Matric_Obtained_Marks : Joi.number().required(),
    Matric_Year : Joi.number().required(),
    Matric_Board : Joi.string().required(),
    Inter_Roll : Joi.number().required(),
    Inter_Total_Marks : Joi.number().required(),
    Inter_Obtained_Marks : Joi.number().required(),
    Inter_Year : Joi.number().required(),
    Inter_Board : Joi.string().required(),
});

result = schema.validate(req.body);

if (result.error){
    res.send(result.error.details[0].message)
}
else{
    con.query("INSERT INTO admission_form(Full_Name, Father_Name, Gender, CNIC , DOB , Email , Phone , Address , Department , Matric_Roll  , Matric_Total_Marks  , Matric_Obtained_Marks  , Matric_Year  , Matric_Board  , Inter_Roll  , Inter_Total_Marks  , Inter_Obtained_Marks  , Inter_Year  , Inter_Board ) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [req.body.Full_Name ,req.body.Father_Name ,req.body.Gender ,req.body.CNIC  ,req.body.DOB  ,req.body.Email  ,req.body.Phone  ,req.body.Address  ,req.body.Department  ,req.body.Matric_Roll  ,req.body.Matric_Total_Marks  ,req.body.Matric_Obtained_Marks  ,req.body.Matric_Year  ,req.body.Matric_Board  ,req.body.Inter_Roll  ,req.body.Inter_Total_Marks  ,req.body.Inter_Obtained_Marks  ,req.body.Inter_Year  ,req.body.Inter_Board  ], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Form Submitted Successfully' });
    });
}

});


app.get('/student/admissions', function (req, res) {
    console.log(req.headers.host)
    con.query('SELECT Full_Name,Department FROM admission_form', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});




// Show all students
app.get('/hod/students', function (req, res) {
    con.query('SELECT * FROM students', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});



// Delete single student
app.delete('/hod/students/:id', function (req, res) {
    con.query('DELETE FROM students WHERE id = ? ',[req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Update Fee Status
app.post('/hod/students/:id', function (req, res) {
    con.query("UPDATE students SET Fee_Status = ? WHERE id = ?",[req.body.fee,req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});



app.post('/hod/meritlist', function (req, res) {
    con.query('SELECT * FROM admission_form WHERE Department = ? ORDER BY Inter_Obtained_Marks DESC',[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


app.post('/hod/meritlistcontroller', function (req, res) {
    
    MeritList = req.body.formData.MeritList
    Start = req.body.formData.Start
    End = req.body.formData.End
    Display = req.body.formData.Display
    if(Display==="True"){
        Display=1
    }
    Department = req.body.formData.Department
    con.query("UPDATE meritlist_controller SET 	MeritList = ? ,	NOS_Start = ? ,	NOS_End = ? , Display = ? WHERE Department = ?", [MeritList ,Start ,End ,Display ,Department ], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


app.post('/hod/meritlistcurrent', function (req, res) {
    con.query("SELECT * FROM meritlist_controller WHERE Department = ?", [req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});



// Get Specific Department Instructors
app.post('/hod/instructors', function (req, res) {
    con.query('SELECT * FROM instructors WHERE Department = ?',[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Generate Time Table
app.post('/api/hod/timetablegenerate', function (req, res) {
    con.query("INSERT INTO timetable(Department, Instructor, Instructor_Department , Course_Title, Course_Code , Semester , Time_Slot , Shift , Room_no) value(?,?,?,?,?,?,?,?,?) ", [req.body.Department,req.body.Instructor,req.body.Instructor_Department,req.body.Course_Title,req.body.Course_Code,req.body.Semester,req.body.Time_Slot,req.body.Shift,req.body.Room_no], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Form Submitted Successfully' });
    });
});

app.post('/api/hod/timetable', function (req, res) {
    con.query('SELECT * FROM timetable WHERE Department = ?',[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// Delete Time Table
app.delete('/api/hod/timetable/:id', function (req, res) {
    con.query('DELETE FROM timetable WHERE id = ? ',[req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Get Free Instructors
app.post('/api/ssio/freeinstructors', function (req, res) {
    con.query('SELECT * FROM timetable WHERE Time_Slot <> ?',[req.body.Time_Slot], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

//Get All Instructors
app.post('/api/hod/instructors', function (req, res) {
    con.query('SELECT Instructor FROM instructors', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});