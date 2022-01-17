

function validationForm()
{  

let usernameEle=document.querySelector('.fname');
let emailEle=document.querySelector('#email');
let passwordEle=document.querySelector('#password');
let useridEle=document.querySelector('#user-id');
let countryEle=document.querySelector('#country');
let languagesEle=document.getElementById('#checkbox');
let zipcodeEle=document.querySelector('#zipcode');

// fetching values of input fields
 let useridValue= useridEle.value;
 let usernameValue=usernameEle.value;
 let useremail=emailEle.value;
 let userZipcodeValue=zipcodeEle.value;
 let userCountry=countryEle.value;

    
//utility function  for form validation
  let  isemailValid=(email)=>
  {
      let emailValue=email;
      var regExp =/^([a-zA-z0-9\.-]+)@([a-zA-z0-9]+).([a-z]{2,20})$/;
     return regExp.test(emailValue);
  }
  let isBlank=(input)=>{
    let valid=false;
    if(input.value.trim()==""||input.value==null)
    {
    //    input.style.border="solid 1px red"
      return valid;
    }
    else
    {
      input.style.border="solid 1px green";
      valid= true;
    }
    return valid;
 }    


    
    if(!isBlank(useridEle)||useridEle.value.length<5||useridEle.value.length>20)
    {
      let useridParent=useridEle.parentElement;
       
      let error=useridParent.querySelector('small');

      error.textContent="* Required must be of length 5 to 20";
    
      useridEle.style.border="solid 2px red";
      
      return false;
   
    }
    else if(!isBlank(passwordEle)||passwordEle.value.length<7||passwordEle.value.length>"12")
    {
        passwordEle.style.border="solid 1px red";
       let parent=passwordEle.parentElement;
       let error=parent.querySelector('small');
       error.textContent=" *Required must be length 7 to 12"
      

        return false;
    }
    else if(!isBlank(usernameEle)||!/^[a-zA-Z\-]*$/.test(usernameEle.value)||usernameEle.value.length<2)
    {
        usernameEle.style.border="solid 1px red";
        let parent=usernameEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* required and A-Z,a-z ,- are allowed";
        return false;
    }
    else if(!isBlank(countryEle))
    {
        countryEle.style.border="solid 2px red";
        let parent=countryEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* Required.select a country";           
        return false;
    }
    else if(!isBlank(zipcodeEle)||zipcodeEle.value.length<6||zipcodeEle.value.length>6||!/^[0-9]*$/.test(zipcodeEle.value))
    {
     
        zipcodeEle.style.border="solid 1px red";
        let parent=zipcodeEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* Required Must be Numeric only and length should be 6"
       
        return false;
    }
    
    else if(!isBlank(emailEle)||!isemailValid(emailEle.value))
    {
        // alert ("* required abcd@domainname.extension");
        emailEle.style.border="solid 1px red";
        let parent=  emailEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* required abcd@domainname.extension"
        return false;
    }
    else if(!document.userform.checkbox1.checked && !document.userform.checkbox2.checked)
    {
        alert ("* Required select one or more")
       return false;
    }
    else
    {    
         //calling function to store userdetails in local storage
        toLocalstorage(useridValue, usernameValue,useremail,userZipcodeValue,userCountry);
        return true;       
    }
    
 }

function toLocalstorage(uid,uname,uemail,uzip,ucountry)
{ 
   let usersArray= existingUser();
   if(usersArray.length==0)
   {
      let userObject={
      id:uid,
      name:uname,
      email:uemail,
      zip:uzip,
      country:ucountry
  };
  usersArray.push(userObject);
  console.log(userObject);
  
  localStorage.setItem("userDetails",JSON.stringify(usersArray));
}
else{
     let muitpleUsers=[...usersArray] ;
     let userObject={
        id:uid,
        name:uname,
        email:uemail,
        zip:uzip,
        country:ucountry
    };
    muitpleUsers.push(userObject);
    localStorage.setItem("userDetails",JSON.stringify(muitpleUsers));
     
}
}

function existingUser()
{
  return  localStorage.getItem("userDetails")==null?[]:JSON.parse(localStorage.getItem("userDetails"))[0]==null?[]:JSON.parse(localStorage.getItem('userDetails'));
}


