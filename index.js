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
var fileUpload = require('express-fileupload');
var path = require('path');
const multer = require('multer');
require('dotenv').config()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/images');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });



  const upload = multer({
    storage: storage
  });

// var transporter = nodemailer.createTransport({
//     host:"gmcsialkot.cf",
//     service: 'mail.privateemail.com',
//     port:465,
//     secure:true,
//     auth: {
//       user: "admin@gmcsialkot.cf",
//       pass: "rUtrFJ@7kspf"
//     }
//   });

  const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
       user: "hurairah564@gmail.com",
       pass: '5156558gg'
    }
});

// var transporter = nodemailer.createTransport({
//     host: 'smtp.zoho.com',
//     port: 465,
//     secure: false, // use SSL
//     auth: {
//         user: 'hurairah@zoho.com',
//         pass: '5156558z'
//     }
// });

const corsOptions ={
    origin:"http://localhost:3307", 
    credentials:true,
    optionSuccessStatus:200
}



app.use(express.json())
app.use(Cookie_Parser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.set('view engine', 'ejs');



app.use(cors(corsOptions));

var options = {
	host: process.env.HOST,
	port: process.env.PORT,
	user: process.env.USER,
	password: process.env.PASS,
    clearExpired: true,
    checkExpirationInterval: 1000*60*60*365,
	expiration: 1000*60*60*365,
	database: process.env.DB
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
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
    multipleStatements:true
  });


app.get("/", function(req, res,next){

    return res.send({"GMC":"Huraiah"})

});


app.get("/loginstatus", function(req, res,next){
    if(req.session.hod){
       return res.send({LoggedIn:true,HOD:true,session:req.session.hod})
    }
    return res.send({LoggedIn:false,data:req.session.hod})
})

// Student Login
app.post("/api/student/login", function(req, res){

    const schema = Joi.object({
        Email : Joi.string().required(),
        Password : Joi.string().required(),
    });

    result = schema.validate(req.body.formData);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{

    Email = req.body.formData.Email
    Password = req.body.formData.Password

    con.query("SELECT * FROM students WHERE Email=? and Password=?",[Email,Password], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ message: "Incorrect Credentials",LoggedIn:false});
        }
        if(results[0].Password === Password){

            req.session.hod = results[0]

            return res.send({data: results, session : req.session.hod ,LoggedIn:true,HOD:true});
        }
        return res.send({ message: "Incorrect Credentials",LoggedIn:false});
    });
}
});

// Student Profile
app.post("/api/student/profile", function(req, res){

    con.query("SELECT * FROM students WHERE id=?",[req.body.id], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ Message: "Incorrect Credentials",LoggedIn:false});
        }
        return res.send({data: results[0], LoggedIn:true,HOD:true});
    });
});

// Admin Login
app.post("/api/login", function(req, res){

    const schema = Joi.object({
        Username : Joi.string().required(),
        Password : Joi.string().required(),
    });

    result = schema.validate(req.body.formData);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{

    Username = req.body.formData.Username
    Password = req.body.formData.Password

    con.query("SELECT * FROM admins WHERE Username=?",[Username], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ message: "Incorrect Credentials",LoggedIn:false});
        }
        if(results[0].Password === Password){

            req.session.hod = results[0]

            return res.send({ message: "LoggedIn Successfully",data: results, session : req.session.hod ,LoggedIn:true,HOD:true});
        }
        return res.send({ message: "Incorrect Credentials",LoggedIn:false});
    });
}

});

// Forget Password
app.post("/api/forgetpassword", function(req, res){

    Email = req.body.formData.Email

    con.query("SELECT * FROM admins WHERE Email=?",["hurairahmalik5156558@gmail.com"], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ message: "User Does Not Exist",LoggedIn:false});
        }
        if(String(results[0].Email).toLowerCase() === String(Email).toLowerCase()){

            mail = `
            Username : ${results[0].Username}
            Password : ${results[0].Password}
            `

            var mailOptions = {
                from: 'hurairah564@gmail.com',
                to: Email,
                subject: `Your Credentials`,
                text: `Your Credentials are :\n\n${mail}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });

            return res.send({ message: "Check Your Email",LoggedIn:false});
        }
        return res.send({ message: "User Does Not Exist",LoggedIn:false});
    });

});


// Change Student Password
app.put("/api/student/change/login", function(req, res){


    const schema = Joi.object({
        id : Joi.string().required(),
        OldUsername : Joi.string().required(),
        OldPassword : Joi.string().required(),
        Password : Joi.string().required()
    });
    
    result = schema.validate(req.body.formData);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{


    id = req.body.formData.id
    OldUsername = req.body.formData.OldUsername
    OldPassword = req.body.formData.OldPassword
    Password = req.body.formData.Password

    con.query("SELECT Email,Password FROM students WHERE id = ?",[id], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ message: "Incorrect Credentials",LoggedIn:false});
        }

        if(results[0].Email=== OldUsername && results[0].Password=== OldPassword){

            con.query("UPDATE students SET Password = ? WHERE id = ?", [Password,id], function (error, results, fields) {
                if (error) {
                    console.log("Error")
                };
                return res.send({ error: false,data: results, message: 'Succesfully Changed' });
            });
        }
        else {
            return res.send({ message: "Incorrect Credentials",LoggedIn:false});
        }
    });
}

});


// Change Password
app.put("/api/change/login", function(req, res){


    const schema = Joi.object({
        id : Joi.string().required(),
        OldUsername : Joi.string().required(),
        OldPassword : Joi.string().required(),
        Username : Joi.string().required(),
        Password : Joi.string().required()
    });
    
    result = schema.validate(req.body.formData);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }

    else{


    id = req.body.formData.id
    OldUsername = req.body.formData.OldUsername
    OldPassword = req.body.formData.OldPassword
    Username = req.body.formData.Username
    Password = req.body.formData.Password

    con.query("SELECT Username,Password FROM admins WHERE id = ?",[id], function (error, results, fields) {
        if (results.length < 1) {
            return res.send({ message: "Incorrect Credentials",LoggedIn:false});
        }

        if(results[0].Username=== OldUsername && results[0].Password=== OldPassword){

            con.query("UPDATE admins SET Username = ? , Password = ? WHERE id = ?", [Username,Password,id], function (error, results, fields) {
                if (error) {
                    console.log("Error")
                };
                return res.send({ error: false,data: results, message: 'Succesfully Changed' });
            });
        }
        else {
            return res.send({ message: "Incorrect Credentials",LoggedIn:false});
        }
    });
}

});


app.post("/logout", function(req, res){
    res.clearCookie('session_cookie_name')
    if(req.session.hod){
        req.session.destroy()
        res.send({ Message: "Logout Success",LoggedIn:false,HOD:false});
    }
    
});


app.get("/image/:image", (req, res) => {
    res.download(path.join(__dirname, `./public/images/${req.params.image}`));
});

app.post("/api/student/image", (req, res) => {

    if(!req.files){
        return res.send({ message: 'Please Select an Image'})
    }

    var file = req.files.image

    file.mv('public/images/'+String(Object.keys(req.files)[1]), function(err) {
                             
        if (err)

          return res.status(500).send(err);
    });
});

app.post('/api/student/addmissonform', function (req, res) {

    if(String(req.body.Fresh_ADP)==="" || String(req.body.Department)==="" || String(req.body.Shift)==="" || String(req.body.Gender)==="" || String(req.body.Domicile)===""){
        return res.send({ message: 'Please Fill All Red Marked Fields'})
    }


    DOBstr = String(req.body.DOB).split("-")
    DOB = DOBstr[2] + "-" + DOBstr[1] + "-" + DOBstr[0]

    CNIC = String(req.body.CNIC).slice(0,5) + "-" + String(req.body.CNIC).slice(5,12) + "-" + String(req.body.CNIC).slice(12,13)


    Full_Name = String(req.body.Full_Name).toUpperCase()

    var mail = `
        Full Name : ${Full_Name}\n
        Father Name : ${req.body.Father_Name}\n
        Gender : ${req.body.Gender}\n
        CNIC : ${CNIC}\n
        DOB : ${DOB}\n
        Email : ${req.body.Email}\n
        Phone : ${req.body.Phone}\n
        Address : ${req.body.Address}\n
        Domicile : ${req.body.Domicile}\n
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

    con.query('SELECT * FROM merit_list_formula', function (error, resultss, fields) {
        if (error) {
            console.log("Error")
        };

        matric_percentage = resultss[0]['Matric']
        inter_percentage = resultss[0]['Inter']

        if(req.body.Matric_Obtained_Marks==="0"||req.body.Matric_Total_Marks==="0"||req.body.Inter_Obtained_Marks==="0"||req.body.Inter_Total_Marks==="0"){
            return res.send({ message: 'Total Marks or Obtained Marks cannot be 0'})
        }

        
        merit = ((parseInt(req.body.Matric_Obtained_Marks)/parseInt(req.body.Matric_Total_Marks))*parseInt(matric_percentage))+((parseInt(req.body.Inter_Obtained_Marks)/parseInt(req.body.Inter_Total_Marks))*parseInt(inter_percentage))

        con.query("INSERT INTO admission_form(Fresh_ADP,Full_Name, image ,Father_Name, Gender, CNIC , DOB , Email , Phone, Guardian_Phone , Address , Domicile , Department , Shift , Matric_Roll  , Matric_Total_Marks  , Matric_Obtained_Marks  , Matric_Year  , Matric_Board  , Inter_Roll  , Inter_Total_Marks  , Inter_Obtained_Marks  , Inter_Year  , Inter_Board  , ADP_Roll  , ADP_Total_Marks  , ADP_Obtained_Marks  , ADP_Year  , ADP_Board, merit, Status , Admission_Time , Year ) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [req.body.Fresh_ADP ,Full_Name ,req.body.image ,req.body.Father_Name ,req.body.Gender ,CNIC  ,DOB  ,req.body.Email  ,req.body.Phone ,req.body.Guardian_Phone  ,req.body.Address , req.body.Domicile  ,req.body.Department , req.body.Shift ,req.body.Matric_Roll  ,req.body.Matric_Total_Marks  ,req.body.Matric_Obtained_Marks  ,req.body.Matric_Year  ,req.body.Matric_Board  ,req.body.Inter_Roll  ,req.body.Inter_Total_Marks  ,req.body.Inter_Obtained_Marks  ,req.body.Inter_Year  ,req.body.Inter_Board ,req.body.ADP_Roll  ,req.body.ADP_Total_Marks  ,req.body.ADP_Obtained_Marks  ,req.body.ADP_Year  ,req.body.ADP_Board , merit , "WhiteList" , new Date() , new Date().getFullYear()], function (error, results, fields) {
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

            return res.send({ error: false, data: results, message: 'Form Submitted Successfully!' });
        });
    });
});



// Get All admission_form IDs
app.get('/api/hod/admission_form', function (req, res) {
    con.query('SELECT id FROM admission_form', function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Check Admission Access
app.get('/api/ro/admission_control', function (req, res) {
    con.query('SELECT * FROM admission_control', function (error, results, fields) {
        if (error) {
            console.log(error)
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


    if(String(req.body.Semester)==="" || String(req.body.Shift)==="" || String(req.body.Fee_Status)==="" || String(req.body.Gender)===""){
        return res.send({ message: 'Please Fill All Red Marked Fields'})
    }

    var random = Math.random().toString(36).substring(7)

        con.query('SELECT Email FROM students WHERE Email=?',[req.body.Email], function (error, resultss, fields) {
            if (error) {
                console.log(error)
            };
            if(resultss.length>1){
                return res.send({ error: false, message: 'Email Already Exists' });
            }
                con.query("INSERT INTO students(Fresh_ADP, Roll,Full_Name, image , Father_Name, Gender, CNIC , DOB , Email , Phone , Guardian_Phone , Address, Domicile , Department , Matric_Roll  , Matric_Total  , Matric_Obtained_Marks  , Matric_Year  , Matric_Board  , Inter_Roll  , Inter_Total  , Inter_Obtained_Marks  , Inter_Year  , Inter_Board , ADP_Roll  , ADP_Total  , ADP_Obtained_Marks  , ADP_Year  , ADP_Board , Semester , Degree_Status , Courses , Shift , Fee_Status , Status , Admission_Time , Year , Password, Designation ) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [req.body.Fresh_ADP , req.body.Roll , req.body.Full_Name, req.body.image ,req.body.Father_Name ,req.body.Gender ,req.body.CNIC  ,req.body.DOB  ,req.body.Email  ,req.body.Phone ,req.body.Guardian_Phone  ,req.body.Address ,req.body.Domicile  ,req.body.Department  ,req.body.Matric_Roll  ,req.body.Matric_Total_Marks  ,req.body.Matric_Obtained_Marks  ,req.body.Matric_Year  ,req.body.Matric_Board  ,req.body.Inter_Roll  ,req.body.Inter_Total_Marks  ,req.body.Inter_Obtained_Marks  ,req.body.Inter_Year ,req.body.Inter_Board ,req.body.ADP_Roll  ,req.body.ADP_Total_Marks  ,req.body.ADP_Obtained_Marks  ,req.body.ADP_Year ,req.body.ADP_Board ,req.body.Semester , "Continue" , "" ,req.body.Shift ,req.body.Fee_Status,"Active",new Date(),new Date().getFullYear(),random,"Student"], function (error, results, fields) {
                    if (error) throw error;

                    // var mailOptions = {
                    //     from: 'hurairah564@gmail.com',
                    //     to: req.body.Email,
                    //     subject: `You are now a Regular Student in ${req.body.Department}`,
                    //     text: `Your Login Credentials are :\n\n
                    //     Username : ${req.body.Email}
                    //     Password : ${random}`
                    // };
                    
                    // transporter.sendMail(mailOptions, function(error, info){
                    //     if (error) {
                    //     console.log(error);
                    //     } else {
                    //     console.log('Email sent: ' + info.response);
                    //     }
                    // });

                    return res.send({ error: false, data: results, message: 'Added Successfully' });
                });
        });
    
});


// Update student
app.put('/api/hod/editstudent', function (req, res) {

        con.query("UPDATE students SET Roll=?,Full_Name=?,image=?, Father_Name=?, Gender=?, CNIC=? , DOB =?, Email =?, Phone=?, Guardian_Phone=? , Address=? , Domicile =? , Department=? , Matric_Roll=?  , Matric_Total =? , Matric_Obtained_Marks =? , Matric_Year=?  , Matric_Board =? , Inter_Roll =? , Inter_Total  =?, Inter_Obtained_Marks  =?, Inter_Year =? , Inter_Board =?, ADP_Roll =? , ADP_Total  =?, ADP_Obtained_Marks  =?, ADP_Year =? , ADP_Board =?, Semester =?, Shift =?, ROA=?,HOD_Dues=? , Courses =? WHERE id=?", [req.body.Roll , req.body.Full_Name, req.body.image ,req.body.Father_Name ,req.body.Gender ,req.body.CNIC  ,req.body.DOB  ,req.body.Email  ,req.body.Phone ,req.body.Guardian_Phone  ,req.body.Address ,req.body.Domicile  ,req.body.Department  ,req.body.Matric_Roll  ,req.body.Matric_Total  ,req.body.Matric_Obtained_Marks  ,req.body.Matric_Year  ,req.body.Matric_Board  ,req.body.Inter_Roll  ,req.body.Inter_Total  ,req.body.Inter_Obtained_Marks  ,req.body.Inter_Year ,req.body.Inter_Board ,req.body.ADP_Roll  ,req.body.ADP_Total  ,req.body.ADP_Obtained_Marks  ,req.body.ADP_Year ,req.body.ADP_Board ,req.body.Semester ,req.body.Shift, req.body.ROA,req.body.HOD_Dues ,req.body.Courses,req.body.id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Updated Successfully' });
        });
});

// AO Dues
app.put('/api/ao/dues', function (req, res) {

    con.query("UPDATE students SET AO_Dues=? WHERE id = ?",[req.body.AO_Dues,req.body.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });

});

// RO Dues
app.put('/api/ro/dues', function (req, res) {

    con.query("UPDATE students SET RO_Dues=? WHERE id = ?",[req.body.RO_Dues,req.body.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });

});

// Library Dues
app.put('/api/library/dues', function (req, res) {

    con.query("UPDATE students SET Library_Dues=? WHERE id = ?",[req.body.Library_Dues,req.body.id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });

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


// Year Wise Admissions Fresh
app.post('/api/hod/admissions/add', function (req, res) {


    query = `SELECT * FROM admission_form WHERE id = '${req.body.Roll}';`

    con.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Year Wise Admissions Fresh
app.post('/api/hod/admissions', function (req, res) {

    id=""
    if(req.body.Roll){
        id = ` and id='${req.body.Roll}'`
    }

    query = `SELECT * FROM admission_form WHERE Department = '${req.body.Department}' and Fresh_ADP='Fresh' and Year = '${req.body.Year}'${id};`

    con.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// Year Wise Admissions ADP
app.post('/api/hod/admissions/adp', function (req, res) {

    id=""
    if(req.body.Roll){
        id = ` and id='${req.body.Roll}'`
    }

    query = `SELECT * FROM admission_form WHERE Department = '${req.body.Department}' and Fresh_ADP='ADP' and Year = '${req.body.Year}'${id};`

    con.query(query, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Status Update
app.put('/api/students/status/:id', function (req, res) {
    con.query("UPDATE admission_form SET Status = ? WHERE id = ?;", [req.body.Statuss,req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Student Merit List Morning
app.post('/student/meritlist', function (req, res) {
    
    con.query(`SELECT * FROM admission_form WHERE Shift=? and Fresh_ADP='Fresh' and Department = ? and Status=? and Year = ?  ORDER BY merit DESC`,[req.body.Shift,req.body.Department,"WhiteList", new Date().getFullYear()], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// HOD Merit List Morning
app.post('/hod/meritlist', function (req, res) {


    var Status = ""
    var Years = ""

    if(!req.body.Status){
        

        Status = ` and Status = 'WhiteList'`
    }
    else if(req.body.Status!=""){
        Status = ` and Status = '${req.body.Status}'`
    }
    else{
        Status = ` and Status = 'WhiteList'`
    }
    if(!req.body.Years){
        Years = ` and Year = '${new Date().getFullYear()}'`
    }
    else if(req.body.Years!=""){
        Years = ` and Year = '${req.body.Years}'`
    }
    else{
        Years = ` and Year = '${new Date().getFullYear()}'`
    }

    update = `SELECT * FROM admission_form WHERE Shift=? and Fresh_ADP='Fresh' and Department = '${req.body.Department}'${Status}${Years} ORDER BY merit DESC`
    

    con.query(update,["Morning","WhiteList"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// HOD Merit List Controller Morning
app.post('/hod/meritlistcontroller', function (req, res) {

    if(req.body.formData.MeritList===""||req.body.formData.NOS_Start===""||req.body.formData.NOS_End===""||req.body.formData.Display===""){
        return res.send({ message: 'All Fields Required'})
    }

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

    var Status = ""
    var Years = ""

    if(!req.body.Status){
        

        Status = ` and Status = 'WhiteList'`
    }
    else if(req.body.Status!=""){
        Status = ` and Status = '${req.body.Status}'`
    }
    else{
        Status = ` and Status = 'WhiteList'`
    }
    if(!req.body.Years){
        Years = ` and Year = '${new Date().getFullYear()}'`
    }
    else if(req.body.Years!=""){
        Years = ` and Year = '${req.body.Years}'`
    }
    else{
        Years = ` and Year = '${new Date().getFullYear()}'`
    }

    update = `SELECT * FROM admission_form WHERE Shift=? and Fresh_ADP='Fresh' and Department = '${req.body.Department}'${Status}${Years} ORDER BY merit DESC`


    con.query(update,["Evening","WhiteList"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// HOD Merit List Controller Evening
app.post('/hod/meritlistcontroller2', function (req, res) {

    if(req.body.formData.MeritList===""||req.body.formData.NOS_Start===""||req.body.formData.NOS_End===""||req.body.formData.Display===""){
        return res.send({ message: 'All Fields Required'})
    }

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

    if(req.body.Designation===""){
        return res.send({ message: 'Please Select Designation' });
    }


    con.query("INSERT INTO admins(Name,Email,Username,Password,Designation,Department,Role) value(?,?,?,?,?,?,?) " ,[req.body.Name,req.body.Email,req.body.Username,req.body.Password,"Teacher",req.body.Department,req.body.Designation], function (error, results, fields) {
        if (error) throw error;

        var mail = `
        Your Name : ${req.body.Name}\n
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
});

// Add Courses
app.post('/api/hod/addcourses', function (req, res) {

    const schema = Joi.object({
        Department : Joi.string().required(),
        Course_Title : Joi.string().required(),
        Course_Code : Joi.string().required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
    con.query("INSERT INTO courses(Course_Title,Course_Code,Department) value(?,?,?) " ,[req.body.Course_Title,req.body.Course_Code,req.body.Department], function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'Course Added Successfully' });
    });
}
});


// Assign Single Courses
app.put('/api/hod/assigncourse', function (req, res) {

    const schema = Joi.object({
        id : Joi.number().required(),
        Courses : Joi.string().required(),
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
    con.query("UPDATE students SET Courses = ? WHERE id = ?" ,[req.body.Courses,req.body.id], function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'Courses Assigned Successfully' });
    });
}
});

// Add Record of Achievements
app.put('/api/hod/roa', function (req, res) {

    const schema = Joi.object({
        id : Joi.number().required(),
        ROA : Joi.string().required(),
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
    con.query("UPDATE students SET ROA = ? WHERE id = ?" ,[req.body.ROA,req.body.id], function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'Saved Successfully' });
    });
}
});

// // Get Record of Achievements
// app.get('/api/hod/get/roa', function (req, res) {

//     console.log(req.body)
    
//     con.query("SELECT ROA FROM students WHERE id = ?" ,[req.body.id], function (error, results, fields) {
//         if (error) throw error;

//         return res.send({ error: false, data: results, message: 'Saved Successfully' });
//     });
// });


// Assign Courses
app.put('/api/hod/assigncourses', function (req, res) {

    if(req.body.Semester===""){
        return res.send({ message: 'Please Select Semester'})
    }

    con.query("UPDATE students SET Courses = ? WHERE Semester = ? and Department = ?" ,[req.body.Courses,req.body.Semester,req.body.Department], function (error, results, fields) {
        if (error) throw error;

        return res.send({ error: false, data: results, message: 'Courses Assigned Successfully' });
    });
});


// Get All Courses
app.post('/api/all/courses', function (req, res) {

    con.query('SELECT * FROM courses', function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Get Courses Department Wise
app.post('/api/hod/course', function (req, res) {

    con.query('SELECT * FROM courses WHERE Department = ?',[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// Delete Courses
app.delete('/api/hod/courses/:id', function (req, res) {
    con.query('DELETE FROM courses WHERE id = ?',[req.params.id], function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});


// Semester Upgrade
app.post('/api/hod/semesterupgrade', function (req, res) {


    con.query('SELECT * FROM students WHERE Department = ? and Status = ? and Degree_Status=? and Fee_Status = ?',[req.body.Department,"Active","Continue","Paid"], function (error, resultss, fields) {

        update = ""

        if(resultss.length>=0){
            resultss.map((student)=>{
                update = update + `UPDATE students SET Semester = ${parseInt(student.Semester) + 1} WHERE id = ${student.id};`
            })
        }

            con.query(update, function (error, results, fields) {
                if (error) {
                    return res.send({ error: false, data: results, message: 'Unsuccessfull! Something Went Wrong' });
                };

                con.query('UPDATE students SET Fee_Status = ? WHERE Department=?',["Unpaid",req.body.Department], function (error, results, fields) {
                    if (error) {
                        console.log("Error")
                    };
                });

                return res.send({ error: false, data: results, message: 'Semester Upgraded Successfully' });
            });

        if (error) {
            console.log("Error")
        };
    });
});

// All Students Department Wise Dashboard
app.post('/api/hod/students/dashboard', function (req, res) {
    update = `SELECT * FROM students WHERE Department = '${req.body.Department}'`
    con.query(update, function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});
// All Students Department Wise
app.post('/api/hod/students', function (req, res) {

    var Status = ""
    var Fee_Status = ""
    var Shift = ""
    var Semester = ""
    var Degree_Status = ""
    var Gender = ""
    var Names = ""
    var Roll = ""

    if(req.body.Names==="" && req.body.Roll===""){
        if(req.body.Status!=""){
            Status = ` and Status = '${req.body.Status}'`
        }
        if(req.body.Fee_Status!=""){
            Fee_Status = ` and Fee_Status = '${req.body.Fee_Status}'`
        }
        if(req.body.Degree_Status!=""){
            Degree_Status = ` and Degree_Status = '${req.body.Degree_Status}'`
        }
        else{
            Degree_Status = ` and Degree_Status = 'Continue'`
        }
        if(req.body.Gender!=""){
            Gender = ` and Gender = '${req.body.Gender}'`
        }
        if(req.body.Shift!=""){
            Shift = ` and Shift = '${req.body.Shift}'`
        }
        if(req.body.Semester!=""){
            Semester = ` and Semester = '${req.body.Semester}'`
        }
    }
    if(req.body.Names!=""){
        Names = ` and Full_Name = '${req.body.Names}'`
    }
    if(req.body.Roll!=""){
        Roll = ` and Roll = '${req.body.Roll}'`
    }

    update = `SELECT * FROM students WHERE Department = '${req.body.Department}'${Status}${Fee_Status}${Shift}${Semester}${Degree_Status}${Gender}${Names}${Roll}`
    console.log(update)
    con.query(update, function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// Get Search List
app.post('/api/hod/students/search', function (req, res) {

    update = `SELECT * FROM students WHERE Department = '${req.body.Department}'`
    con.query(update, function (error, results, fields) {
        if (error) {
            console.log("Error")
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

//Fee Status
app.put('/api/hod/students/:id', function (req, res) {

        con.query("UPDATE students SET Fee_Status = ? WHERE id = ?", [req.body.fee,req.params.id], function (error, results, fields) {
            if (error) {
                console.log("Error")
            };
            return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
        });
});

// Status Update
app.put('/api/hod/students/status/:id', function (req, res) {
        con.query("UPDATE students SET Status = ? WHERE id = ?;", [req.body.Statuss,req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
        });
});


// Degree Status Update
app.put('/api/hod/students/degreestatus/:id', function (req, res) {
    con.query("UPDATE students SET Degree_Status = ? WHERE id = ?;", [req.body.Statuss,req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
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
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Delete Instructor
app.delete('/api/hod/instructors/:id', function (req, res) {

    con.query(`DELETE FROM admins WHERE id = ?`,[req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Get All Instructors
app.post('/api/hod/instructors', function (req, res) {

    con.query(`SELECT id,Name,Department,Role FROM admins WHERE Department = ? and Designation = ?`,[req.body.Department,"Teacher"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get All Instructors
app.post('/api/ssio/instructors', function (req, res) {

    Department = ""
    if(req.body.Department){
        Department = `WHERE Department = '${req.body.Department}'`
    }

    con.query(`SELECT Name,Department,Role FROM admins ${Department}`, function (error, results, fields) {
        if (error) {
            console.log(error)
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

    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
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

    if(req.body.Fall_Spring===""||req.body.Instructor_Department===""||req.body.Instructor===""||req.body.Instructor_Designation===""||req.body.Semester===""||req.body.Course_Code===""||req.body.Course_Title===""||req.body.Time_Slot===""||req.body.Shift===""||req.body.Room_no===""){
        return res.send({ message: 'All Fields Required'})
    }

    con.query("INSERT INTO timetable(Department,Instructor,Instructor_Department,Instructor_Designation,Course_Title,Course_Code,Semester,Time_Slot,Shift,Fall_Spring,Room_no) value(?,?,?,?,?,?,?,?,?,?,?) " ,[req.body.Department,req.body.Instructor,req.body.Instructor_Department,req.body.Instructor_Designation,req.body.Course_Title,req.body.Course_Code,req.body.Semester,req.body.Time_Slot,req.body.Shift,req.body.Fall_Spring,req.body.Room_no], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Time Table Generated Successfully' });
    });
});


// Add Employee
app.get('/api/ao/employee', function (req, res) {

    con.query("SELECT * FROM employee", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });
});


// Get Salary Record
app.get('/api/ao/employeebill', function (req, res) {

    con.query("SELECT * FROM employeebill", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });
});

// Get Visiting Record
app.get('/api/ao/visiting', function (req, res) {

    con.query("SELECT * FROM visiting_bill", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });
});

// Generate Employee Bill
app.post('/api/ao/employeebill', function (req, res) {

    con.query("INSERT INTO employeebill(Name,Designation,Amount,Time) value(?,?,?,?)" ,[req.body.Name,req.body.Designation,req.body.Amount,String(new Date()).slice(1,15)], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Bill Generated Successfully' });
    });
});


// Add Employee
app.post('/api/ao/employee', function (req, res) {

    con.query("INSERT INTO employee(Name,Designation) value(?,?)" ,[req.body.Name,req.body.Designation], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Added Successfully' });
    });
});


// Generate Visiting Bill
app.post('/api/ao/visiting', function (req, res) {

    con.query("INSERT INTO visiting_bill(Instructor,Designation,Periods,Amount_per_lecture,Total_Amount,Time) value(?,?,?,?,?,?)" ,[req.body.Instructor,req.body.Designation,req.body.Periods,req.body.Amount,parseInt(req.body.Periods)*parseInt(req.body.Amount),String(new Date()).slice(1,15)], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Bill Generated Successfully' });
    });
});


// Update Time Table
app.put('/api/hod/edit/time', function (req, res) {

    const schema = Joi.object({
        id : Joi.number().required(),
        Department : Joi.string().required(),
        Fall_Spring : Joi.string().required(),
        Instructor_Department : Joi.string().required(),
        Instructor : Joi.string().required(),
        Instructor_Designation : Joi.string().required(),
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
        con.query("UPDATE timetable SET Fall_Spring=?,Instructor_Department=?, Instructor=?, Instructor_Designation=?, Semester=? , Course_Code =?, Course_Title =?, Time_Slot=? , Shift=? , Room_no=? WHERE id=?", [req.body.Fall_Spring , req.body.Instructor_Department ,req.body.Instructor ,req.body.Instructor_Designation ,req.body.Semester  ,req.body.Course_Code  ,req.body.Course_Title ,req.body.Time_Slot  ,req.body.Shift  ,req.body.Room_no,req.body.id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'Updated Successfully' });
        });
    }
});


// Get Search List Morning
app.get('/api/alll/hod/students', function (req, res) {


    con.query(`SELECT * FROM students WHERE Department = ?`,[req.body.Department], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Get Search List Morning
app.get('/api/alll/students', function (req, res) {

    con.query(`SELECT * FROM students`, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Get Merit List Formula
app.get('/api/ro/formula', function (req, res) {

    con.query(`SELECT * FROM merit_list_formula`, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// AO Dashboard
app.get('/api/ao/dashboard', function (req, res) {

    con.query(`SELECT * FROM students WHERE Status = 'Active' and Degree_Status='Continue';`, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// SSIO and RO Dashboard
app.get('/api/all/dashboard', function (req, res) {

    con.query(`SELECT * FROM students WHERE Status = 'Active';`, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Get Search List Morning
app.get('/api/all/students', function (req, res) {

    con.query(`SELECT * FROM students WHERE Shift = ?;`,["Morning"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get Search List Evening
app.get('/api/all/students2', function (req, res) {

    con.query(`SELECT * FROM students WHERE Shift = ?;`,["Evening"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});



// Get All Students RO Morning
app.post('/api/ro/students', function (req, res) {

    var Status = ""
    var Fee_Status = ""
    var Department = ""
    var Semester = ""
    var Names = ""
    var Roll = ""

    if(req.body.Names==="" && req.body.Roll===""){
        if(req.body.Status!=""){
            Status = ` and Status = '${req.body.Status}'`
        }
        if(req.body.Fee_Status!=""){
            Fee_Status = ` and Fee_Status = '${req.body.Fee_Status}'`
        }
        if(req.body.Department!=""){
            Department = ` and Department = '${req.body.Department}'`
        }
        if(req.body.Semester!=""){
            Semester = ` and Semester = '${req.body.Semester}'`
        }
    }
    if(req.body.Names!=""){
        Names = ` and Full_Name = '${req.body.Names}'`
    }
    if(req.body.Roll!=""){
        Roll = ` and Roll = '${req.body.Roll}'`
    }

    con.query(`SELECT * FROM students WHERE Shift = ?${Status}${Fee_Status}${Department}${Semester}${Names}${Roll};`,["Morning"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get All Students RO Evening
app.post('/api/ro/students2', function (req, res) {
    var Status = ""
    var Fee_Status = ""
    var Department = ""
    var Semester = ""
    var Names = ""
    var Roll = ""

    if(req.body.Names==="" && req.body.Roll===""){
        if(req.body.Status!=""){
            Status = ` and Status = '${req.body.Status}'`
        }
        if(req.body.Fee_Status!=""){
            Fee_Status = ` and Fee_Status = '${req.body.Fee_Status}'`
        }
        if(req.body.Department!=""){
            Department = ` and Department = '${req.body.Department}'`
        }
        if(req.body.Semester!=""){
            Semester = ` and Semester = '${req.body.Semester}'`
        }
    }
    if(req.body.Names!=""){
        Names = ` and Full_Name = '${req.body.Names}'`
    }
    if(req.body.Roll!=""){
        Roll = ` and Roll = '${req.body.Roll}'`
    }

    con.query(`SELECT * FROM students WHERE Shift = ?${Status}${Fee_Status}${Department}${Semester}${Names}${Roll};`,["Evening"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Get All Students AO Morning
app.post('/api/ao/students', function (req, res) {

    var Fee_Status = ""
    var Department = ""
    var Semester = ""
    var Names = ""
    var Roll = ""

    if(req.body.Names==="" && req.body.Roll===""){
        if(req.body.Fee_Status!=""){
            Fee_Status = ` and Fee_Status = '${req.body.Fee_Status}'`
        }
        if(req.body.Department!=""){
            Department = ` and Department = '${req.body.Department}'`
        }
        if(req.body.Semester!=""){
            Semester = ` and Semester = '${req.body.Semester}'`
        }
    }
    if(req.body.Names!=""){
        Names = ` and Full_Name = '${req.body.Names}'`
    }
    if(req.body.Roll!=""){
        Roll = ` and Roll = '${req.body.Roll}'`
    }

    con.query(`SELECT * FROM students WHERE Shift = ? and Degree_Status='Continue' and Status='Active'${Fee_Status}${Department}${Semester}${Names}${Roll}`,["Morning"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});

// Get All Students AO Evening
app.post('/api/ao/students2', function (req, res) {

    var Fee_Status = ""
    var Department = ""
    var Semester = ""
    var Names = ""
    var Roll = ""

    if(req.body.Names==="" && req.body.Roll===""){
        if(req.body.Fee_Status!=""){
            Fee_Status = ` and Fee_Status = '${req.body.Fee_Status}'`
        }
        if(req.body.Department!=""){
            Department = ` and Department = '${req.body.Department}'`
        }
        if(req.body.Semester!=""){
            Semester = ` and Semester = '${req.body.Semester}'`
        }
    }
    if(req.body.Names!=""){
        Names = ` and Full_Name = '${req.body.Names}'`
    }
    if(req.body.Roll!=""){
        Roll = ` and Roll = '${req.body.Roll}'`
    }

    con.query(`SELECT * FROM students WHERE Shift = ? and Degree_Status='Continue' and Status='Active'${Fee_Status}${Department}${Semester}${Names}${Roll}`,["Evening"], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


// Create AO Record
app.post('/api/ao/students/record', function (req, res) {


    const schema = Joi.object({
        Fall_Spring : Joi.string().required()
    });
    
    result = schema.validate(req.body);
    
    if (result.error){
        res.send(result.error.details[0].message)
    }
    else{
    con.query(`SELECT * FROM students WHERE Degree_Status='Continue' and Status='Active'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        
        var sql = "INSERT INTO fee_record (Roll, Full_Name, Father_Name, Department, Semester, Shift, Fee_Status, Phone, Original_id , Fall_Spring, Time) VALUES ?";
        var values = [
        ];

        results.map((student,index)=>{
            
            values.push(
                [student.Roll, student.Full_Name, student.Father_Name, student.Department, student.Semester,student.Shift,student.Fee_Status,student.Phone,student.id,req.body.Fall_Spring,new Date()]
            )
            
        }) 
        

        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            return res.send({ error: false,data: results, message: 'Record Created' });
        });

    });
}

});

// Get AO Fee Record
app.post('/api/ao/old/students/record', function (req, res) {

    con.query(`SELECT * FROM fee_record WHERE Fall_Spring=?`,[req.body.Fall_Spring], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'Record Created' });
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


//Get Students for Award List
app.post('/api/instructor/get/awardlist', function (req, res) {

    con.query(`SELECT * FROM students WHERE Courses LIKE '%${req.body.Course}%'`, function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false,data: results, message: 'SuccesFully Applied' });
    });
});


//Generate Award List
app.post('/api/instructor/awardlist', function (req, res) {

    if(req.body.Course_Code===""||req.body.Course_Title===""||req.body.Shift===""||req.body.Fall_Spring===""||req.body.Semester===""){
        return res.send({ message: 'Please Fill All Red Marked Fields'})
    }

    var sql = "INSERT INTO awardlist (Roll, Name, Mids, Sessional, Course_Title, Course_Code, Instructor, Department, Semester , Fall_Spring, Shift) VALUES ?";
    var values = [
    ];
    for (i=0;i<parseInt(req.body.len);i++){
            values.push(
                [req.body['Roll'+i], req.body['Name'+i], req.body['Mids'+i], req.body['Sessional'+i], req.body.Course_Title,req.body.Course_Code,req.body.Instructor,req.body.Department,req.body.Semester,req.body.Fall_Spring,req.body.Shift]
            )
    }

    con.query(sql, [values], function (err, result) {
        if (err) throw err;

        con.query(`INSERT INTO awardlist_unique (Course_Title, Course_Code, Instructor, Department, Semester , Fall_Spring, Shift) VALUES(?,?,?,?,?,?,?)`,[req.body.Course_Title,req.body.Course_Code,req.body.Instructor,req.body.Department,req.body.Semester,req.body.Fall_Spring,req.body.Shift], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false,data: results, message: 'Uploaded SuccesFully' });
        });

    });
});


//Generate Attendance
app.post('/api/instructor/attendance', function (req, res) {


    if(req.body.Course_Code===""||req.body.Course_Title===""||req.body.Shift===""||req.body.Semester===""||req.body.Fall_Spring===""){
        return res.send({ message: 'Please Fill All Red Marked Fields'})
    }

    var sql = "INSERT INTO attendance (Roll, Name, Attendance , Course_Title, Course_Code, Instructor, Department, Semester , Fall_Spring, Shift) VALUES ?";
    var values = [
    ];
    for (i=0;i<parseInt(req.body.len);i++){
            values.push(
                [req.body['Roll'+i], req.body['Name'+i], req.body['Attendance'+i],  req.body.Course_Title,req.body.Course_Code,req.body.Instructor,req.body.Department,req.body.Semester,req.body.Fall_Spring,req.body.Shift]
            )
    }

    con.query(sql, [values], function (err, result) {
        if (err) throw err;

        con.query(`INSERT INTO attendance_unique (Course_Title, Course_Code, Instructor, Department, Semester , Fall_Spring, Shift) VALUES(?,?,?,?,?,?,?)`,[req.body.Course_Title,req.body.Course_Code,req.body.Instructor,req.body.Department,req.body.Semester,req.body.Fall_Spring,req.body.Shift], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false,data: results, message: 'Uploaded SuccesFully' });
        });

    });
});


// Unique Results from Awardlist SSIO
app.post('/api/ssio/awardlists', function (req, res) {

    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
        }
            
            con.query('SELECT * FROM awardlist_unique WHERE Fall_Spring = ?;',[Fall_Spring], function (error, results, fields) {
                if (error) {
                    console.log(error)
                };
                return res.send({ error: false, data: results, message: 'Complete Data.' });
            });
        });
});


// Unique Results from Attendance SSIO
app.post('/api/ssio/attendance', function (req, res) {

    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
        }
        
        con.query('SELECT * FROM attendance_unique WHERE Fall_Spring = ?;',[Fall_Spring], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false, data: results, message: 'Complete Data.' });
        });
    });
});


// Unique Results from Awardlist HOD
app.post('/api/hod/awardlists', function (req, res) {

    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
        }
        
        con.query('SELECT * FROM awardlist_unique WHERE Fall_Spring = ? and Department = ?;',[Fall_Spring,req.body.Department], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false, data: results, message: 'Complete Data.' });
        });
    });
});

// Unique Results from Attendance HOD
app.post('/api/hod/attendance', function (req, res) {

    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
        }
        
        con.query('SELECT * FROM attendance_unique WHERE Fall_Spring = ? and Department = ?;',[Fall_Spring,req.body.Department], function (error, results, fields) {
            if (error) {
                console.log(error)
            };
            return res.send({ error: false, data: results, message: 'Complete Data.' });
        });
    });
});


//Delete Attendance
app.delete('/api/ssio/attendance/:id', function (req, res) {

    con.query('SELECT * FROM attendance_unique WHERE id = ?;',[req.params.id], function (error, resultsss, fields) {
        if (error) {
            console.log(error)
        };

        con.query("DELETE FROM attendance_unique WHERE id = ?", [req.params.id], function (error, resultss, fields) {
            if (error) {
                console.log(error)
            };

            con.query("DELETE FROM attendance WHERE Department=? and Semester=? and Instructor = ? and Course_Code = ? and Shift = ? and Fall_Spring=?", [resultsss[0].Department,resultsss[0].Semester,resultsss[0].Instructor,resultsss[0].Course_Code,resultsss[0].Shift,resultsss[0].Fall_Spring], function (error, results, fields) {
                if (error) {
                    console.log(error)
                };
                return res.send({ error: false,data: results, message: 'SuccesFully Deleted' });
            });
        });

    });
});


//Delete Awardlist
app.delete('/api/ssio/awardlist/:id', function (req, res) {
    con.query('SELECT * FROM awardlist_unique WHERE id = ?;',[req.params.id], function (error, resultsss, fields) {
        if (error) {
            console.log(error)
        };

        con.query("DELETE FROM awardlist_unique WHERE id = ?", [req.params.id], function (error, resultss, fields) {
            if (error) {
                console.log(error)
            };

            con.query("DELETE FROM awardlist WHERE Department=? and Semester=? and Instructor = ? and Course_Code = ? and Shift = ? and Fall_Spring=?", [resultsss[0].Department,resultsss[0].Semester,resultsss[0].Instructor,resultsss[0].Course_Code,resultsss[0].Shift,resultsss[0].Fall_Spring], function (error, results, fields) {
                if (error) {
                    console.log(error)
                };
                return res.send({ error: false,data: results, message: 'SuccesFully Deleted' });
            });
        });

    });
});


// Get All AttendanceLists Session Wise
app.post('/api/ssio/attendancedetails', function (req, res) {

    con.query('SELECT * FROM attendance WHERE Fall_Spring = ? and Semester = ? and Department = ? and Course_Code = ? and Shift = ?;',[req.body.Fall_Spring,req.body.Semester,req.body.Department,req.body.Course_Code,req.body.Shift], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// Get All Awardlists Session Wise
app.post('/api/ssio/details', function (req, res) {
    con.query('SELECT * FROM awardlist WHERE Fall_Spring = ? and Semester = ? and Department = ? and Course_Code = ? and Shift = ? and Instructor=?;',[req.body.Fall_Spring,req.body.Semester,req.body.Department,req.body.Course_Code,req.body.Shift,req.body.Instructor], function (error, results, fields) {
        if (error) {
            console.log(error)
        };
        return res.send({ error: false, data: results, message: 'Complete Data.' });
    });
});

// DateSheet Generate Morning
app.post('/api/hod/generatedatesheet', function (req, res) {

    if(req.body.Course_Title===""||req.body.Course_Code===""||req.body.Instructor_Department===""||req.body.Instructor===""||req.body.Semester===""||req.body.Time_Slot===""||req.body.Fall_Spring===""){
        return res.send({ message: 'All Fields Required'})
    }

    con.query("INSERT INTO datesheet(Course_Title,Course_Code,Instructor,Instructor_Department,Semester,Department,Shift,Time_Slot,Fall_Spring) value(?,?,?,?,?,?,?,?,?) " ,[req.body.Course_Title,req.body.Course_Code,req.body.Instructor,req.body.Instructor_Department,req.body.Semester,req.body.Department,"Morning",req.body.Time_Slot,req.body.Fall_Spring], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Datesheet Generated Successfully' });
    });
});


// Get DateSheet Morning
app.post('/api/hod/datesheet', function (req, res) {


    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
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

    if(req.body.Course_Title===""||req.body.Course_Code===""||req.body.Instructor_Department===""||req.body.Instructor===""||req.body.Semester===""||req.body.Time_Slot===""||req.body.Fall_Spring===""){
        return res.send({ message: 'All Fields Required'})
    }

    con.query("INSERT INTO datesheet(Course_Title,Course_Code,Instructor,Instructor_Department,Semester,Department,Shift,Time_Slot,Fall_Spring) value(?,?,?,?,?,?,?,?,?) " ,[req.body.Course_Title,req.body.Course_Code,req.body.Instructor,req.body.Instructor_Department,req.body.Semester,req.body.Department,"Evening",req.body.Time_Slot,req.body.Fall_Spring], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Datesheet Generated Successfully' });
    });
});


// Get DateSheet Evening
app.post('/api/hod/datesheet2', function (req, res) {
    con.query('SELECT * FROM fall_spring', function (error, resultss, fields) {
        if (error) {
            console.log(error)
        };
        if(req.body.Fall_Spring){
            Fall_Spring = req.body.Fall_Spring
        }
        else{
            Fall_Spring = resultss[0].Fall_Spring
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