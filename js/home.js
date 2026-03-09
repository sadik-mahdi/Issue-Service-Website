let issuesData = []; 
const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      issuesData = json.data;
      displayIssues(issuesData);
    });
};

const applyBtn = (btn) => {
  const buttons = document.querySelectorAll(".container-filter-btn button");
  buttons.forEach(button => {
    button.classList.remove("btn-primary");
    button.classList.add("bg-white");
  });
  btn.classList.remove("bg-white");
  btn.classList.add("btn-primary");
};

const loadIssueDetail= async(id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayIssueDetails(details.data);
}

const displayIssueDetails = (issue) => {
  console.log(issue);
  const detailsBox = document.getElementById("details_container");
  detailsBox.innerHTML = `
    <div class="w-11/12 space-y-4 ">
      <h2 class="text-2xl font-bold">${issue.title}</h2>
      <div class="flex items-center j text-left gap-3">
        <button class="bg-green-600 px-2 py-1 rounded-3xl text-xs text-white border-none ">${issue.status}</button>
        <p class="text-[#64748B] text-xs font-[12px]">Opened by ${issue.author}</p>
        <p class="text-[#64748B] text-xs font-[12px]">${issue.createdAt}</p>
      </div>
      <div>
        <button class="bg-[#FECACA] px-2 py-1 rounded-4xl text-xs font-bold"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</button>
        <button class="bg-[#FDE68A] px-2 py-1 rounded-4xl text-xs font-bold"><i class="fa-solid fa-life-ring"></i>${issue.labels[1]}</button>
      </div>
      <h3 class="text-[#64748B] text-xs">${issue.description}</h3>
      <div class="flex justify-between space-y-4">
        <h3 class="text-left flex justify-left text-black text-[16px]">Assignee: <br> <span class="font-bold ">${issue.assignee}</span></h3>
        <h3 class="text-left flex justify-left">Priority: <br> <button class="text-white px-2 py-1 bg-red-400 rounded-xl px-4" >${issue.priority}</button></h3>
      </div>
    </div>
  `;
  document.getElementById("issue_Modal").showModal();
}

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";

  for(const issue of issues){
    const issueDiv = document.createElement("div");

    issueDiv.innerHTML = `
      <div onclick="loadIssueDetail(${issue.id})" id="issue_count" class="cursor-pointer issue items-left h-[250px] border-${issue.status === "open" ? "green" : "purple"}-500 border-t-4 shadow-xl rounded-t-xl text-sm p-3 space-y-3">
        <div class="space-y-3 h-[180px] space-y-3">
          <div class="flex justify-between">
            <button><img src="${issue.status === "open" ? `./assets/Open-Status.png` :`./assets/Closed-Status.png`}" alt=""></button>
            <p class="bg-[#FECACA] w-3/10 rounded-xl text-center">${issue.priority}</p>
          </div>
          <h2 class="font-semibold text-3.5">${issue.title}</h2>
          <p class="text-xs text-[#64748B]">${issue.description}</p>
          <div class="flex items-left gap-3 text-xs">
            <p class="bg-[#FECACA] p-1 rounded-xl text-left"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</p>
            <p class="bg-[#FDE68A]  p-1 rounded-xl text-left"><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</p>
          </div>
        </div>
        <div class="border-t-1 border-gray-500">
          <p class="text-xs text-[#64748B]">${issue.author}</p>
          <p class="text-xs text-[#64748B]">${issue.createdAt}</p>
        </div>
      </div>
    `;
  issuesContainer.append(issueDiv);  
  };
};

const showAllIssues = () => {
  displayIssues(issuesData)
  const totalIssues = document.getElementById("totalIssues");
  totalIssues.innerText = "50";
};
const showOpenIssues = () =>{
  displayIssues(issuesData.filter(i => i.status === "open"));
  const totalIssues = document.getElementById("totalIssues");
  totalIssues.innerText = "44";
}
const showClosedIssues = () => {
  displayIssues(issuesData.filter(i => i.status === "closed"));
  const totalIssues = document.getElementById("totalIssues");
  totalIssues.innerText = "6";
}

document.getElementById("allButton").addEventListener("click", () => { 
  applyBtn(document.getElementById("allButton")); 
  showAllIssues();
});
document.getElementById("openButton").addEventListener("click", () => { 
  applyBtn(document.getElementById("openButton")); 
  showOpenIssues(); 
});
document.getElementById("closedButton").addEventListener("click", () => { 
  applyBtn(document.getElementById("closedButton")); 
  showClosedIssues(); 
});

loadIssues();

document.getElementById("btn-search").addEventListener("click", () => {
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      const allIssues = data.data;
      console.log(allIssues);
      displayIssues(allIssues);
    });
})