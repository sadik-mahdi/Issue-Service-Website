document.getElementById("login-btn").addEventListener("click",function(){
  const nameInput = document.getElementById("userName");
  const userName = nameInput.value;
  console.log(userName);

  const passwordInput = document.getElementById("userPassword");
  const userPassword = passwordInput.value;
  console.log(userPassword);

  if(userName == "admin" && userPassword == "admin123"){
    window.location.replace("home.html");
  }else{
    alert("login failed <br> <span>Enter correct username and password</span>");
  }
});
