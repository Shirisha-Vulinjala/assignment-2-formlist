function griddisplay(){
   let gridDisplay=JSON.parse(localStorage.getItem("userDetails"));
   console.log(gridDisplay);
     
    let userContainer=document.querySelector('.tablebody');
    let userdetailsContainer=`<div class="container mainContainer table-light">`;
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
          <td><input type="text" id="user-id" value="${individualUser.id}" class="bord1" style="width:180px;" disabled><br>
          </td>
          <td> <input type="text" class="fname bord1 " value="${individualUser.name}" disabled ></td>
          <td><input type="text" id="email" value="${individualUser.email}" class="bord1 "  style="width:300px;" disabled></td>
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
          <td><input type="text"  class="userLang bord1" value="${individualUser.language}"  style="width:220px;" disabled>
          <div class="editlang" style="visibility:hidden">
          <input type="checkbox" id="check1" value="English" >English 
          <input type="checkbox" id="check2" value="Telugu" >Telugu<br>
          <input type="checkbox" id="check3" value="Bengali" >Bengali
          <input type="checkbox" id="check4" value="Hindi" >Hindi
          </div>
          </td> 
          <td><button type="button" id="editbtn" class="btn edit" ><i class="fa fa-pencil" aria-hidden="true"></i>Edit</button>
          <button type="button" id="updatebtn" class="btn btn-warning update" style="visibility:hidden"><i class="fa fa-check" aria-hidden="true"></i>Update</td>
          <td><button type="button" class="btn deletebtn">Delete <i class="fa fa-times" aria-hidden="true"></i> </button>
          <button type="button" class="btn btn-danger cancelbtn" style="visibility:hidden"><i class="fa fa-ban" aria-hidden="true"></i> Cancel</button></td>    
          </tr>
          </div>
          </tr>`
          
       }});
       userdetailsContainer+=`</div>`;
   
       userContainer.innerHTML=userdetailsContainer;
   
   
    
    editbtnArray=document.querySelectorAll('#editbtn');
    console.log(editbtnArray.length)
    updatebtnArray=document.querySelectorAll('#updatebtn');
    cancelbtnArray=document.querySelectorAll('.cancelbtn');
    deletebtnArray=document.querySelectorAll('.deletebtn');
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
        parent.querySelector('.editlang').style.visibility="visible";
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
        var lanValue;
       let input1= parent.querySelector('#check1');
       let input2=parent.querySelector('#check2');
       let input3=parent.querySelector('#check3');
       let input4=parent.querySelector('#check4');
       let originalLanValue=parent.querySelector('.userLang').value;
       console.log(originalLanValue)
       console.log(input1.value,input2.value,input3.value,input4.value)
        console.log(input1.checked)
        //checking for single checkbox checked
        if(input1.checked&&!input2.checked&&!input3.checked&&!input4.checked)
        {
          lanValue=input1.value;
          parent.querySelector('.userLang').value=lanValue;
          console.log(lanValue)
        }
        else if(input2.checked&&!input1.checked&&!input3.checked&&!input4.checked)
        {
         lanValue=input2.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input3.checked&&!input1.checked&&!input2.checked&&!input4.checked)
        {
         lanValue=input3.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input4.checked&&!input1.checked&&!input2.checked&&!input3.checked)
        {
         lanValue=input4.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        //checking for two checkboxes checked
        else if(input1.checked&&input2.checked&&!input3.checked&&!input4.checked)
        {
         lanValue=input1.value+" ,"+input2.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input1.checked&&input3.checked&&!input2.checked&&!input4.checked)
        {
         lanValue=input1.value+" ,"+input3.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input2.checked&&input3.checked&&!input1.checked&&!input4.checked)
        {
         lanValue=input2.value+" ,"+input3.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input2.checked&&input4.checked&&!input1.checked&&!input3.checked)
        {
         lanValue=input2.value+" ,"+input4.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input1.checked&&input4.checked&&!input2.checked&&!input3.checked)
        {
         lanValue=input1.value+" ,"+input4.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input3.checked&&input2.checked&&!input1.checked&&!input4.checked)
        {
         lanValue=input3.value+" ,"+input2.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input3.checked&&input4.checked&&!input1.checked&&!input2.checked)
        {
         lanValue=input3.value+" ,"+input4.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
   
        // checking for 3 checked checkboxes
        else if(input1.checked&&input1.checked&&input3.checked&&!input4.checked)
        {
         lanValue=input1.value+" ,"+input2.value+" ,"+input3.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input1.checked&&input2.checked&&input4.checked&&!input3.checked)
        {
         lanValue=input1.value+" ,"+input2.value+" ,"+input4.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        else if(input2.checked&&input3.checked&&input4.checked&&!input1.checked)
        {
         lanValue=input2.value+" ,"+input3.value+" ,"+input4.value;
         parent.querySelector('.userLang').value=lanValue;
         console.log(lanValue)
        }
        //checking for all ckeckboxes checked
        else if(input1.checked&&input2.checked&&input3.checked&&input4.checked)
        {
          lanValue=input1.value+","+input2.value+" ,"+input3.value+" ,"+input4.value;
          parent.querySelector('.userLang').value=lanValue;
          console.log(lanValue)
        }
        else{
                  parent.querySelector('.userLang').value=originalLanValue;
   
        }
   
        
        let uservaluesArray={};
        uservaluesArray.id=parent.querySelector('#user-id').value;
        uservaluesArray.name=parent.querySelector('.fname').value;
        uservaluesArray.email=parent.querySelector('#email').value;
        uservaluesArray.zip=parent.querySelector('#zipcode').value;
        uservaluesArray.country=parent.querySelector('#country').value; 
        uservaluesArray.language=parent.querySelector('.userLang').value;
         //calling function for inputs validation
       let isChangesValid= changesValidation(parent);
       console.log(isChangesValid);
      if(isChangesValid)
      {
        let localStoreArray= getLocalStorageDetails();
         localStoreArray[i]=uservaluesArray;
         localStorage.setItem('userDetails',JSON.stringify(localStoreArray));
         parent.querySelector('#editbtn').style.visibility="visible";
         parent.querySelector('#updatebtn').style.visibility="hidden";
         parent.querySelector('.deletebtn').style.visibility="visible";
         parent.querySelector('.cancelbtn').style.visibility="hidden";
         parent.querySelector('.editlang').style.visibility="hidden";
   
         
        // disabling all input fields
         let inputList=  parent.querySelectorAll("#user-id,.fname,#email,#zipcode,#country,.userLang");
         let inputArray= Array.from(inputList);
        for(let j=0;j<inputArray.length;j++)
        {
           inputArray[j].disabled=true;
           inputArray[j].style.border="none";
        }
   
          
      }
      searchBox()
      
      
      
   })
   }
    // adding eventlistener for cancel button
   for(let i=0;i<cancelbtnArray.length;i++)
   {
      cancelbtnArray[i].addEventListener('click',function ()
      {
         let parent=cancelbtnArray[i].parentElement.parentElement;
      parent.querySelector('#editbtn').style.visibility="visible";
      parent.querySelector('#updatebtn').style.visibility="hidden";
      parent.querySelector('.deletebtn').style.visibility="visible";
      parent.querySelector('.cancelbtn').style.visibility="hidden"; 
      parent.querySelector('.editlang').style.visibility="hidden";
      let inputList=  parent.querySelectorAll("#user-id,.fname,#email,#zipcode,#country");
       let inputArray= Array.from(inputList);
       
        let userdetails=getLocalStorageDetails();
        let userArray=userdetails[i];
        parent.querySelector('#user-id').value=userArray.id;
        parent.querySelector('.fname').value=userArray.name;
        parent.querySelector('#email').value=userArray.email;
        parent.querySelector('#zipcode').value=userArray.zip;
        parent.querySelector('#country').value=userArray.country;
        parent.querySelector('.userLang').value=userArray.language;
        for(let j=0;j<inputArray.length;j++)
        {
           inputArray[j].disabled=true;
           inputArray[j].style.border="none";
        }     
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
       
       
        griddisplay();
      
        })
    }
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
            let userLanguageEle=parentEle.querySelector('.userLang');
            //utility functions 
   
            let isBlank=(input)=>{
               let valid=false;
               if(input.value.trim()==""||input.value==null)
               {
                  input.style.border="solid 1px red"
               
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
               alert("*Required userid must have atleast 5 charachters to 20 characters");
               useridEle.style.border="solid 2px red";
               return false;
            }
            else if(!isBlank(usernameEle)||!/^[a-zA-Z\-]*$/.test(usernameEle.value)||usernameEle.value.length<2)
            {
               alert ("*  username is required should contain A-Z,a-z ,- are allowed ");
               usernameEle.style.border="solid 2px red";
   
               return false;
            }
            else if(!isBlank(userEmailEle)||!/^([a-zA-z0-9\.-]+)@([a-zA-z0-9]+).([a-z]{2,20})$/.test(userEmailEle.value))
            {
               userEmailEle.style.border="solid 2px red";
               alert ("* required email abcd@domainname.extension");
   
               return false;
            }
            else if(!isBlank(userZipEle)||userZipEle.value.length<6||userZipEle.value.length>6||!/^[0-9]*$/.test(userZipEle.value))
            {
               alert ("* Zipcode Must be Numeric only and length should be 6");
               userZipEle.style.border="solid 2px red";
               return false;
   
            }
            else if(!isBlank(userCountryEle))
            {
               alert ("* Country cannot be blank");
               return false;
            }
            else if(!isBlank(userLanguageEle))
            {
               alert ("select one or more languages")
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
        griddisplay()
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
      griddisplay()
       
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
        griddisplay()
       
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
        griddisplay()
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
        griddisplay()
   })
   
   //sorting based on languages of user
   let sortByLang=document.getElementById('sortByLang');
   sortByLang.addEventListener('click',function ()
   {
      let localStoreDetails= getLocalStorageDetails();
      localStoreDetails.sort(function (a,b)
      {
         if(a.language<b.language) return -1;
         if(a.language>b.language) return 1;
         else
         return 0;
   
      })
      localStorage.setItem('userDetails',JSON.stringify(localStoreDetails));
        griddisplay()
   })
   // adding functionality for search button
   function searchBox()
   {
   let searchBtn=document.querySelector('.searchBtn');
   let userDetails= getLocalStorageDetails();
   let userDetails1=userDetails;
   let valid;
   searchBtn.addEventListener('click',function ()
   {
     
      let searchValue=document.querySelector('#searchText').value;
      let searchValueLower=  searchValue.toLowerCase();
      console.log(searchValueLower);
     
      let searchArray=[];
      if(searchValueLower.trim()!="")
      {
         userDetails.forEach(user=>
            {
               if(user.name==searchValueLower||user.id==searchValueLower||user.email==searchValueLower)
               {
                  searchArray.push(user);
                   valid=true;
             
               }
               else{
                 valid=false;
               }
               
            })
   
         if(searchArray.length>0)
         {
           localStorage.setItem('userDetails',JSON.stringify(searchArray));        
           griddisplay();
         }
         else
         {
            alert(" The details entered are not available please enter valid details")
         }
   
      }
     
      else{
         localStorage.setItem('userDetails',JSON.stringify(userDetails1));
         griddisplay();
   
      }
      
      })
   
        
   }
   searchBox()
   
   // calling functions when the page loads
   griddisplay();
   