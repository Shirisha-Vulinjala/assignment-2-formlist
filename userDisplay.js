
let gridDisplay=JSON.parse(localStorage.getItem("userDetails"));
console.log(gridDisplay);
  
 let userContainer=document.querySelector('.tablebody');
 let userdetailsContainer=`<div class="container table-light">`;
 console.log(gridDisplay)
    gridDisplay.forEach(individualUser=>{
      if(individualUser==null)
      {
        let index=gridDisplay.indexOf(individualUser);
        gridDisplay.splice(index,1);
      }
      else{

      userdetailsContainer+=`
     <tr>
     <div class="container individualUsercontainer">
     <tr >
       <td><input type="text" id="user-id" value="${individualUser.id}" class="bord1 " disabled><br>
       <p></p></td>
       <td> <input type="text" class="fname bord1 " value="${individualUser.name}" disabled ></td>
       <td><input type="text" id="email" value="${individualUser.email}" class="bord1 " disabled></td>
       <td><input type="text" id="zipcode" value="${individualUser.zip}" class="bord1 " disabled></td>
       <td>
       <select id="country" value="${individualUser.country}" class="bord1" disabled>
       <option value="${individualUser.country}">${individualUser.country} </option>
       <option value="US">US</option>
       <option value="Indonesia">Indonesia</option>
       <option value="Brazil">Brazil</option>
       <option value="Nigeria">Nigeria</option>
       <option value="Russia">Russia</option>
       </td>
       <td><button type="button" id="editbtn" class="btn edit" ><i class="fa fa-pencil px-3" aria-hidden="true"></i>Edit</button>
       <button type="button" id="updatebtn" class="btn btn-warning update" style="visibility:hidden"><i class="fa fa-check" aria-hidden="true"></i>Update</td>
       <td><button type="button" class="btn deletebtn">Delete <i class="fa fa-times" aria-hidden="true"></i> </button>
       <button type="button" class="btn btn-danger cancelbtn" style="visibility:hidden"><i class="fa fa-ban" aria-hidden="true"></i> Cancel</button></td>
       </tr>
       </div>
       </tr>`
       
    }});
    userdetailsContainer+=`</div>`;

    userContainer.innerHTML=userdetailsContainer;
   

 
let editbtnArray=document.querySelectorAll('#editbtn');
console.log(editbtnArray.length)
let updatebtnArray=document.querySelectorAll('#updatebtn');
let cancelbtnArray=document.querySelectorAll('.cancelbtn');
let deletebtnArray=document.querySelectorAll('.deletebtn');
console.log(editbtnArray.length)
// adding eventlistener for edit buttons
for(let i=0;i<editbtnArray.length;i++)
{
   editbtnArray[i].addEventListener('click',function (){
      let parent= editbtnArray[i].parentElement.parentElement;
      // enabling the input fields of individualContainer
     let inputList=  parent.querySelectorAll("#user-id,.fname,#email,#zipcode,#country");
     let inputArray= Array.from(inputList);
     for(let j=0;j<inputArray.length;j++)
     {
        inputArray[j].disabled=false;
     }
     //displaying update,cancel button and hiding edit,delete button
     parent.querySelector('#editbtn').style.visibility="hidden";
     parent.querySelector('#updatebtn').style.visibility="visible";
     parent.querySelector('.deletebtn').style.visibility="hidden";
     parent.querySelector('.cancelbtn').style.visibility="visible";
    
   })
}
// adding event listeners for update buttons
for(let i=0;i<updatebtnArray.length;i++)
{
   updatebtnArray[i].addEventListener('click',function ()
   {
     let parent=updatebtnArray[i].parentElement.parentElement;
     let uservaluesArray={};
     uservaluesArray.id=parent.querySelector('#user-id').value;
     uservaluesArray.name=parent.querySelector('.fname').value;
     uservaluesArray.email=parent.querySelector('#email').value;
     uservaluesArray.zip=parent.querySelector('#zipcode').value;
     uservaluesArray.country=parent.querySelector('#country').value; 

      //calling function for inputs validation
    let isChangesValid= changesValidation(parent);
    console.log(isChangesValid);
   if(isChangesValid)
   {
      // alert ("click update button to save changes");
      let localStoreArray= getLocalStorageDetails();
      localStoreArray[i]=uservaluesArray;
      localStorage.setItem('userDetails',JSON.stringify(localStoreArray));
      parent.querySelector('#editbtn').style.visibility="visible";
      parent.querySelector('#updatebtn').style.visibility="hidden";
      parent.querySelector('.deletebtn').style.visibility="visible";
      parent.querySelector('.cancelbtn').style.visibility="hidden"; 
     // disabling all input fields
      let inputList=  parent.querySelectorAll("#user-id,.fname,#email,#zipcode,#country");
      let inputArray= Array.from(inputList);
     for(let j=0;j<inputArray.length;j++)
     {
        inputArray[j].disabled=true;
        inputArray[j].style.border="none";
     }
     window.location.reload();
   }
   else
   {
      alert ("check all the fields")
   }  
   })
}

for(let i=0;i<cancelbtnArray.length;i++)
{
   cancelbtnArray[i].addEventListener('click',function ()
   {
      let parent=cancelbtnArray[i].parentElement.parentElement;
      parent.querySelector('#editbtn').style.visibility="visible";
      parent.querySelector('#updatebtn').style.visibility="hidden";
      parent.querySelector('.deletebtn').style.visibility="visible";
      parent.querySelector('.cancelbtn').style.visibility="hidden"; 
      let inputList=  parent.querySelectorAll("#user-id,.fname,#email,#zipcode,#country");
      let inputArray= Array.from(inputList);
     for(let j=0;j<inputArray.length;j++)
     {
        inputArray[j].disabled=true;
     }
     window.location.reload();
   })
}
// adding functionality to delete button
 for(let i=0;i<deletebtnArray.length;i++)
 {
   deletebtnArray[i].addEventListener('click',function ()
   {
      let parent=deletebtnArray[i].parentElement.parentElement;
         
     let localStoreDetails=  getLocalStorageDetails();
     localStoreDetails.splice(i,1);
     localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
     parent.remove(); 
     window.location.reload();
     })
 }

 function   getLocalStorageDetails()
{
   return localStorage.getItem('userDetails')==null?[]:JSON.parse(localStorage.getItem('userDetails'));
}
   
function changesValidation(parentEle)
   {
         let  useridEle=parentEle.querySelector('#user-id');
         let usernameEle=parentEle.querySelector('.fname');
         let userEmailEle=parentEle.querySelector('#email');
         let userZipEle=parentEle.querySelector('#zipcode');
         let userCountryEle=parentEle.querySelector('#country');
         //utility functions 

         let isBlank=(input)=>{
            let valid=false;
            if(input.value.trim()==""||input.value==null)
            {
               input.style.border="solid 1px red"
              return valid;
            }
            else
            {
              input.style.border="solid 1px green";
              valid= true;
            }
            return valid;
         }   
         

         if(!isBlank(useridEle)||useridEle.value.length<5)
         {
            alert("*Required must have atleast 5 charachters to 20 characters");
            useridEle.style.border="solid 2px red";
            return false;
         }
         else if(!isBlank(usernameEle)||!/^[a-zA-Z\-]*$/.test(usernameEle.value)||usernameEle.value.length<2)
         {
            alert ("* Required and A-Z,a-z ,- are allowed ");
            usernameEle.style.border="solid 2px red";

            return false;
         }
         else if(!isBlank(userEmailEle)||!/^([a-zA-z0-9\.-]+)@([a-zA-z0-9]+).([a-z]{2,20})$/.test(userEmailEle.value))
         {
            userEmailEle.style.border="solid 2px red";
            alert ("* required abcd@domainname.extension");

            return false;
         }
         else if(!isBlank(userZipEle)||userZipEle.value.length<6||userZipEle.value.length>6||!/^[0-9]*$/.test(userZipEle.value))
         {
            alert ("* Required Must be Numeric only and length should be 6");
            userZipEle.style.border="solid 2px red";
            return false;

         }
         else if(!isBlank(userCountryEle))
         {
            alert ("* required cannot be blank");
            return false;
         }
         else{
            return true;
         }

   }
   //Sorting based on numbers for zipcode

   let sortByZip=document.getElementById('sortByZip');
   sortByZip.addEventListener('click',function ()
   {
      let localStoreDetails= getLocalStorageDetails();
        localStoreDetails.sort(function (a,b)
        {
           return a.zip-b.zip;
        })
        localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
        window.location.reload();
   })
   // sorting based on username
   let sortByName=document.getElementById('sortByName')
   sortByName.addEventListener('click',function ()
    {
      let localStoreDetails= getLocalStorageDetails();
      localStoreDetails.sort(function (a,b)
      {
         if(a.name<b.name) return -1;
         if(a.name>b.name) return 1;
         else
         return 0;
   
      })
      localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
      window.location.reload();
       
    })
    // sorting based on userid
    let sortById=document.getElementById('sortById');
    sortById.addEventListener('click',function ()
    {
      let localStoreDetails= getLocalStorageDetails();
      localStoreDetails.sort(function (a,b)
      {
         if(a.id<b.id) return -1;
         if(a.id>b.id) return 1;
         else
         return 0;
   
      })
      localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
      window.location.reload();
       
    });
    //sorting based on country of user
    let sortByCountry=document.getElementById('sortByCountry');
    sortByCountry.addEventListener('click',function ()
    {
      let localStoreDetails= getLocalStorageDetails();
      localStoreDetails.sort(function (a,b)
      {
         if(a.country<b.country) return -1;
         if(a.country>b.country) return 1;
         else
         return 0;
   
      })
      localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
      window.location.reload();
    })
   // sorting based on email of user
   let sortByEmail=document.getElementById('sortEmail');
   sortByEmail.addEventListener('click',function ()
   {
      let localStoreDetails= getLocalStorageDetails();
      localStoreDetails.sort(function (a,b)
      {
         if(a.email<b.email) return -1;
         if(a.email>b.email) return 1;
         else
         return 0;
   
      })
      localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
      window.location.reload();
   })
   
     

  
 
