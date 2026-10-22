
const btnsend = document.getElementById('btnsend');
const url='http://localhost:3284/users'
btnsend.addEventListener('click', async (event) => {
  event.preventDefault();
  const success = await userSignIn(); 

  if (success) {
    window.location.href = 'orderProd.html';
  }
});
    
async function  userSignIn() {
    const fullname=document.getElementById('full-name').value
    const address=document.getElementById('Living-Address').value
    const phone=document.getElementById('phone').value
    const email=document.getElementById('Email-Address').value
    const password=document.getElementById('password').value
    
    // בדיקות תקינות
    if (!fullname|| !address|| !phone|| !email||!password )
        return;

    const user = {
        fullname:fullname,
        address:address,
        phone:phone,
        email:email,
        password:password
    };
 

 fetch('http://localhost:3284/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
})
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('HTTP status ' + response.status);
  }
})
.then(data => console.log('Success:', data))
.catch(error => {console.error('Fetch error:', error);throw error});
alert('user created succsesfuly!')
}
//log in function
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // stop page refresh

  const fullname = document.getElementById('name_login').value;
  const password = document.getElementById('password_login').value;

  try {
    const response = await fetch('http://localhost:3284/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, password })
    });

    if (response.ok) {

      const data = await response.json();
      
       if (data.roles === 'admin') {
        alert('התחברת כמנהל');
        window.location.href = 'manager.html';
      } 
      else {
        alert('התחברת בהצלחה!');
        window.location.href = 'orderProd.html';
    } }
    else {
      const err = await response.json();
      alert('שגיאה: ' + err.message);
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('שגיאת רשת');
  }
});
//update user
const btnupdate = document.getElementById('btnupdate');
btnupdate.addEventListener('click', () => {
    event.preventDefault()
  //  window.location.href='orderProd.html'
   const email=document.getElementById('Email-Address').value

fetch(`http://localhost:3284/users?email=${encodeURIComponent(email)}`)
  .then(res => res.json())
  .then(users => {
    console.log('Users found:', users);
    
    if (!Array.isArray(users) || users.length === 0) {
      alert('No user found with this email');
      return;
    }

    const userId = users[0]._id;
    updateUser(userId); 
  })
  .catch(error => {
    console.error('Fetch error:', error);
    alert('Something went wrong while finding the user');
  });

    
});

async function updateUser(userId) {
  const updatedUser = {
    fullname: document.getElementById('full-name').value,
    address: document.getElementById('Living-Address').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('Email-Address').value,
    password: document.getElementById('password').value,
    _id: userId
  };

  try {
    const response = await fetch(`http://localhost:3284/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Updated user:', data);
    alert('User updated successfully!');
  } catch (error) {
    console.error('Error updating user:', error);
    alert('Failed to update user');
  }
}

