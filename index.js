const inputField = document.getElementById("inputField");
const sendImageButton = document.getElementById("sendImageButton");
const mainMessageList = document.getElementById("message");
const mainListForNewUser = document.getElementById("new-user");
const mainListForNewGroups = document.getElementById("new-group");
const mainListForGroupMembers = document.getElementById("group-members-id");
const createdUsers = document.getElementById("users");
const generateUserList = document.getElementById("user-List");
console.log(inputField, sendImageButton);
const newGroups = [];
//for creation of user
const newUser = [];
const dynamicElement = [];
let inputValueOfNewUser;
const buttonElement = document.getElementById("create-user-button");
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
  console.log("testing user", newUser);

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
  console.log(dynamicElement);
  for (item of dynamicElement) {
    eventListener(item);
  }
}
buttonElement.addEventListener("click", creationNewUserHandler);

//new user creation completed
let selectedUser;
function eventListener(element) {
  element.addEventListener("click", () => {
    selectedUser = element.textContent;
  });
}
//ended

//for validation of empty message
const REQUIRED = "REQUIRED";
function validate(value, flag) {
  if (flag === REQUIRED) {
    return value.trim().length;
  }
}
//for validation completed

//send image button is clicked and mesages are rendered in page by creating elements.
function sendMessageFunction() {
  if (!validate(`${inputField.value}`, REQUIRED)) {
    alert("please type some message in message box below");
  } else {
    if (!selectedUser) {
      alert(
        "please select any user from the sidebar to send message from their name in group,so that other user may know the sender"
      );
      inputField.value = "";
    }
      const newMessageElement = document.createElement("li");
      newMessageElement.innerHTML = `${selectedUser}: ${inputField.value.replace(
        /<[^>]+>/g,
        ""
      )}`;
      newMessageElement.className = "message-item item-primary";
      // newMessageElement.style.justifyContent="between";
      newMessageElement.style.overflow = "break-word";
      mainMessageList.appendChild(newMessageElement);
      inputField.value = "";
    }
}
sendImageButton.addEventListener("click", () => {
  sendMessageFunction();
});
//send button ended

//group-portion-started
function generateUserLIstHandler() {
  newUser.forEach((userOption) => {
    console.log("arrayofusers", userOption);
    const options = document.createElement("option");
    options.innerHTML = `
    <option value="${userOption}Id">${userOption}</option>

    `;
    createdUsers.appendChild(options);
    // "usersForGroup('${inputValueOfNewGroup}')"
  });
}
let inputValueOfNewGroup;
let enteredGroupName;
const groupNameElement = document.getElementById("group-name");
groupNameElement.addEventListener("keypress", function (event) {
  enteredGroupName = groupNameElement.value;
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(enteredGroupName);
    alert(`Entered Group Name is : ${enteredGroupName}`);
  }

  mainListForGroupMembers.innerHTML = ``;
});
function selectionOfUsersToAddInGroup() {
  let usersSelected = document.getElementById("users").value;
  console.log(newGroups, "testingphase");
  newGroups.filter((iterateGroups) => {
    console.log("iterate groups", iterateGroups);
    let groupName = Object.keys(iterateGroups);
    console.log("keys", groupName);
    const isMatched = groupName.includes(enteredGroupName);
    if (isMatched) {
      console.log("matched", iterateGroups[enteredGroupName]);
      iterateGroups[enteredGroupName].push(usersSelected);
      alert(`user ${usersSelected} is added`);
      console.log("you selected", usersSelected);
    }
  });
}
generateUserList.addEventListener("click", generateUserLIstHandler);
//for creation of Group
const buttonElementGroup = document.getElementById("create-group-button");
function creationNewGroupHandler() {
  inputValueOfNewGroup = groupNameElement.value;
  console.log(inputValueOfNewGroup);
  //putting new groups in to array
  const groupObj = {
    [inputValueOfNewGroup]: [],
  };
  console.log("group obeject", groupObj);
  newGroups.push(groupObj);
  console.log("groups name", newGroups); //cleared
  console.log("testing Group", newGroups);

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
buttonElementGroup.addEventListener("click", creationNewGroupHandler);

function eventListenerForGroupMembers(groupElement) {
  document.getElementById(
    "mainHeader"
  ).innerText = `${groupElement} Group-Chat`;

  mainListForGroupMembers.innerHTML = ``;
  console.log("item", groupElement);
  newGroups.forEach((singleGroup) => {
    const singleroupMembers = Object.keys(singleGroup); //list of keys of group
    if (singleroupMembers.includes(groupElement)) {
      console.log("User fround ", singleGroup[groupElement]);
      singleGroup[groupElement].forEach((members) => {
        console.log(members);
        const groupMemberElement = document.createElement("li");
        groupMemberElement.innerHTML = `
    <a href="#">
     <img
       src="https://www.w3schools.com/howto/img_avatar.png"
       alt="avatar"
       class="avatar"
     />
     <span id="${members}Id" class="name" onclick="userSelectionToDispayName(this.id)">${members}</span>
     </a>`;
        mainListForGroupMembers.appendChild(groupMemberElement);
      });
    }
  });
}

function userSelectionToDispayName(id) {
  const element = document.getElementById(`${id}`);
  selectedUser = element.textContent;
}
