const studentProfileModel = require("../models/studentProfileModel");
const teacherProfileModel = require("../models/teacherProfileModel");


// this function check the username and match it to the user in the database and find his/her role, if role is appropriate, client can perform appropriate action based on role by using it.
module.exports=(name)=>{
    
//fetch all user from student
    const finalData = studentProfileModel.find({},{userName: true, userRole: true}).then((data)=>{
      let userPermission= data;
        //fetch all user from teacher
      const data1= teacherProfileModel.find({},{userName: true, userRole: true}).then((data)=>{

        //construct complete user array/list
        let finalList =userPermission.concat(data);
        
        //match the user that exist in array
        const result = finalList.find(element => element.userName= name);

            if(result.userRole ==="admin"){
                return ('admin');
            }else if(result.userRole ==="teacher"){
                return ('teacher');
            }else if(result.userRole ==="student"){
                return ('student');
            }else{
                return ('unknown');
            }

        }).catch((err)=>{
        console.log(err);
        });
   
        return data1;




    }).catch((err)=>{
        console.log(err);
    });
   return finalData;

}
