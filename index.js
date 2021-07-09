var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const Cookie_Parser = require('cookie-parser');
const Joi = require('joi');
const session = require('express-session');
var {createConnection} = require('mysql');
var {sign,verify} = require('jsonwebtoken');
var MySQLStore = require('express-mysql-session')(session);
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hurairah564@gmail.com',
      pass: '5156558gg'
    }
  });

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
       return res.send({LoggedIn:true,HOD:true,session:req.session.hod})
    }
    return res.send({LoggedIn:false,data:req.session.hod})
})


app.post("/login", function(req, res){
    Username = req.body.formData.Username
    Password = req.body.formData.Password

    con.query("SELECT * FROM admins WHERE Username=?",[Username], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ Message: "Incorrect Credentials",LoggedIn:false});
        }
        if(results[0].Password === Password){

            req.session.hod = results[0]

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
  
app.post('/api/student/addmissonform', function (req, res) {

    var mail = `
        Full Name : ${req.body.Full_Name}\n
        Father Name : ${req.body.Father_Name}\n
        Gender : ${req.body.Gender}\n
        CNIC : ${req.body.CNIC}\n
        DOB : ${req.body.DOB}\n
        Email : ${req.body.Email}\n
        Phone : ${req.body.Phone}\n
        Address : ${req.body.Address}\n
        Department : ${req.body.Department}\n
        Shift : ${req.body.Shift}\n
        Matric Roll : ${req.body.Matric_Roll}\n
        Matric Total Marks : ${req.body.Matric_Total_Marks}\n
        Matric Obtained Marks : ${req.body.Matric_Obtained_Marks}\n
        Matric Year : ${req.body.Matric_Year}\n
        Matric Board : ${req.body.Matric_Board}\n
        Inter Roll : ${req.body.Inter_Roll}\n
        Inter Total Marks : ${req.body.Inter_Total_Marks}\n
        Inter Obtained Marks : ${req.body.Inter_Obtained_Marks}\n
        Inter Year : ${req.body.Inter_Year}\n
        Inter Board : ${req.body.Inter_Board}\n
        `

const schema = Joi.object({
    Department : Joi.string().required(),
    Shift : Joi.string().required(),
    Full_Name : Joi.string().required(),
    Father_Name : Joi.string().required(),
    Gender : Joi.string().required(),
    CNIC : Joi.string().required(),
    DOB : Joi.string().required(),
    Email : Joi.string().required(),
    Phone : Joi.string().required(),
    Address : Joi.string().required(),
    Matric_Roll : Joi.number().required(),
    Matric_Total_Marks : Joi.number().required(),
    Matric_Obtained_Marks : Joi.number().required(),
    Matric_Year : Joi.number().required(),
    Matric_Board : Joi.string().required(),
    Inter_Roll : Joi.number().required(),
    Inter_Total_Marks : Joi.number().required(),
    Inter_Obtained_Marks : Joi.number().required(),
    Inter_Year : Joi.number().required(),
    Inter_Board : Joi.string().required()
});

result = schema.validate(req.body);

if (result.error){
    res.send(result.error.details[0].message)
}
else{

    con.query('SELECT * FROM merit_list_formula', function (error, resultss, fields) {
        if (error) {
            console.log("Error")
        };

        matric_percentage = resultss[0]['Matric']
        inter_percentage = resultss[0]['Inter']

        
        merit = ((parseInt(req.body.Matric_Obtained_Marks)/parseInt(req.body.Matric_Total_Marks))*parseInt(matric_percentage))+((parseInt(req.body.Inter_Obtained_Marks)/parseInt(req.body.Inter_Total_Marks))*parseInt(inter_percentage))

        con.query("INSERT INTO admission_form(Full_Name, Father_Name, Gender, CNIC , DOB , Email , Phone , Address , Department , Shift , Matric_Roll  , Matric_Total_Marks  , Matric_Obtained_Marks  , Matric_Year  , Matric_Board  , Inter_Roll  , Inter_Total_Marks  , Inter_Obtained_Marks  , Inter_Year  , Inter_Board , merit , Admission_Time , Year ) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [req.body.Full_Name ,req.body.Father_Name ,req.body.Gender ,req.body.CNIC  ,req.body.DOB  ,req.body.Email  ,req.body.Phone  ,req.body.Address  ,req.body.Department , req.body.Shift ,req.body.Matric_Roll  ,req.body.Matric_Total_Marks  ,req.body.Matric_Obtained_Marks  ,req.body.Matric_Year  ,req.body.Matric_Board  ,req.body.Inter_Roll  ,req.body.Inter_Total_Marks  ,req.body.Inter_Obtained_Marks  ,req.body.Inter_Year  ,req.body.Inter_Board , merit , new Date() , new Date().getFullYear()], function (error, results, fields) {
            if (error) throw error;

            var mailOptions = {
                from: 'hurairah564@gmail.com',
                to: req.body.Email,
                subject: `Successfully Applied in ${req.body.Department}`,
                text: `Your Provided Information is :\n\n\n${mail}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });

            return res.send({ error: false, data: results, message: 'Form Submitted Successfully' });
        });
    });
}

});


// Check Admission Access
app.get('/api/ro/admission_control', function (req, res) {
    con.query('SELECT * FROM admission_control', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});



// Change Admission Access
app.put('/api/ro/admission_control', function (req, res) {
    con.query("UPDATE admission_control SET Open = ?", [req.body.Admission_Controller], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Add student
app.post('/api/hod/addstudent', function (req, res) {

    const schema = Joi.object({
        Roll : Joi.string().required(),
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
        Semester : Joi.string().required(),
        Shift : Joi.string().required(),
        Fee_Status : Joi.string().required(),
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
        con.query("INSERT INTO students(Roll,Full_Name, Father_Name, Gender, CNIC , DOB , Email , Phone , Address , Department , Matric_Roll  , Matric_Total  , Matric_Obtained_Marks  , Matric_Year  , Matric_Board  , Inter_Roll  , Inter_Total  , Inter_Obtained_Marks  , Inter_Year  , Inter_Board , Semester , Shift , Fee_Status , Admission_Time , Year  ) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [req.body.Roll , req.body.Full_Name ,req.body.Father_Name ,req.body.Gender ,req.body.CNIC  ,req.body.DOB  ,req.body.Email  ,req.body.Phone  ,req.body.Address  ,req.body.Department  ,req.body.Matric_Roll  ,req.body.Matric_Total_Marks  ,req.body.Matric_Obtained_Marks  ,req.body.Matric_Year  ,req.body.Matric_Board  ,req.body.Inter_Roll  ,req.body.Inter_Total_Marks  ,req.body.Inter_Obtained_Marks  ,req.body.Inter_Year ,req.body.Inter_Board ,req.body.Semester ,req.body.Shift ,req.body.Fee_Status,new Date(),new Date().getFullYear()], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Added Successfully' });
        });
    }
    
});

// To be Removed
app.get('/student/admissions', function (req, res) {
    con.query('SELECT Full_Name,Department FROM admission_form', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// Get Unique Years
app.get('/api/hod/admissions/years', function (req, res) {
    con.query('SELECT DISTINCT(Year) FROM admission_form;', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Year Wise Admissions
app.post('/api/hod/admissions', function (req, res) {
    con.query('SELECT * FROM admission_form WHERE Department = ? and Year = ?',[req.body.Department,req.body.Year], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// HOD Merit List Morning
app.post('/hod/meritlist', function (req, res) {
    con.query('SELECT * FROM admission_form WHERE Department = ? and Year = ? and Shift = ? ORDER BY merit DESC',[req.body.Department,req.body.Year,"Morning"], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// HOD Merit List Controller Morning
app.post('/hod/meritlistcontroller', function (req, res) {



    const schema = Joi.object({
        MeritList : Joi.string().required(),
        Start : Joi.number().required(),
        End : Joi.number().required(),
        Display : Joi.string().required(),
        Department : Joi.string().required()
    });
    
    result = schema.validate(req.body.formData);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{

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
        return res.send({ error: false,data: results, message: 'Merit List Generated SuccesFully' });
    });
}
});

// HOD Current Merit List Morning
app.post('/hod/meritlistcurrent', function (req, res) {
    con.query("SELECT * FROM meritlist_controller WHERE Department = ?", [req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// HOD Merit List Evening
app.post('/hod/meritlist2', function (req, res) {
    con.query('SELECT * FROM admission_form WHERE Department = ? and Year = ? and Shift = ? ORDER BY merit DESC',[req.body.Department,req.body.Year,"Evening"], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// HOD Merit List Controller Evening
app.post('/hod/meritlistcontroller2', function (req, res) {

    const schema = Joi.object({
        MeritList : Joi.string().required(),
        Start : Joi.number().required(),
        End : Joi.number().required(),
        Display : Joi.string().required(),
        Department : Joi.string().required()
    });
    
    result = schema.validate(req.body.formData);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{
    
    MeritList = req.body.formData.MeritList
    Start = req.body.formData.Start
    End = req.body.formData.End
    Display = req.body.formData.Display
    if(Display==="True"){
        Display=1
    }
    Department = req.body.formData.Department
    con.query("UPDATE meritlist_controller2 SET MeritList = ? ,	NOS_Start = ? ,	NOS_End = ? , Display = ? WHERE Department = ?", [MeritList ,Start ,End ,Display ,Department ], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'Merit List Generated SuccesFully' });
    });
}
});

// HOD Current Merit List Morning
app.post('/hod/meritlistcurrent2', function (req, res) {
    con.query("SELECT * FROM meritlist_controller2 WHERE Department = ?", [req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Set Merit List Formula
app.put('/api/ro/meritlist/formula', function (req, res) {

    const schema = Joi.object({
        Matric_Percentage : Joi.number().required(),
        Inter_Percentage : Joi.number().required()
    });

    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{

    con.query("UPDATE merit_list_formula SET Matric = ? , Inter = ?", [req.body.Matric_Percentage,req.body.Inter_Percentage], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'Formula Applied SuccesFully' });
    });
}
});


// Add Instructor
app.post('/api/hod/addinstructor', function (req, res) {


    const schema = Joi.object({
        Full_Name : Joi.string().required(),
        Email : Joi.string().required(),
        Username : Joi.string().required(),
        Password : Joi.string().min(6).required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
    con.query("INSERT INTO admins(Username,Password,Department) value(?,?,?) " ,[req.body.Username,req.body.Password,"Teacher"], function (error, results, fields) {
        if (error) throw error;

        var mail = `
        Your Name : ${req.body.Full_Name}\n
        Your Email : ${req.body.Email}\n
        Username : ${req.body.Username}\n
        Password : ${req.body.Password}\n
        `

        var mailOptions = {
            from: 'hurairah564@gmail.com',
            to: req.body.Email,
            subject: `You are Added as an Instructor in GMC Online Management System`,
            text: `Your Credentials are :\n\n\n${mail}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });

        return res.send({ error: false, data: results, message: 'Instructor Added Successfully' });
    });
}
});


// All Students Department Wise
app.post('/api/hod/students', function (req, res) {
    con.query('SELECT * FROM students WHERE Department = ?',[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


//Fee Status
app.put('/api/hod/students/:id', function (req, res) {

    con.query('SELECT * FROM students WHERE id = ?',[req.params.id], function (error, resultss, fields) {
        if (error) {
            console.log("Error")
        };

        if (req.body.fee === "Paid"){
            var Semester = parseInt(resultss[0]["Semester"]) + 1
        }
        if (req.body.fee === "Unpaid"){
            var Semester = parseInt(resultss[0]["Semester"]) - 1
        }

        con.query("UPDATE students SET Fee_Status = ?, Semester = ? WHERE id = ?", [req.body.fee,Semester,req.params.id], function (error, results, fields) {
            if (error) {
                console.log("Error")
            };
            return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
        });

    });
});

//Delete
app.delete('/api/hod/students/:id', function (req, res) {
    con.query("DELETE FROM students WHERE id = ?", [req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});



// To be Done yet
app.post('/api/ssio/busyinstructors', function (req, res) {
    con.query("SELECT * FROM timetable WHERE Time_Slot = ?", [req.body.Time_Slot], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get All Instructors
app.post('/api/ssio/instructors', function (req, res) {
    con.query("SELECT * FROM instructors", [req.body.Time_Slot], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

app.post('/hod/instructors', function (req, res) {
    con.query("SELECT * FROM instructors WHERE Department = ?",[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get Time Table
app.post('/api/hod/timetable', function (req, res) {
    con.query('SELECT DISTINCT(Fall_Spring) FROM timetable WHERE Department = ? ORDER BY Fall_Spring;',[req.body.Department], function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(resultss.length>0){
            Fall_Spring = resultss[resultss.length-1].Fall_Spring
        }
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
                
        con.query('SELECT * FROM timetable WHERE Fall_Spring = ? and Department = ?;',[Fall_Spring,req.body.Department], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false, data: results, message: 'Complete Data.' });
        });
    });
});


//Delete Time Table
app.delete('/api/hod/timetable/:id', function (req, res) {
    con.query("DELETE FROM timetable WHERE id = ?",[req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Form Submitted Successfully' });
    });
});

// Generate Time Table
app.post('/api/hod/timetablegenerate', function (req, res) {


    const schema = Joi.object({
        Department : Joi.string().required(),
        Fall_Spring : Joi.string().required(),
        Instructor_Department : Joi.string().required(),
        Instructor : Joi.string().required(),
        Semester : Joi.string().required(),
        Course_Code : Joi.string().required(),
        Course_Title : Joi.string().required(),
        Time_Slot : Joi.string().required(),
        Shift : Joi.string().required(),
        Room_no : Joi.string().required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
    con.query("INSERT INTO timetable(Department,Instructor,Instructor_Department,Course_Title,Course_Code,Semester,Time_Slot,Shift,Fall_Spring,Room_no) value(?,?,?,?,?,?,?,?,?,?) " ,[req.body.Department,req.body.Instructor,req.body.Instructor_Department,req.body.Course_Title,req.body.Course_Code,req.body.Semester,req.body.Time_Slot,req.body.Shift,req.body.Fall_Spring,req.body.Room_no], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Time Table Generated Successfully' });
    });
}
});



/// Get All Students Morning
app.get('/api/all/students', function (req, res) {
    con.query("SELECT * FROM students WHERE Shift = ?",["Morning"], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

/// Get All Students Evening
app.get('/api/all/students2', function (req, res) {
    con.query("SELECT * FROM students WHERE Shift = ?",["Evening"], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});



// Create Announcement
app.post('/api/ssio/announcement', function (req, res) {

    const schema = Joi.object({
        Subject : Joi.string().required(),
        Announcement : Joi.string().required(),
        Timing : Joi.string().required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else
    {

    con.query("INSERT INTO announcements(Subject,Announcement,Timing) value(?,?,?) " ,[req.body.Subject,req.body.Announcement,req.body.Timing], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Announcement Submitted Successfully' });
    });
}
});



// Get Announcements
app.get('/api/student/announcements', function (req, res) {
    con.query("SELECT * FROM announcements", function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});



// Delete Announcements
app.delete('/api/ssio/announcements/:id', function (req, res) {
    con.query("DELETE FROM announcements WHERE id = ?",[req.params.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Form Submitted Successfully' });
    });
});

//Generate Award List
app.post('/api/instructor/awardlist', function (req, res) {
    var sql = "INSERT INTO awardlist (Roll, Name, Mids, Sessional, Course_Title, Course_Code, Fall_Spring,Shift) VALUES ?";
    var values = [
    ];

    for (i=0;i<100;i++){
        if(req.body['Roll'+i]!="" && req.body['Name'+i]!="" && req.body['Mids'+i]!="" && req.body['Sessional'+i]!="") {
            values.push(
                [req.body['Roll'+i], req.body['Name'+i], req.body['Mids'+i], req.body['Sessional'+i], req.body.Course_Title,req.body.Course_Code,req.body.Fall_Spring,req.body.Shift]
            )
        }
    }

    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});


// Unique Results from Awardlist
app.post('/api/ssio/awardlists', function (req, res) {

        con.query('SELECT DISTINCT(Fall_Spring) FROM awardlist ORDER BY Fall_Spring;', function (error, resultss, fields) {
            if (error) {
                console.log(error)
            };
            if(resultss.length>0){
                Fall_Spring = resultss[resultss.length-1].Fall_Spring
            }
            if(req.body.Fall_Spring){
                Fall_Spring = req.body.Fall_Spring
            }
            
            con.query('SELECT * FROM awardlist WHERE Fall_Spring = ?;',[Fall_Spring], function (error, results, fields) {
                if (error) {
                    console.log(error)
                };
                return res.send({ error: false, data: results, message: 'Complete Data.' });
            });
        });
});

//Delete Awardlist
app.delete('/api/ssio/awardlist/:id', function (req, res) {
    con.query("DELETE FROM awardlist WHERE id = ?", [req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get All Awardlists Session Wise
app.post('/api/ssio/details', function (req, res) {
    con.query('SELECT * FROM awardlist WHERE Fall_Spring = ? and Course_Title = ? and Shift = ?;',[req.body.Fall_Spring,req.body.Course_Title,req.body.Shift], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// DateSheet Generate Morning
app.post('/api/hod/generatedatesheet', function (req, res) {


    const schema = Joi.object({
        Department : Joi.string().required(),
        Course_Title : Joi.string().required(),
        Course_Code : Joi.string().required(),
        Time_Slot : Joi.string().required(),
        Shift : Joi.string().required(),
        Fall_Spring : Joi.string().required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{

    con.query("INSERT INTO datesheet(Course_Title,Course_Code,Department,Shift,Time_Slot,Fall_Spring) value(?,?,?,?,?,?) " ,[req.body.Course_Title,req.body.Course_Code,req.body.Department,"Morning",req.body.Time_Slot,req.body.Fall_Spring], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Datesheet Generated Successfully' });
    });

}
});


// Get DateSheet Morning
app.post('/api/hod/datesheet', function (req, res) {


    con.query('SELECT DISTINCT(Fall_Spring) FROM datesheet WHERE Department = ? and Shift = ? ORDER BY Fall_Spring;',[req.body.Department,"Morning"], function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };

        if(resultss.length>0){
            Fall_Spring = resultss[resultss.length-1].Fall_Spring
        }
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        
        con.query('SELECT * FROM datesheet WHERE Fall_Spring = ? and Shift = ? and Department = ?;',[Fall_Spring,"Morning",req.body.Department], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false, data: results, message: 'Complete Data.' });
        });
    });
});


// DateSheet Generate Evening
app.post('/api/hod/generatedatesheet2', function (req, res) {


    const schema = Joi.object({
        Department : Joi.string().required(),
        Course_Title : Joi.string().required(),
        Course_Code : Joi.string().required(),
        Time_Slot : Joi.string().required(),
        Shift : Joi.string().required(),
        Fall_Spring : Joi.string().required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{

    con.query("INSERT INTO datesheet(Course_Title,Course_Code,Department,Shift,Time_Slot,Fall_Spring) value(?,?,?,?,?,?) " ,[req.body.Course_Title,req.body.Course_Code,req.body.Department,"Evening",req.body.Time_Slot,req.body.Fall_Spring], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Datesheet Generated Successfully' });
    });
}
});


// Get DateSheet Evening
app.post('/api/hod/datesheet2', function (req, res) {
    con.query('SELECT DISTINCT(Fall_Spring) FROM datesheet WHERE Department = ? and Shift = ? ORDER BY Fall_Spring;',[req.body.Department,"Evening"], function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(resultss.length>0){
            Fall_Spring = resultss[resultss.length-1].Fall_Spring
        }
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        
        con.query('SELECT * FROM datesheet WHERE Fall_Spring = ? and Shift = ? and Department = ?;',[Fall_Spring,"Evening",req.body.Department], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false, data: results, message: 'Complete Data.' });
        });
    });
});

//Delete DateSheet
app.delete('/api/hod/datesheet/:id', function (req, res) {
    con.query("DELETE FROM datesheet WHERE id = ?", [req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

app.listen(3001, function () {
    console.log('Node app is running on port 3001');
});