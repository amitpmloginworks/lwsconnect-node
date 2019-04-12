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


paymentwp:(req, res) => {  

  let userid = req.body.userid;  
  let OrderItem = req.body.OrderItem; //  'Per Hour'  , '10 Hours Bucket' , '50 Hours Bucket'
  let BalHours=req.body.BalHours;     //  '1' , '10' , '50' 
  let TotalHours=req.body.TotalHours;
  let OrderAmt=req.body.OrderAmt;    
  let PaypalTxnID=req.body.PaypalTxnID;
  let PaidDate1=req.body.PaidDate;    

  var now = new Date();
  var timestamp=now.getTime();
  var datecurrent = dateFormat(now, "yyyy-mm-dd HH:MM:ss"); 
  var PaidDate = dateFormat(PaidDate1, "yyyy-mm-dd HH:MM:ss"); 
  let posttitle=" Order &ndash; "+dateFormat(now, "mmmm dd, yyyy")+" @ "+dateFormat(now, "h:MM tt");
  let PostName="order-"+dateFormat(now, "mmm")+"-"+dateFormat(now, "dd")+"-"+dateFormat(now, "yyyy")+"-"+dateFormat(now, "hMM-tt"); 
 
  var strIP = localStorage.getItem('ipInfo');   
  var strIPClient = JSON.parse(strIP).clientIp; 

  let WpPostID="";
 
  let SetIDVal=0;
  console.log("login api ...");   
     let usernameQuery = "SELECT * FROM `wp_users` WHERE ID = '" + userid + "'";         
     db.query(usernameQuery, (err, result) => {      
         if (err) {  return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });  }
         if (result.length > 0) { 
          let Query1 = "INSERT INTO `wp_posts` (`post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`,`post_status`, `comment_status`, `ping_status`,`post_password`, `post_name`, `to_ping`,`pinged`, `post_modified`, `post_modified_gmt`,`post_content_filtered`, `post_parent`, `guid`,`menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES('1','" + datecurrent + "','" + datecurrent + "','','" + posttitle + "','','wc-processing','open','closed','','" + posttitle + "','"+PostName+"','','" + datecurrent + "','" + datecurrent + "','','0','','0','shop_order','','1' )";        
          db.query(Query1, (err1, result1) => {      
              if (err1)  {  return res.status(500).json({ message: 'errr5', status :500, msg:err1, wpstatus:-1  });  }
              WpPostID=result1.insertId;

              let Query2 ="UPDATE wp_posts SET `guid`='https://loginworks.net/portal/?post_type=shop_order&#038;p="+WpPostID+"' where ID='"+WpPostID+"'";
              db.query(Query2, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  }); 

              let Query3 ="INSERT INTO `wp_comments` SET `comment_post_ID`='"+WpPostID+"',comment_author='WooCommerce',comment_author_email='woocommerce@loginworks.net',comment_author_url='',comment_author_IP='',comment_date='"+datecurrent+"',comment_date_gmt='"+datecurrent+"',comment_content='Payment to be made upon delivery. Order status changed from Pending payment to Processing.',comment_karma='0',comment_approved='1',comment_agent='WooCommerce',comment_type='order_note',comment_parent='0',user_id='0'";
              db.query(Query3, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal1=",SetIDVal);  }); 
              let Query4 ="INSERT INTO `wp_woocommerce_order_items` SET `order_id`='"+WpPostID+"',order_item_name='"+OrderItem+"',order_item_type='line_item'";
              db.query(Query4, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal2=",SetIDVal);  });   

              let Query5 ="UPDATE `wp_transaction` SET `order_item_name`='"+OrderItem+"',balance_hours=balance_hours+'"+BalHours+"',total_hours=total_hours+'"+TotalHours+"' where user_id='"+userid+"'";
              db.query(Query5, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal3=",SetIDVal);  });     
  
              let Query6 ="UPDATE `wp_hours` SET `order_item_name`='"+OrderItem+"',`balance_hours`=balance_hours+'"+BalHours+"',`total_hours`=total_hours+'"+TotalHours+"' where `user_id`='"+userid+"'";   
              db.query(Query6, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal4=",SetIDVal);  });    

             let invoiceSet ='a:18:{s:24:"display_shipping_address";s:0:"";s:13:"display_email";s:1:"1";s:13:"display_phone";s:1:"1";s:12:"display_date";s:12:"invoice_date";s:14:"display_number";s:14:"invoice_number";s:19:"attach_to_email_ids";a:8:{s:9:"new_order";s:1:"1";s:15:"cancelled_order";s:0:"";s:12:"failed_order";s:0:"";s:22:"customer_on_hold_order";s:0:"";s:25:"customer_processing_order";s:0:"";s:24:"customer_completed_order";s:1:"1";s:23:"customer_refunded_order";s:1:"1";s:16:"customer_invoice";s:1:"1";}s:7:"enabled";s:1:"1";s:13:"number_format";a:3:{s:6:"prefix";s:29:"[invoice_year][invoice_month]";s:6:"suffix";s:0:"";s:7:"padding";s:1:"5";}s:18:"my_account_buttons";s:9:"available";s:10:"paper_size";s:2:"a4";s:15:"font_subsetting";b:0;s:11:"header_logo";s:3:"561";s:9:"shop_name";a:1:{s:7:"default";s:25:"Loginworks Softwares Inc.";}s:12:"shop_address";a:1:{s:7:"default";s:63:"4870 Sadler Road, Suit 300 Office 319, Glen Allen, VA, US-23060";}s:6:"footer";a:1:{s:7:"default";s:0:"";}s:7:"extra_1";a:1:{s:7:"default";s:0:"";}s:7:"extra_2";a:1:{s:7:"default";s:0:"";}s:7:"extra_3";a:1:{s:7:"default";s:0:"";}}'

			 
  let query7 ="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_key',meta_value=''";
  db.query(query7, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query8="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_customer_user',meta_value='"+userid+"'";
  db.query(query8, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query9="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_payment_method',meta_value='online'";
  db.query(query9, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query10="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_payment_method_title',meta_value='Paypal'";
  db.query(query10, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query11="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_transaction_id',meta_value='"+PaypalTxnID+"'";
  db.query(query11, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query12="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_customer_ip_address',meta_value='"+strIPClient+"'";
  db.query(query12, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query13="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_customer_user_agent',meta_value=''";
  db.query(query13, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query14="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_created_via',meta_value='checkout'";
  db.query(query14, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query15="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_date_completed',meta_value='"+datecurrent+"'";
  db.query(query15, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query16="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_completed_date',meta_value='"+datecurrent+"'";
  db.query(query16, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query17="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_date_paid',meta_value='"+PaidDate+"'";
  db.query(query17, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query18="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_paid_date',meta_value='"+PaidDate+"'";
  db.query(query18, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query19="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_cart_hash',meta_value=''";
  db.query(query19, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query20="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_first_name',meta_value=''";
  db.query(query20, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query21="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_last_name',meta_value=''";
  db.query(query21, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query22="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_company',meta_value=''";
  db.query(query22, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query23="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_address_1',meta_value=''";
  db.query(query23, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query24="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_address_2',meta_value=''";
  db.query(query24, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query25="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_city',meta_value=''";
  db.query(query25, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query26="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_state',meta_value=''";
  db.query(query26, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query27="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_postcode',meta_value=''";
  db.query(query27, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query28="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_country',meta_value=''";
  db.query(query28, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query29="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_email',meta_value=''";
  db.query(query29, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query30="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_phone',meta_value=''";
  db.query(query30, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query31="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_first_name',meta_value=''";
  db.query(query31, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query32="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_last_name',meta_value=''";
  db.query(query32, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query33="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_company',meta_value=''";
  db.query(query33, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query34="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_address_1',meta_value=''";
  db.query(query34, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query35="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_address_2',meta_value=''";
  db.query(query35, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query36="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_city',meta_value=''";
  db.query(query36, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query37="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_state',meta_value=''";
  db.query(query37, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query38="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_postcode',meta_value=''";
  db.query(query38, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query39="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_country',meta_value=''";
  db.query(query39, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query40="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_currency',meta_value='USD'";
  db.query(query40, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query41="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_cart_discount',meta_value='0'";
  db.query(query41, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query42="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_cart_discount_tax',meta_value='0'";
  db.query(query42, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query43="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_shipping',meta_value='0.00'";
  db.query(query43, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query44="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_shipping_tax',meta_value='0'";
  db.query(query44, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query45="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_tax',meta_value='0'";
  db.query(query45, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query46="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_total',meta_value='"+OrderAmt+"'";
  db.query(query46, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query47="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_version',meta_value='3.5.3'";
  db.query(query47, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query48="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_prices_include_tax',meta_value='no'";
  db.query(query48, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query49="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_billing_address_index',meta_value=''";
  db.query(query49, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query50="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_shipping_address_index',meta_value=''";
  db.query(query50, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query51="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_download_permissions_granted',meta_value='yes'";
  db.query(query51, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });  
  let query52="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_recorded_sales',meta_value='yes'";
  db.query(query52, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query53="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_recorded_coupon_usage_counts',meta_value='yes'";
  db.query(query53, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query54="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_order_stock_reduced',meta_value='yes'";
  db.query(query54, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query55="INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_wcpdf_invoice_settings',meta_value='"+invoiceSet+"'";
  db.query(query55, (errr,results) => { if(errr){ }  SetIDVal=SetIDVal+1;  console.log("SetIDVal=",SetIDVal);  });   
  let query56=" INSERT INTO `wp_postmeta` SET `post_id`='"+WpPostID+"',meta_key='_wcpdf_invoice_date',meta_value='"+timestamp+"'";
  db.query(query56, (errr,results) => { if(errr){ }  
  SetIDVal=SetIDVal+1;  
  console.log("SetIDVal=",SetIDVal);  
	return res.status(200).json({ status :200, message:"Payment received successfully." , wpstatus:1  });
  });  		 
console.log("SetIDVal==",SetIDVal); 
if(SetIDVal == 55){  
	return res.status(200).json({ status :200, message:"Payment received successfully." , wpstatus:1  });  
}
              

            });  
              
         } 
         else {  return res.status(200).json({  message: 'you are not authorized to use', status :200, wpstatus:0  }); }
     });
 },


  BuyAdditionalwp:(req, res) => {      
  let userid = req.body.userid;  
  var final_array= new Array();
  let CurrentHour="";
  let usernameQuery = "SELECT * FROM `wp_users` WHERE ID = '" + userid + "'";          
  db.query(usernameQuery, (err, result) => {       
      if (err) {  return res.status(500).json({ message: 'errr5', status :500, msg:err, wpstatus:-1  });   }
      if (result.length > 0) { 
    if (err) {  return res.status(500).json({ message: 'errr5',status :500,msg:err,wpstatus:0 });  }
        let Qry11 = " SELECT * FROM `wp_postmeta` a join `wp_hours` b on b.user_id=a.meta_value WHERE meta_key='_customer_user' and meta_value='"+userid+"' order by meta_id DESC LIMIT 1";         
        db.query(Qry11, (err11, result11) => {   
          if (result11.length > 0) {

            CurrentHour=result11[0].order_item_name

            if(CurrentHour=="Per Hour"){
              final_array.push({ ItemName:"1 HOUR",ItemPrice:"$30",SaveAmt:"$31",ItemTime:"1 hour",status:"1",DItemName:"Per Hour",DBal:"1",DTotal:"1",DPrice:"30" });
            }
            else{
              final_array.push({ ItemName:"1 HOUR",ItemPrice:"$30",SaveAmt:"$31",ItemTime:"1 hour",status:"0",DItemName:"Per Hour",DBal:"1",DTotal:"1",DPrice:"30" });
            }

            if(CurrentHour=="10 Hours Bucket"){
              final_array.push({ ItemName:"1O HOURS",ItemPrice:"$269",SaveAmt:"$31",ItemTime:"10 hours",status:"1",DItemName:"10 Hours Bucket",DBal:"10",DTotal:"10",DPrice:"269" });
            }
            else{
              final_array.push({ ItemName:"1O HOURS",ItemPrice:"$269",SaveAmt:"$31",ItemTime:"10 hours",status:"0",DItemName:"10 Hours Bucket",DBal:"10",DTotal:"10",DPrice:"269" });
            }
         
            if(CurrentHour=="50 Hours Bucket"){
              final_array.push({ ItemName:"5O HOURS",ItemPrice:"$1200",SaveAmt:"$300",ItemTime:"50 hours",status:"1",DItemName:"50 Hours Bucket",DBal:"50",DTotal:"50",DPrice:"300" });
            }
            else{
              final_array.push({ ItemName:"5O HOURS",ItemPrice:"$1200",SaveAmt:"$300",ItemTime:"50 hours",status:"0",DItemName:"50 Hours Bucket",DBal:"50",DTotal:"50",DPrice:"300" });
            }
            return res.status(200).json({status :200,message:"Data received successfully.",wpstatus:1,getdata:result11,final_array:final_array});
          }
          else {    
          final_array.push({ ItemName:"1 HOUR",ItemPrice:"$30",SaveAmt:"$31",ItemTime:"1 hour",status:"0",DItemName:"Per Hour",DBal:"1",DTotal:"1",DPrice:"30" });   
          final_array.push({ ItemName:"1O HOURS",ItemPrice:"$269",SaveAmt:"$31",ItemTime:"10 hours",status:"0",DItemName:"10 Hours Bucket",DBal:"10",DTotal:"10" ,DPrice:"269"});
          final_array.push({ ItemName:"5O HOURS",ItemPrice:"$1200",SaveAmt:"$300",ItemTime:"50 hours",status:"0",DItemName:"50 Hours Bucket",DBal:"50",DTotal:"50",DPrice:"300" });     
            return res.status(200).json({status :200,message:"Data received successfully.",wpstatus:1,getdata:result11});
          }
        });  
  }
      else {  
         return res.status(200).json({  message: 'you are not authorized to use', status :200, wpstatus:0  }); 
  }  
  });
},


};
