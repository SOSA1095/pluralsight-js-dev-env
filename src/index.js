import './index.css'
import {getUsers, deletUser} from './api/userApi';

getUsers().then(result =>{
  let userBody="";
  result.forEach(user => {
    userBody += ` <tr>
      <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
      <td>${user.id}</td>
      <td>${user.firstName}</td>
      <td>${user.LastName}</td>
      <td>${user.email}</td>
      </tr>
    `
  });
  global.document.getElementById('users').innerHTML = userBody;

  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  Array.from(deleteLinks, link => {
    link.onclick = function(event){
      const element = event.target;
      event.preventDefault();
      deletUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
});
