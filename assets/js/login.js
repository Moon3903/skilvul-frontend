document.querySelector('.img__btn')?.addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
});

//Define an array to hold users as they're added in the new registration page
var userArray = [];
//On first load, skip this step (null check)
//But when returning to the main page after adding users, get all the added users
//out of the array passed between the pages and into the working userArray
if(JSON.parse(sessionStorage.getItem('passingArray')) != null){
  for(i=0;i<JSON.parse(sessionStorage.getItem('passingArray')).length;i++){
       userArray.push(JSON.parse(sessionStorage.getItem('passingArray'))[i]);
  };
};
//log the list of users for convenience and troubleshooting
console.log(userArray);


document.getElementById('enternew').onclick = function(){verifyNew()};
//Verify new user function
function verifyNew(){

  var un = document.getElementById('unnew').value;

  var nameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  if (!nameRegex.test(un)) {
    alert('Username Tidak Sesuai');
    return;
  }
  //once users have been added to the user array,
  //check the new usernames against the known
  //if there's a match kick them back
  //if you get to the end of the array of known users
  //i will have incremented all the way to the array's length
  //this tells you there was no match and calls verifySecure
  //to ensure their password is long enough
  if(userArray.length>0){
      for(i=0; i<userArray.length; i++){
          if(un == userArray[i].un){
              alert("Username exists, please create a new username");
              document.getElementById('unnew').value = "";
              break;
          };
      };
      if(i==userArray.length){
          verifySecure();
      };
  }else{
      verifySecure();
  };
};

function verifySecure(){

  
    const emailValidator = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if (!emailValidator.test(document.getElementById("email").value)) {
      alert('Email Tidak Sesuai');
      return;
    }

  var pw = document.getElementById('pwnew').value;

  //check that the password entered is 8 characters or more
  const passwordValidator = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
  if(pw.length>=8 && passwordValidator.test(pw)){
      addUser();
  }else{
      alert("Please enter Strong Password");
      document.getElementById('pwnew').value = "";
  };
  
};


function addUser(){
  
  var newUser = {
      un: document.getElementById('unnew').value,
      pw: document.getElementById('pwnew').value,
      email : document.getElementById('email').value,
  };

  //add the user to the array, put the array into the shared array, clear the inputs
  userArray.push(newUser);
  sessionStorage.setItem('passingArray', JSON.stringify(userArray));
  document.getElementById('unnew').value = "";
  document.getElementById('pwnew').value = "";
  document.getElementById('email').value = "";

  alert("Your username and password have been successfully added! Please click the Return to Login link to log in");
};

//When the enter button is clicked, call the fucntion to grab the id and pw entered
//and check user authentication
document.getElementById('enter').onclick = function (){authenticate()};

//Autheticate user function
function authenticate(){

  var un = document.getElementById('un').value;
  var pw = document.getElementById('pw').value;

//once users have been added to the user array,
//check the stored usernames and passwords against the known
//if there's a match let them in
//if you get to the end of the array of known users
//i will have incremented all the way to the array's length (less 1)
//this tells you there was no match and calls troubleshoot
//troubleshoot helps determine which fields to clear
//  Valid un and   valid pw -> clear both fields
//  Valid un and invalid pw -> clear pw only
//Invalid un and   valid pw -> clear both fields
//Invalid un and invalid pw -> clear both fields
  if(userArray.length>0){
      for(i=0; i<userArray.length; i++){
          if((un == userArray[i].un) && (pw == userArray[i].pw)){
              alert("You're in!");
              window.location.href = "index.html";
              sessionStorage.setItem("userActive", JSON.stringify({un, pw}));
              document.getElementById('un').value = "";
              document.getElementById('pw').value = "";
              break;
          }
          if(i==userArray.length-1 || userArray.length==0){
              console.log('working')
              troubleshoot(un, pw);
          }
      }
  }else{//enter here on first load when there are no users in the array yet
      alert("No match found. Please click the Create Account link to register a new username");
      document.getElementById('un').value = "";
      document.getElementById('pw').value = "";
  }

};
//If there is a match in the known usernames clear only the pw field so user
//doesn't have to retype un
//If there is no match in the known usernames clear both un and pw fields
function troubleshoot(un, pw){
      for(j=0; j<userArray.length; j++){
          if(un == userArray[j].un){
              alert("Bad password");
              document.getElementById('pw').value = "";
              break;
          };
          if(j==userArray.length-1 || userArray.length==0){
              alert("No match found. Please click the Create Account link to register a new username");
              document.getElementById('un').value = "";
              document.getElementById('pw').value = "";
          };
      };
};

// Logout
function logout() {
    sessionStorage.removeItem('userActive');
}  

var ALERT_TITLE = "Pesan";
var ALERT_BUTTON_TEXT = "Ok";

if (document.getElementById) {
  window.alert = function (txt) {
    createCustomAlert(txt);
  };
}

function createCustomAlert(txt) {
  d = document;

  if (d.getElementById("modalContainer")) return;

  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
  mObj.style.height = d.documentElement.scrollHeight + "px";

  alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";
  if (d.all && !window.opera)
    alertObj.style.top = document.documentElement.scrollTop + "px";
  alertObj.style.left =
    (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
  alertObj.style.visiblity = "visible";

  h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(ALERT_TITLE));

  msg = alertObj.appendChild(d.createElement("p"));
  //msg.appendChild(d.createTextNode(txt));
  msg.innerHTML = txt;

  btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
  btn.href = "#";
  btn.focus();
  btn.onclick = function () {
    removeCustomAlert();
    return false;
  };

  alertObj.style.display = "block";
}

function removeCustomAlert() {
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("modalContainer"));
}
function ful() {
  alert("Alert this pages");
}
