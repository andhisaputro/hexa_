const { check , validationResult } = require('express-validator');
var User = require('../models/db/User')
var Program = require('../models/db/Program')
var Subject = require('../models/db/Subject')
var Class = require('../models/db/Class')

var jwt = require('jsonwebtoken'); 
 
module.exports = ({server , app}) => {

    server.post('/api/login',[
        check('email','Format email salah').isEmail(),
        check('password','Password minimal 8 karakter').isLength({ min: 3 })
    ],function(req, res){
 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({
              meta : { code : 400 , message : "Error Validation" },
              data : null ,
              error : errors.array() });
        }
 
        User.findOne({"email" : req.body.email }, function(err, result) {
            if (err) throw err;
            if (result && jwt.verify(result.password, '5e595f71a27fc826b942df8a') == req.body.password) { 
                var token = jwt.sign({data : result}, '5e595f71a27fc826b942df8a');
                const userData = {
                    "name" : result.name,
                    "email" : result.email,
                    "token" : token
                }

                res.status(200).json({
                    meta : { code : 200 , message : "Login berhasil" },
                    data : result  ,
                    error : null
                })
            }else{
                res.status(400).json({
                    meta : { code : 400 , message : "Login gagal, silakan periksa kembali email dan password anda" },
                    data : null ,
                    error : null
                })
            } 
        })
    });

    server.post('/api/register',[
        check('email','Format email salah').isEmail(),
        check('password','Password minimal 8 karakter').isLength({ min: 4 }),
        check('first_name').isLength({ min: 1 }),
        check('last_name').isLength({ min: 1 })
    ],function(req, res){
 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({
              meta : { code : 400 , message : "Error Validation" },
              data : null ,
              error : errors.array() });
        }
        
        const model = new User({
            name : req.body.first_name+' '+req.body.first_name,
            email : req.body.email,
            level : req.body.level,
            password : jwt.sign(req.body.password, '5e595f71a27fc826b942df8a')
        })

        model.save()
        .then(()=>{
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : null ,
                error : null
            });
        }).catch((err)=>{
            res.status(400).json({
                meta : { code : 200 , message : "Success" },
                data : null ,
                error : null
            });
        })
          
    });

    server.post('/api/program/add',[
        check('name','Nama harus di isi').isLength({ min: 1 }),
        check('subject_id','Mata pelajaran haru si isi setidaknya 1 data').isLength({ min: 1 })
    ],function(req, res){
 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({
              meta : { code : 400 , message : "Error Validation" },
              data : null ,
              error : errors.array()
            });
        }
        
        const model = new Program(
            {
                "name" : req.body.name,
                "subject_id" : JSON.parse(req.body.subject_id)
            }
        )

        model.save()
        .then(()=>{
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : null ,
                error : null
            });
        }).catch((err)=>{
            res.status(200).json(err)
        })
    });

    server.get('/api/program/list',[
        // check('name','Nama harus di isi').isLength({ min: 1 })
    ],function(req, res){
        Program.find({}, function(err,data){ 
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : data,
                error : null
            });
        })
    });
    
    server.get('/api/subject/list',[
        // check('name','Nama harus di isi').isLength({ min: 1 })
    ],function(req, res){

        Subject.find({}, function(err,data){
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : data,
                error : null
            });
        })
    });


    server.post('/api/subject/add',[
        check('name','Nama harus di isi').isLength({ min: 1 }),
        check('credit','Jumlah SKS dalam satu semester harus di isi').isLength({ min: 1 })
    ],function(req, res){
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({
              meta : { code : 400 , message : "Error Validation" },
              data : null ,
              error : errors.array()
            });
        }
        
        const model = new Subject(
            {
                "name" : req.body.name,
                "credit" : req.body.credit
            }
        )

        model.save()
        .then(()=>{
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : null ,
                error : null
            });
        }).catch((err)=>{
            res.status(200).json(err)
        })
    }); 

    
    server.get('/api/class/list',[
        // check('name','Nama harus di isi').isLength({ min: 1 })
    ],function(req, res){

        Class.find({}, function(err,data){
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : data,
                error : null
            });
        })
    });

    server.get('/api/count_dashboard',[
        // check('name','Nama harus di isi').isLength({ min: 1 })
    ],async function(req, res){ 
        const data = [];
        data['Subject'] = await Subject.find()
        data['Program'] = await Program.find()
        data['Class'] = await Class.find()

        res.status(200).json({
            meta : { code : 200 , message : "Success" },
            data : {
                "Subject" : await Subject.countDocuments(),
                "Program" : await Program.countDocuments(),
                "Class" : await Class.countDocuments()
             } ,
            error : null
        });

    });

    server.post('/api/class/add',[
        check('name','Nama harus di isi').isLength({ min: 1 }),
    ],function(req, res){
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({
              meta : { code : 400 , message : "Error Validation" },
              data : null ,
              error : errors.array()
            });
        }
        
        const model = new Class(
            {
                "name" : req.body.name
            }
        )

        model.save()
        .then(()=>{
            res.status(200).json({
                meta : { code : 200 , message : "Success" },
                data : null ,
                error : null
            });
        }).catch((err)=>{
            res.status(200).json(err)
        })
    }); 
}