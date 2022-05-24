const inputField = document.getElementById("inputField");
const sendImageButton = document.getElementById("sendImageButton");
const mainMessageList = document.getElementById("message");
const mainListForNewUser = document.getElementById("new-user");
const mainListForNewGroups = document.getElementById("new-group");
const mainListForGroupMembers = document.getElementById("group-members-id");
const createdUsers = document.getElementById("users");
const generateUserList = document.getElementById("user-List");
const inputOfImage = document.getElementById("image_input");

//global declarations
const newGroups = [];
const newUser = [];
const dynamicElement = [];
let inputValueOfNewUser;
let inputValueOfNewGroup;
const REQUIRED = "REQUIRED";
//global declaration ended

//for creation of user
function creationNewUserHandler() {
  const createNewUserElement = document.getElementById("create-user-id");
  inputValueOfNewUser = createNewUserElement.value;
  // const userObj={
  //   [inputValueOfNewUser]:{
  //     message:`${inputField.value}`,
  //     id: new Date().getUTCMilliseconds()
  //   }
  // }
  newUser.push(inputValueOfNewUser); //putting new users in to array
  const newUserElement = document.createElement("li");
  newUserElement.className = "sidebar-item";
  newUserElement.innerHTML = `
    <a href="#">
    <img
      src="https://www.w3schools.com/howto/img_avatar.png"
      alt="avatar"
      class="avatar"
    />
    <span id="${inputValueOfNewUser}Id" class="name">${inputValueOfNewUser}</span>
  </a>`;
  mainListForNewUser.appendChild(newUserElement);
  createNewUserElement.value = "";
  dynamicElement.push(document.getElementById(`${inputValueOfNewUser}Id`));
  for (item of dynamicElement) {
    eventListener(item);
  }
}
const buttonElement = document.getElementById("create-user-button");
buttonElement.addEventListener("click", creationNewUserHandler);
//new user creation completed

let selectedUser;
function eventListener(element) {
  element.addEventListener("click", () => {
    selectedUser = element.textContent;
    inputOfImage.value = null;
  });
}
//ended

//for validation of empty message
function validate(value, flag) {
  if (flag === REQUIRED) {
    return value.trim().length;
  }
}
//for validation completed

//send image button is clicked and mesages are rendered in page by creating elements.
let newMessageElement;
function sendMessageFunction() {
  let inputFieldValue = inputField.value;
  if (!selectedUser) {
    alert(
      "please select any user from the sidebar to send message from their name in group,so that other user may know the sender"
    );
    inputField.value = "";
  } else {
    let fileNames = document.querySelector("#image_input");
    let fileName = fileNames.value;
    extension = fileName.substring(fileName.lastIndexOf(".") + 1);
    if (extension == "png" || extension == "jpg" || extension == "jpeg") {
      let file = window.URL.createObjectURL(fileNames.files[0]);
      newMessageElement = document.createElement("li");
      newMessageElement.innerHTML = `${selectedUser}:<img src="${file}" alt="" width="180 " height="100">`;
      newMessageElement.className = "message-item item-primary";
      mainMessageList.appendChild(newMessageElement);
    } else if (!validate(`${inputFieldValue}`, REQUIRED)) {
      alert("please type some message in message box below");
    } else {
      newMessageElement = document.createElement("li");
      newMessageElement.innerHTML = `${selectedUser}: ${inputFieldValue.replace(
        /<[^>]+>/g,
        ""
      )}`;
      newMessageElement.className = "message-item item-primary";
      newMessageElement.style.overflow = "break-word";
      mainMessageList.appendChild(newMessageElement);
      inputField.value = "";
      newGroups.filter((iterateGroups)=>{
        const groupName = Object.keys(iterateGroups);
        const isMatched = groupName.includes(inputValueOfNewGroup);
        if(isMatched){
          iterateGroups[inputValueOfNewGroup].messages.push(`${selectedUser}: ${inputFieldValue}`);
        }        
      })
    }
  }
}
sendImageButton.addEventListener("click", () => {
  sendMessageFunction();
});
//send button ended


//group-portion-started

//for creation of Group
function creationNewGroupHandler() {
  inputValueOfNewGroup = groupNameElement.value;
  const groupObj = {
    [inputValueOfNewGroup]: {
      messages: [],
      members: [],
    },
  };
  newGroups.push(groupObj);
  console.log(newGroups);
  const newGroupElement = document.createElement("li");
  newGroupElement.className = "sidebar-item";
  newGroupElement.innerHTML = `
    <a href="#">
    <img
      src="https://www.w3schools.com/howto/img_avatar.png"
      alt="avatar"
      class="avatar"
    />
    <span id="${inputValueOfNewGroup}Id" class="name" onclick="eventListenerForGroupMembers('${inputValueOfNewGroup}')">${inputValueOfNewGroup}</span>
  </a>`;
  mainListForNewGroups.appendChild(newGroupElement);
  groupNameElement.value = "";
}
const buttonElementGroup = document.getElementById("create-group-button");
buttonElementGroup.addEventListener("click", creationNewGroupHandler);

function eventListenerForGroupMembers(groupElement) {
  inputValueOfNewGroup=groupElement;
  document.getElementById(
    "mainHeader"
  ).innerText = `${groupElement} Group-Chat`;
  removeChilds(mainMessageList); //to remove all childs
  mainListForGroupMembers.innerHTML = ``;
  newGroups.filter((singleGroup) => {
    const groupName = Object.keys(singleGroup); //list of keys of group
    const isMatched = groupName.includes(groupElement);
    if (isMatched) {
      singleGroup[groupElement].members.map((iterate) => {
        const groupMemberElement = document.createElement("li");
        groupMemberElement.innerHTML = `
            <a href="#">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
              class="avatar"
            />
            <span id="${iterate}Id" class="name" onclick="userSelectionToDispayName(this.id)">${iterate}</span>
            </a>`;
        mainListForGroupMembers.appendChild(groupMemberElement);
      });
      singleGroup[groupElement].messages.map((messages) => {
        newMessageElement = document.createElement("li");
        newMessageElement.innerHTML = messages;
        newMessageElement.className = "message-item item-primary";
        newMessageElement.style.overflow = "break-word";
        mainMessageList.appendChild(newMessageElement);
      });
    }
  });
}
//groups creation ended

//generation of listed  users in option block
const groupNameElement = document.getElementById("group-name");
function generateUserLIstHandler() {
  newUser.forEach((userOption) => {
    const options = document.createElement("option");
    options.innerHTML = `
    <option value="${userOption}Id">${userOption}</option>
    `;
    createdUsers.appendChild(options);
  });
}
//user list generation ended
//group members adding in to group and displaying started
const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

function selectionOfUsersToAddInGroup() {
  let usersSelected = document.getElementById("users").value;
  newGroups.filter((iterateGroups) => {
    let groupName = Object.keys(iterateGroups);
    const isMatched = groupName.includes(inputValueOfNewGroup);
    if (isMatched) {
      iterateGroups[inputValueOfNewGroup].members.push(usersSelected);
      alert(`user ${usersSelected} is added`);
    }
  });
}
generateUserList.addEventListener("click", generateUserLIstHandler);

function userSelectionToDispayName(id) {
  const element = document.getElementById(`${id}`);
  selectedUser = element.textContent;
}
// group members adding in to group and displaying ended
