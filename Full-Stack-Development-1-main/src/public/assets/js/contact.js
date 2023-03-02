

const form = document.querySelector(".contact-form");
form.append();

form.addEventListener("submit", (event)=>{
	event.preventDefault();


fetch("http://localhost:3004/contact", {
		method: "POST",
	
		body: JSON.stringify({

name :document.getElementById("name").value,
email : document.getElementById("email").value,
phone : document.getElementById("phone").value,
company_name : document.getElementById("company_name").value,
project_name : document.getElementById("project_name").value,
project_desc: document.getElementById("project_desc").value,
department :document.getElementById("department").value,
message :document.getElementById("message").value,
file : null,

	}),

	headers: {
		"Content-Type": "application/json",
	  },
	}) 
        .then((data) => console.log("Success", data));

}).catch(error, console.log("Invalid parameter", error));


