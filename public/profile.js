const userName=document.getElementById("user-name-td");
const userEmail=document.getElementById("user-email-td");
const updateProfileButton=document.getElementById("update-profile-button");

//get user profile
getUserProfile();

async function getUserProfile(){
const url = "http://localhost:3000/api/v1/profile";
  try {
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        userEmail: sessionStorage.getItem("userEmail")
      }
    });

    // Handle the server response
    if (response.ok) {
      const data = await response.json();
      userName.innerHTML=`${data.userName}`;
      userEmail.innerHTML=`${data.userEmail}`;
    } else {
      const errorMessage = await response.text();
      console.error("get user profile failed:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }

}
  /////////////////////////////////////////////////////////////
  //update user profile
  updateProfileButton.addEventListener("click",async()=>{
  const updateProfileForm = document.getElementById("update-profile-form");
  updateProfileForm.style.display="block";

  const userName = document.getElementById("user-Name-input").value;
  const userEmail = document.getElementById("user-Email-input").value;
  const userPassword = document.getElementById("user-Password").value;
  const status = document.getElementById("status-input").value;
    const url2 = "http://localhost:3000/api/v1/profile";
    try {
      
      const response = await fetch(url2, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userName,userEmail,userPassword,status})
      });
  
      // Handle the server response
      if (response.ok) {
        const data = await response.json();
        alert("your profile was updated successfully");
      } else {
        const errorMessage = await response.text();
        console.error("update user profile failed:", errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });