

var form = document.getElementById("modall");
var formSubmitButton = document.getElementById("formSubmit");
var clickMeButton = document.getElementById("clickMeButton");

clickMeButton.addEventListener('click', function() {
    form.style.display = "flex";
});

function submitForm(event) {
    event.preventDefault();

    let newUser = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value
    };

    $.post('/api/users', newUser);
    
}

function addUser(user) {
    userList.push(user);
}

formSubmitButton.addEventListener('click', submitForm);

const getUsers = () => {

    $.get('/api/users', (response) => {
      if (response.statusCode == 200) {
        console.log(response.data);
      }
    })
  }
  
  $(document).ready(function () {
    
    getUsers();
  });
