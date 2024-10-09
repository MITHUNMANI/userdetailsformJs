function createUserForm(){
    const containerForm = 
    document.getElementById('user-form-container');
    const userForm = document.createElement('form');
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.placeholder = 'Name';
    nameField.required = true;
    const emailField = document.createElement('input');
    emailField.type = 'email'
    emailField.placeholder = 'Email';
    emailField.required = true;
    const submitBtn = document.createElement('button');
    submitBtn.className = 'submit-btn';
    submitBtn.textContent = 'Submit'
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'clear-btn';
    clearBtn.textContent = 'Clear'
    userForm.appendChild(nameField);
    userForm.appendChild(emailField);
    userForm.appendChild(submitBtn);
    userForm.appendChild(clearBtn);
    userForm.onsubmit = async (e) =>{
        e.preventDefault();
        await saveData({name:nameField.value,email:emailField.value});
        displayData(null);
        userForm.reset();
    }
    clearBtn.onclick = () =>{
        nameField.value = '';
        emailField.value = '';
    }
    containerForm.appendChild(userForm);
}

async function saveData(user) {
    let userDetail = JSON.parse(localStorage.getItem('userDetails')) || [];
    userDetail.push(user);
    localStorage.setItem('userDetails',JSON.stringify(userDetail));
}



async function displayData(userIndex) {
    const table_body = document.querySelector('#user-form-table tbody');
    table_body.innerHTML = '';
    const userFormDetails = JSON.parse(localStorage.getItem('userDetails') || []);
    if(userFormDetails && userFormDetails.length === 0){
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 3;
        cell.textContent = 'No data available';
        cell.style.textAlign = 'center';
        row.appendChild(cell);
        table_body.appendChild(row);
        return;
     }
    userFormDetails.forEach((userFormDetail,index)=>{
        const table_row = document.createElement('tr');
        console.log(userIndex,index);
       
        if(userIndex === index){
            table_row.innerHTML = `
            <td>
            <input type="text" value="${userFormDetail.name}" id="edit-name-${index}" class="input-line-border"/></td>
            <td>
            <input type="email" value="${userFormDetail.email}" id="edit-email-${index}" class="input-line-border"/></td>
            <td>
            <button onclick="submitDetails(${index})" class="edit-submit-btn">Submit</button>
            <button onclick="cancelDetails(${index})" class="edit-cancel-btn">Cancel</button>
            </td>
            `
        }
        else{
            table_row.innerHTML = 
            `
            <td>
            <input type="text" value="${userFormDetail.name}" id="edit-name-${index}" readOnly class="input-no-border"/>
            </td>
            <td>
             <input type="email" value="${userFormDetail.email}" id="edit-email-${index}" readOnly class="input-no-border"/>
            </td>
            <td>
            
            <button onclick="editUserDetails(${index})" class="edit-btn">Edit</button>
            <button onclick="deleteUserDetails(${index})" class="delete-btn">Delete</button>
            </td>
            `
        }
       
        table_body.appendChild(table_row);
    })
}

function cancelDetails(index){
    displayData(null);
}

function submitDetails(index){
    const newNameField = document.getElementById(`edit-name-${index}`).value;
    const newEmailField = document.getElementById(`edit-email-${index}`).value;

    if(newNameField && newEmailField){
        let users = JSON.parse(localStorage.getItem('userDetails'));
        users[index] = { name:newNameField, email: newEmailField};
        localStorage.setItem('userDetails',JSON.stringify(users));
        displayData(null);
    }
}

function editUserDetails(resp){
    displayData(resp);    
}

function deleteUserDetails(resp){
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    userDetails.splice(resp,1);
    localStorage.setItem('userDetails',JSON.stringify(userDetails));
    displayData(null);
}

createUserForm();
displayData(null);