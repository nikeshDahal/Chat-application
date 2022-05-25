const createNewUserElement = document.getElementById("create-user-id");
const inputField = document.getElementById("inputField");
const sendImageButton = document.getElementById("sendImageButton");
const mainMessageList = document.getElementById("message");
const mainListForNewUser = document.getElementById("new-user");
const mainListForNewGroups = document.getElementById("new-group");
const mainListForGroupMembers = document.getElementById("group-members-id");
const createdUsers = document.getElementById("users");
const generateUserList = document.getElementById("user-List");
const inputOfImage = document.getElementById("image_input");
const headerOfChat = document.getElementById("mainHeader");
const searchField = document.getElementById("searchId");

//global declarations
const newGroups = [];
const newUser = [];
const dynamicElement = [];
let inputValueOfNewUser;
let inputValueOfNewGroup;
const REQUIRED = "REQUIRED";
let selectedUser;
let selectedGroupMember;

//global declaration ended

//for creation of user
function creationNewUserHandler() {
  selectedGroupMember = "";
  
  inputValueOfNewUser = createNewUserElement.value;
  const userObj = {
    [inputValueOfNewUser]: {
      message: [],
      timeOfMessage: [],
    },
  };
  newUser.push(userObj); //putting new users in to array
  console.log(newUser);
  const newUserElement = document.createElement("li");
  newUserElement.className = "sidebar-item";
  newUserElement.innerHTML = `
    <a href="#">
    <img
      src="https://www.w3schools.com/howto/img_avatar.png"
      alt="avatar"
      class="avatar"
    />
    <span id="${inputValueOfNewUser}Id" class="name" onclick="eventListener('${inputValueOfNewUser}')">${inputValueOfNewUser}</span>
  </a>`;
  mainListForNewUser.appendChild(newUserElement);
  createNewUserElement.value = "";
}

function eventListener(inputValueOfNewUser) {
  removeChilds(mainMessageList);
  selectedUser = inputValueOfNewUser;
  inputOfImage.value = null;
  headerOfChat.innerText = `${selectedUser}-Chat`;
  newUser.filter((iterateUsers) => {
    const userName = Object.keys(iterateUsers);
    const isMatched = userName.includes(selectedUser);
    if (isMatched) {
      iterateUsers[selectedUser].message.map((iterateMessage) => {
        newMessageElement = document.createElement("li");
        newMessageElement.innerHTML = iterateMessage;
        newMessageElement.className = "message-item item-primary";
        mainMessageList.appendChild(newMessageElement);
      });
    }
  });
} //new user creation completed
//ended
const buttonElement = document.getElementById("create-user-button");
buttonElement.addEventListener("click", creationNewUserHandler);
createNewUserElement.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    creationNewUserHandler();
  }
});


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
  let fileNames = document.querySelector("#image_input");
  let fileName = fileNames.value;
  console.log(fileName);
  extension = fileName.substring(fileName.lastIndexOf(".") + 1);
  if (extension == "png" || extension == "jpg" || extension == "jpeg") {
    let file = window.URL.createObjectURL(fileNames.files[0]);
    newMessageElement = document.createElement("li");
    //update...................................
    if (selectedGroupMember) {
      newGroups.filter((iterateGroups) => {
        const groupName = Object.keys(iterateGroups);
        const isMatched = groupName.includes(inputValueOfNewGroup);
        if (isMatched) {
          iterateGroups[inputValueOfNewGroup].messages.push(
            `${selectedGroupMember}: <img src="${file}" alt="" width="180 " height="100">`
          );
        }
      });
    } else if (selectedUser) {
      newUser.filter((iterateUsers) => {
        const userName = Object.keys(iterateUsers);
        const isMatched = userName.includes(selectedUser);
        console.log("selected user", selectedUser);
        if (isMatched) {
          let time = new Date();
          iterateUsers[selectedUser].message.push(
            ` Nikesh : <img src="${file}" alt="" width="180 " height="100">`
          );
          iterateUsers[selectedUser].timeOfMessage.push(
            `${time.getMilliseconds()}`
          );
        }
      });
    }
    if (selectedGroupMember) {
      console.log("for html", selectedGroupMember);
      newMessageElement.innerHTML = `${selectedGroupMember}:<img src="${file}" alt="" width="180 " height="100">`;
    } else if (selectedUser) {
      console.log("for html", selectedUser);
      newMessageElement.innerHTML = `Nikesh:<img src="${file}" alt="" width="180 " height="100">`;
    }
    //........update

    newMessageElement.className = "message-item item-primary";
    mainMessageList.appendChild(newMessageElement);

    console.log("new user", newUser);
    inputOfImage.value = null;
  } else if (!validate(`${inputFieldValue}`, REQUIRED)) {
    alert("please type some message in message box below");
  } else {
    if (selectedGroupMember) {
      newGroups.filter((iterateGroups) => {
        const groupName = Object.keys(iterateGroups);
        const isMatched = groupName.includes(inputValueOfNewGroup);
        if (isMatched) {
          iterateGroups[inputValueOfNewGroup].messages.push(
            `${selectedGroupMember}: ${inputFieldValue}`
          );
        }
      });
    } else if (selectedUser) {
      newUser.filter((iterateUsers) => {
        const userName = Object.keys(iterateUsers);
        const isMatched = userName.includes(selectedUser);
        console.log("selected user", selectedUser);
        if (isMatched) {
          let time = new Date();
          iterateUsers[selectedUser].message.push(
            ` Nikesh : ${inputFieldValue}`
          );
          iterateUsers[selectedUser].timeOfMessage.push(
            `${time.getMilliseconds()}`
          );
        }
      });
    }
    newMessageElement = document.createElement("li");
    if (selectedUser) {
      newMessageElement.innerHTML = `Nikesh : ${inputFieldValue.replace(
        /<[^>]+>/g,
        ""
      )}`;
    } else if (selectedGroupMember) {
      newMessageElement.innerHTML = `${selectedGroupMember}: ${inputFieldValue.replace(
        /<[^>]+>/g,
        ""
      )}`;
    }
    newMessageElement.className = "message-item item-primary";
    newMessageElement.style.overflow = "breakword";
    mainMessageList.appendChild(newMessageElement);
    inputField.value = "";

    console.log(newUser);
  }
}
sendImageButton.addEventListener("click", () => {
  sendMessageFunction();
});
//send button ended

//group-portion-started

//for creation of Group
const groupNameElement = document.getElementById("group-name");
function creationNewGroupHandler() {
  selectedUser = "";
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
groupNameElement.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    creationNewGroupHandler();
  }
});

function eventListenerForGroupMembers(groupElement) {
  inputValueOfNewGroup = groupElement;
  document.getElementById(
    "mainHeader"
  ).innerText = `${inputValueOfNewGroup} Group-Chat`;
  // inputOfImage.value = null;
  removeChilds(mainMessageList); //to remove all childs
  mainListForGroupMembers.innerHTML = ``;
  newGroups.filter((singleGroup) => {
    const groupName = Object.keys(singleGroup); //list of keys of group
    const isMatched = groupName.includes(inputValueOfNewGroup);
    if (isMatched) {
      singleGroup[inputValueOfNewGroup].members.map((iterate) => {
        const groupMemberElement = document.createElement("li");
        groupMemberElement.innerHTML = `
            <a href="#">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
              class="avatar"
            />
            <span id="${iterate}Id" class="name" onclick="userSelectionToDispayName('${iterate}')">${iterate}</span>
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
function userSelectionToDispayName(nameOfGroupMember) {
  selectedGroupMember = nameOfGroupMember;
  console.log("member name", selectedGroupMember);
}
//groups creation ended

//generation of listed  users in option block
function generateUserLIstHandler() {
  newUser.filter((userOption) => {
    let UserName = Object.keys(userOption);
    const options = document.createElement("option");
    options.innerHTML = `
    <option value="${UserName}Id">${UserName}</option>
    `;
    createdUsers.appendChild(options);
  });
}
generateUserList.addEventListener("click", generateUserLIstHandler);
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
// group members adding in to group and displaying ended

//search feature
searchField.addEventListener("keypress", function (event) {
  enteredSearchFieldValue = searchField.value;
  if (event.key === "Enter") {
    event.preventDefault();
    newUser.filter((iterateUsers) => {
      const userName = Object.keys(iterateUsers);
      const isMatched = userName.includes(enteredSearchFieldValue);
      if (isMatched) {
        eventListener(enteredSearchFieldValue);
      }
    });
  }
});
//search ended
