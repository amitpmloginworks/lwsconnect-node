const fs = require('fs');
var encrydecry = require('../middleware/common-fun');  
const nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var localStorage = require('localStorage')

const uniqueRandom = require('unique-random');
const randunique = uniqueRandom(10000000000, 99999999999);

module.exports = { 

      
    getloginwp:(req, res) => {
      console.log("login api ..."); 
         let emailid = req.body.emailid;  
         let password = req.body.password;         
         var encrytpass = encrydecry.sha1algo(req.body.password);   
         //console.log("encrytpass==",encrytpass)     
         let usernameQuery = "SELECT * FROM `wp_users` WHERE user_email = '" + emailid + "' and user_pass= '" + encrytpass + "' and ID !='1'";    
         console.log("usernameQuery ==", usernameQuery)       
         db.query(usernameQuery, (err, result) => { 
             //console.log("statusCode==",res.statusCode)        
             if (err) {
                // return res.status(500).send(err); 
                return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });
             }
             if (result.length > 0) {  
                // console.log("result==",result)   
                 return res.status(200).json({ status :200, getdata:result , wpstatus:1  });   
                 //res.render('add-player.ejs', { message, title: "Welcome to Socka | Add a new player" }); 
             } 
             else {  
                return res.status(200).json({  message: 'Invalid email and passord', status :200, wpstatus:0  }); 
         }
         });
     },

     getresetwp:(req, res) => {

      let emailid = req.body.emailid;  
      let password=encrydecry.wprandomtxt(9);
      var encrytpass = encrydecry.sha1algo(password); 

     //  https://myaccount.google.com/lesssecureapps?pli=1   // enable smtp
    // https://accounts.google.com/b/0/DisplayUnlockCaptcha  // enable smtp

      let usernameQuery1 = "SELECT * FROM `wp_users` WHERE user_email = '" + emailid + "'";  
      console.log("1=",usernameQuery1)       
      db.query(usernameQuery1, (err, result) => {       
          if (err) {
             return res.status(500).json({ message: 'errr5', status :500, msg:err });
          }
          if (result.length > 0) {   
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { 
              user: 'nishant.loginworks@gmail.com',  
              pass: 'ngarg2801$'
             }
      });       
      let usernameQuery2 = "update `wp_users` set user_pass='"+encrytpass+"' WHERE user_email = '" + emailid + "'";  
      console.log("2=",usernameQuery2)         
      db.query(usernameQuery2, (err2, result2) => {     }); 

      content_body = '<div style="z-index: 0;padding: 10px;"> <div> <div style="padding:8px"></div> </div><div> <div dir="ltr" style="background-color:#f7f7f7;margin:0;padding:70px 0 70px 0;width:100%;"> <table border="0" cellpadding="0" cellspacing="0" width="100%" style="height:100%;"><tbody><tr><td align="center" valign="top"> <div> </div> <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff;border:1px solid #dedede;"><tbody><tr><td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#3c3c3c;color:#ffffff;border-bottom:0;font-weight:bold;line-height:100%;vertical-align:middle;font-family:Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;"><tbody><tr><td style="padding:36px 48px;"> <h1 style="color:#ffffff;font-family:Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;font-size:30px;font-weight:300;line-height:150%;margin:0;text-align:left;">Welcome to Loginworks Power BI Portal</h1> </td> </tr></tbody></table></td> </tr><tr><td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="600"><tbody><tr><td valign="top" style="background-color:#ffffff;"> <table border="0" cellpadding="20" cellspacing="0" width="100%"><tbody><tr><td valign="top" style="padding:48px 48px 0;"> <div style="color:#636363;font-family:Helvetica Neue, Helvetica, Roboto, Arial, sans-serif;font-size:14px;line-height:150%;text-align:left;"> <p style="margin:0 0 16px;">Hi '+result[0].user_login+',</p> <p style="margin:0 0 16px;">Thanks for creating an account on Loginworks Power BI Portal. Your username is <strong>'+result[0].user_login+'</strong>. You can access your account area to view orders, and more at: <a href="https://loginworks.net/portal/my-account/" style="color:#3c3c3c;font-weight:normal;text-decoration:underline;" rel="nofollow">https://loginworks.net/portal/my-account/</a></p> <p style="margin:0 0 16px;">Your email id is : <strong>' + emailid +'</strong></p> <p style="margin:0 0 16px;">Your password has been automatically generated: <strong>'+password+'</strong></p> <p style="margin:0 0 16px;">We look forward to seeing you soon.</p> </div> </td> </tr></tbody></table></td> </tr></tbody></table></td> </tr><tr><td align="center" valign="top"> <table border="0" cellpadding="10" cellspacing="0" width="600"><tbody><tr><td valign="top" style="padding:0;"> <table border="0" cellpadding="10" cellspacing="0" width="100%"><tbody><tr><td colspan="2" valign="middle" style="padding:0 48px 48px 48px;border:0;color:#8a8a8a;font-family:Arial;font-size:12px;line-height:125%;text-align:center;"> <p>Loginworks Power BI Portal<br>Powered by <a href="https://www.loginworks.com/lp/power-bi-consulting-services.php" style="color:#3c3c3c;font-weight:normal;text-decoration:underline;" rel="nofollow">Loginworks Power BI Portal</a></p> </td> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table></td> </tr></tbody></table></div> </div></div>';  

      var mailOptions = {
          from: 'support@loginworks.com', 
          to: result[0].user_email, 
          subject: 'Reset Password',
          text: 'Loginworks Power BI Portal',
          html: content_body
        }; 
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log("mail error ==",error); 
          } else { 
            return res.status(200).json({ status :200, message:'Mail Sent Successfully',wpstatus:1  }); 
          }
        });    
          } 
          else {    
             return res.status(200).json({  message: 'Invalid email', status :200,wpstatus:0  }); 
      }
      });
    },



    upprofilewp:(req, res) => {    

      let userid = req.body.userid;
      let billingAdd = req.body.billAdd;
      let billingCountry = req.body.billCountry;
      let billingState = req.body.billState;
      let billingPin = req.body.billPin;  
      let billingPhone = req.body.billingPhone; 
  
      let usernameQuery = "SELECT * FROM `wp_users` WHERE ID = '" + userid + "'";          
      db.query(usernameQuery, (err, result) => {       
          if (err) {
             return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });
          }
          if (result.length > 0) {

            let Qry1 = "UPDATE `wp_usermeta` SET meta_value='"+billingPhone+"'  WHERE user_id = '" + userid + "' and meta_key='billing_phone'";         
            db.query(Qry1, () => {      });

          let Qry2 = "SELECT * from `wp_usermeta` where meta_key='billing_address_1' and user_id = '" + userid + "'"; 
             db.query(Qry2, (err2, result2) => {  
              if (result2.length > 0) {
                let Qry3 = "UPDATE `wp_usermeta` SET meta_value='"+billingAdd+"'  WHERE user_id = '" + userid + "' and meta_key='billing_address_1'";         
                db.query(Qry3, () => {   });
              }
              else {
                let Qry4 = "INSERT INTO `wp_usermeta` SET meta_value='"+billingAdd+"', user_id = '" + userid + "', meta_key='billing_address_1'";         
                db.query(Qry4, () => {   });
              }
            });

 
            let Qry5 = "SELECT * from `wp_usermeta` where meta_key='billing_country' and user_id = '" + userid + "'";         
            db.query(Qry5, (err5, result5) => {  
              if (result5.length > 0) {
                let Qry6 = "UPDATE `wp_usermeta` SET meta_value='"+billingCountry+"'  WHERE user_id = '" + userid + "' and meta_key='billing_country'";         
                db.query(Qry6, () => {   });
              }
              else {
                let Qry7 = "INSERT INTO `wp_usermeta` SET meta_value='"+billingCountry+"', user_id = '" + userid + "', meta_key='billing_country'";         
                db.query(Qry7, () => {   });
              }
            });


            let Qry8 = "SELECT  * from `wp_usermeta` where meta_key='billing_state' and user_id = '" + userid + "'";         
            db.query(Qry8, (err8, result8) => {  
              if (result8.length > 0) {
                let Qry9 = "UPDATE `wp_usermeta` SET meta_value='"+billingState+"'  WHERE user_id = '" + userid + "' and meta_key='billing_state'";         
                db.query(Qry9, () => {   });
              }
              else {
                let Qry10 = "INSERT INTO `wp_usermeta` SET meta_value='"+billingState+"', user_id = '" + userid + "', meta_key='billing_state'";         
                db.query(Qry10, () => {   });
              }
            });


            let Qry11 = "SELECT * from `wp_usermeta` where meta_key='billing_postcode' and user_id = '" + userid + "'";         
            db.query(Qry11, (err11, result11) => {   
              if (result11.length > 0) {
                let Qry12 = "UPDATE `wp_usermeta` SET meta_value='"+billingPin+"'  WHERE user_id = '" + userid + "' and meta_key='billing_postcode'";         
                db.query(Qry12, () => {   });
              }
              else {    
                let Qry13 = "INSERT INTO `wp_usermeta` SET meta_value='"+billingPin+"', user_id = '" + userid + "', meta_key='billing_postcode'";         
                db.query(Qry13, () => {   });
              }
            });
            return res.status(200).json({ status :200, message:"Profile updated successfully." , wpstatus:1  });   
          } 
          else {  
             return res.status(200).json({  message: 'you are not authorized to use', status :200, wpstatus:0  }); 
      }  
      });
  },


  getprofilewp:(req, res) => {      

    let userid = req.body.userid;  

    let usernameQuery = "SELECT * FROM `wp_users` WHERE ID = '" + userid + "'";          
    db.query(usernameQuery, (err, result) => {       
        if (err) {  return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });   }
        if (result.length > 0) {
          let Qry1 = "SELECT * FROM `wp_usermeta` WHERE user_id = '" + userid + "'";         
          db.query(Qry1, (err1, result1) => {   
            if (err1) {  return res.status(500).json({ message: 'errr5', status :500, msg:err1, wpstatus:-1  });   }
            if (result1.length > 0) {
              console.log("result1==",result1); 
              return res.status(200).json({ status :200, message:"Profile updated successfully." , wpstatus:1, getdata:result1  }); 
           }
          }); 
        } 
        else {  
           return res.status(200).json({  message: 'you are not authorized to use', status :200, wpstatus:0  }); 
    }  
    });
},

upprofileimgwp:(req, res) => {      
  let userid = req.body.userid;  
  let profileimg ="";
  let usernameQuery = "SELECT * FROM `wp_users` WHERE ID = '" + userid + "'";          
  db.query(usernameQuery, (err, result) => {       
      if (err) {  return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });   }
      if (result.length > 0) {
  let uploadedFile = req.files.file;
  let fileName = uploadedFile.name;   
  let fileExtension = uploadedFile.mimetype.split('/')[1]; 
  console.log("fileExtension==",fileExtension) 
  uploadedFile.mv(`public/assets/img/${fileName}`, (err ) => {    
    if (err) {  return res.status(500).json({ message: 'errr5',status :500,msg:err,wpstatus:0 });  }
        let Qry11 = "SELECT * from `wp_usermeta` where meta_key='_attachments' and user_id = '" + userid + "'";         
        db.query(Qry11, (err11, result11) => {   
          if (result11.length > 0) {
            let Qry12 = "UPDATE `wp_usermeta` SET meta_value='"+profileimg+"'  WHERE user_id = '" + userid + "' and meta_key='_attachments'";         
            db.query(Qry12, () => {   });
          }
          else {    
            let Qry13 = "INSERT INTO `wp_usermeta` SET meta_value='"+profileimg+"', user_id = '" + userid + "', meta_key='_attachments'";         
            db.query(Qry13, () => {   });
          }
        });
      return res.status(200).json({status :200,message:"Profile updated successfully.",wpstatus:1,getdata:result1}); 
    }); 
  }
      else {  
         return res.status(200).json({  message: 'you are not authorized to use', status :200, wpstatus:0  }); 
  }  
  });
},
  
  
testapp:(req, res) =>   {
  let agent_array =[]; 
  let metaarrval ;
  let Querycat = "SELECT * FROM `wp_termmeta` where term_id='29'"; 
    console.log("Querycat==",Querycat)  
    db.query(Querycat, (err1, result1) => {        
        if (err1) {
           return res.status(500).json({ message: 'errr2', status :500, msg:err1,wpstatus:0 });
        } 
        if (result1.length > 0) {
           
          var metaarr = result1[0].meta_value; 
          console.log("result1[0].meta_value==",result1[0].meta_value)    
          var metasplit = metaarr.split("\";");   
          let metalen = metasplit.length-1; 

          let metasplit0 = metasplit[0].split('\:"'); 
          agent_array.push(metasplit0[1]);
          metaarrval=metasplit0[1];  
          console.log("metaarrval==",metaarrval)  

          // for(let i=0;i<metalen.length;i++){    
          //     let metasplit0 = metasplit[i].split('\:"'); 
          //     agent_array.push(metasplit0[1]);
          //     metaarrval=metasplit0[1];
          //     console.log("metaarrval==",metaarrval)   
          // }
        } 
        else {  }
    });

  // var encrytpass = encrydecry.sha1algo(req.body.password); 
  // console.log("encrytpass==",encrytpass);

  // var encrytpass11 = encrydecry.hashpassalgo(req.body.password); 
  // console.log("encrytpass11==",encrytpass11);

  // return res.json({    message:'Successfully'     });

var now = new Date();
var date1 = dateFormat(now, "dddd, d mmm yyyy, H:MM");  
return res.json({    message: date1     }); 

// Basic usage

// Last updated: Friday, 7 Dec 2018, 12:38

/*
var date1 = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

// Saturday, June 9th, 2007, 5:46:21 PM
console.log("date1==",date1)
// You can use one of several named masks     
var date2 =  dateFormat(now, "isoDateTime");
console.log("date2==",date2)
// 2007-06-09T17:46:21
// ...Or add your own
dateFormat.masks.hammerTime = 'HH:MM! "Can\'t touch this!"';
var date3 = dateFormat(now, "hammerTime");
console.log("date3==",date3)
// 17:46! Can't touch this!
// You can also provide the date as a string
var date4 =  dateFormat("Jun 9 2007", "fullDate");
console.log("date4==",date4)  
// Saturday, June 9, 2007
var date5 = dateFormat(now, 'HH:MM');
console.log("date5==",date5)  
var date6 =  dateFormat("2019-02-25 15:29:25", "fullDate");  
console.log("date6==",date6)  

var date7 = dateFormat(now, "yyyy-mm-dd HH:MM:ss"); 
// 2019-03-05 13:20:44
console.log("date7==",date7)

var date8 = dateFormat(now, "h:MM tt");
// Saturday, June 9th, 2007, 5:46:21 PM
console.log("date8==",date8)
*/

/*
let final_array = new Array();
let agent_array = new Array();
let usernameQuery = " SELECT * FROM `wp_termmeta` where term_id='28'"; 
db.query(usernameQuery, (err1, result1) => {        
    if (err1) {
       return res.status(500).json({ message: 'errr5', status :500, msg:err1,wpstatus:0 });
    }
    if (result1.length > 0) { 
      var metaarr = result1[0].meta_value; 
      var metasplit = metaarr.split("\";");   
      final_array=result1;
      let metalen = metasplit.length-1;
      for(let i=0;i<metalen;i++){   
          let metasplit0 = metasplit[i].split('\:"'); 
          agent_array.push(metasplit0[1]);
      }
    return res.status(200).json({ message:'Successfully',agent_arr: result1[0].meta_value,agent_array:agent_array  }); 
    } 
    else { 
        return res.status(200).json({  message: 'No record found', status :200,wpstatus:1  }); 
}
});
*/

},




};
