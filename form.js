
function validationForm()
{  

let usernameEle=document.querySelector('.fname');
let emailEle=document.querySelector('#email');
let passwordEle=document.querySelector('#password');
let useridEle=document.querySelector('#user-id');
let countryEle=document.querySelector('#country');
let languagesEle=document.getElementById('#checkbox1');
let languagesEle2=document.getElementById('#checkbox2');

let zipcodeEle=document.querySelector('#zipcode');


// fetching values of input fields
 let useridValue= useridEle.value;
 let usernameValue=usernameEle.value;
 let useremail=emailEle.value;
 let userZipcodeValue=zipcodeEle.value;
 let userCountry=countryEle.value;
 var   checkedValue;
    
//utility function  for form validation
  let  isemailValid=(email)=>
  {
      let emailValue=email;
      var regExp =/^([a-zA-z0-9\.-]+)@([a-zA-z0-9]+).([a-z]{2,20})$/;
     return regExp.test(emailValue);
  }
  let isBlank=(input)=>
  {
    let valid=false;
    
    if(input.value.trim()==""||input.value==null)
    {     
          return valid;
      
      
    }
    else
    {
      input.style.border="solid 2px green";
     let parent= input.parentElement;
    let success= parent.querySelector('small');
    success.style.visibility="hidden"
      valid= true;
    }
    return valid;
 }  

   if(!isBlank(useridEle)&&!isBlank(passwordEle)&&!isBlank(usernameEle)&&!isBlank(countryEle)&&!isBlank(zipcodeEle)&&!isBlank(emailEle))
    {
      let inputList=document.querySelectorAll('#user-id,#password,.fname,#country,#zipcode,#email');
      let errorContent=document.querySelectorAll('small');
      let errorContentArray=Array.from(errorContent)
      let inputArray=Array.from(inputList);
      for(let i=0;i<inputArray.length;i++)
      {
        inputArray[i].style.border="solid 2px red";
        errorContentArray[i].style.visibility="visible";
        
      }
      alert(" *Required fields cannot be blank")
      return false;
     

    }
   else if(!isBlank(useridEle)||useridEle.value.length<5||useridEle.value.length>20)
    {
      let useridParent=useridEle.parentElement;
       
      let error=useridParent.querySelector('small');
      

      error.textContent="* Required must be of length 5 to 20";
      error.style.visibility="visible";
    
      useridEle.style.border="solid 2px red";
      
      return false;
   
    }
    else if(!isBlank(passwordEle)||passwordEle.value.length<7||passwordEle.value.length>12)
    {
        passwordEle.style.border="solid 1px red";
       let parent=passwordEle.parentElement;
       let error=parent.querySelector('small');
       error.textContent=" *Required must be length 7 to 12"
       error.style.visibility="visible";    
        return false;
    }
    else if(!isBlank(usernameEle)||!/^[a-zA-Z\-]*$/.test(usernameEle.value)||usernameEle.value.length<2)
    {
        usernameEle.style.border="solid 1px red";
        let parent=usernameEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* required and A-Z,a-z ,- are allowed";
        error.style.visibility="visible"; 
        return false;
    }
    else if(!isBlank(countryEle))
    {
        countryEle.style.border="solid 2px red";
        let parent=countryEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* Required.select a country";  
        error.style.visibility="visible";          
        return false;
    }
    else if(!isBlank(zipcodeEle)||zipcodeEle.value.length<6||zipcodeEle.value.length>6||!/^[0-9]*$/.test(zipcodeEle.value))
    {
     
        zipcodeEle.style.border="solid 1px red";
        let parent=zipcodeEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* Required Must be Numeric only and length should be 6"
        error.style.visibility="visible";        
        return false;
    }
    
    else if(!isBlank(emailEle)||!isemailValid(emailEle.value))
    {
        
        emailEle.style.border="solid 1px red";
        let parent=  emailEle.parentElement;
        let error=parent.querySelector('small');
        error.textContent="* required abcd@domainname.extension"
        error.style.visibility="visible"; 
        return false;
    }
    else if(!document.userform.checkbox1.checked&&!document.userform.checkbox2.checked)
    {
        alert ("* Required select one or more")         
        return false;
    }
    else
    {
     let langValue= islanguageValid(document.userform.checkbox1,document.userform.checkbox2,document.userform.checkbox3,document.userform.checkbox4)
        console.log(langValue,typeof langValue)
        console.log(useridValue,typeof useridValue)
        toLocalstorage(useridValue, usernameValue,useremail,userZipcodeValue,userCountry, langValue);
        return true;
        
     
    }
    
 }
// storing userdetails in local storage
function toLocalstorage(uid,uname,uemail,uzip,ucountry,ulang)
{  
  uid1=  uid.toLowerCase();
 uname1= uname.toLowerCase();
 uemail1=uemail.toLowerCase();
   let usersArray= existingUser();
   if(usersArray.length==0)
   {

      let userObject={
      id:uid1,
      name:uname1,
      email:uemail1,
      zip:uzip,
      country:ucountry,
      language:ulang
  };
  usersArray.push(userObject);
  console.log(userObject);
  
  localStorage.setItem("userDetails",JSON.stringify(usersArray));
   }
else{
     let muitpleUsers=[...usersArray] ;
     let userObject={
        id:uid1,
        name:uname1,
        email:uemail1,
        zip:uzip,
        country:ucountry,
        language:ulang
    };
    muitpleUsers.push(userObject);
       
    localStorage.setItem("userDetails",JSON.stringify(muitpleUsers));
     
}
}

//fetching details from localStorage.
function existingUser()
{
  return  localStorage.getItem("userDetails")==null?[]:JSON.parse(localStorage.getItem("userDetails"))[0]==null?[]:JSON.parse(localStorage.getItem('userDetails'));
}
// selecting checked checkboxes
function  islanguageValid(input1,input2,input3,input4)
{
  // checking for single checked box
  if(input1.checked&&!input2.checked&&!input3.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox1').value;
   console.log(checkedValue)
   return checkedValue
  }
 else if(input2.checked&&!input1.checked&&!input3.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox2').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input3.checked&&!input1.checked&&!input2.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox3').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input4.checked&&!input1.checked&&!input2.checked&&!input3.checked)
  {
    checkedValue= document.querySelector('#checkbox4').value;
   console.log(checkedValue)
   return checkedValue
  }
  // checking for two checked checkboxes
  else if(input1.checked&&input2.checked&&!input3.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox1').value+" ,"+document.querySelector('#checkbox2').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input1.checked&&input3.checked&&!input2.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox1').value+" ,"+document.querySelector('#checkbox3').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input2.checked&&input3.checked&&!input1.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox2').value+" ,"+document.querySelector('#checkbox3').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input2.checked&&input4.checked&&!input1.checked&&!input3.checked)
  {
    checkedValue= document.querySelector('#checkbox2').value+" ,"+document.querySelector('#checkbox4').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input1.checked&&input4.checked&&!input2.checked&&!input3.checked)
  {
    checkedValue= document.querySelector('#checkbox1').value+" ,"+document.querySelector('#checkbox4').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input3.checked&&input2.checked&&!input1.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox3').value+" ,"+document.querySelector('#checkbox2').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input3.checked&&input4.checked&&!input1.checked&&!input2.checked)
  {
    checkedValue= document.querySelector('#checkbox3').value+" ,"+document.querySelector('#checkbox4').value;
   console.log(checkedValue)
   return checkedValue
  }
  // checking for three checked checkboxes
  else if(input1.checked&&input2.checked&&input3.checked&&!input4.checked)
  {
    checkedValue= document.querySelector('#checkbox1').value+" ,"+document.querySelector('#checkbox2').value+" ,"+document.querySelector('#checkbox3').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input1.checked&&input2.checked&&input4.checked&&!input3.checked)
  {
    checkedValue= document.querySelector('#checkbox1').value+" ,"+document.querySelector('#checkbox2').value+" ,"+document.querySelector('#checkbox4').value;
   console.log(checkedValue)
   return checkedValue
  }
  else if(input2.checked&&input3.checked&&input4.checked&&!input1.checked)
  {
    checkedValue= document.querySelector('#checkbox2').value+" ,"+document.querySelector('#checkbox3').value+" ,"+document.querySelector('#checkbox4').value;
   console.log(checkedValue)
   return checkedValue
  } 
// checking for all checkboxes checked
  else
   {
    checkedValue=document.querySelector('#checkbox1').value+" ,"+document.querySelector('#checkbox2').value+" ,"+document.querySelector('#checkbox3').value+","+document.querySelector('#checkbox4').value;
    console.log(checkedValue);
    return checkedValue
  }
}

