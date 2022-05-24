const newGroup = [
  {
    group1: {
      messages: [
        "nikesh : hello hi ?",
        " pratik : hajur !!",
        "sumaly : haha so funny !!",
      ],
      members: ["u1", "u2", "u3"],
    },
  },
  {
    group2: {
      messages: [
        "nikesh : wwwwwwwwwwwwww?",
        " pratik : oooooo",
        "sumaly : haha so funny !!",
      ],
      members: ["u4", "u5", "u6"],
    },
  },
  {
    group3: {
      messages: [
        "nikesh : hahahahaha",
        " pratik :okokokokokok",
        "sumaly : heheheheheh",
      ],
      members: ["u7", "u8", "u9"],
    },
  },
];
console.log(newGroup)
newGroup.filter((groups)=>{
    console.log('iterate groups',groups);
    let groupName=Object.keys(groups);
    console.log('keys',groupName);
    const isMatched = groupName.includes('group2');
    if(isMatched){
        console.log(isMatched);
        groups['group2'].messages.map((messages)=>{
            console.log(messages);
        })
        groups['group2'].members.map((members)=>{
            console.log(members)
        })
        groups['group2'].members.push('balen');
        groups['group2'].members.map((members)=>{
            console.log(members)
        })
        
    }
})
