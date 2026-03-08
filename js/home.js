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
  buttons.forEach(b => {
    b.classList.remove("btn-primary");
    b.classList.add("bg-white");
  });
  btn.classList.remove("bg-white");
  btn.classList.add("btn-primary");
};

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";

  for(const issue of issues){
    const issueDiv = document.createElement("div");

    issueDiv.innerHTML = `
      <div class="issue items-left h-[250px] border-${issue.status === "open" ? "green" : "purple"}-500 border-t-4 shadow-xl rounded-t-xl text-sm p-3 space-y-3">
        <div class="space-y-3 h-[180px]">
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

const showAllIssues = () => displayIssues(issuesData);
const showOpenIssues = () => displayIssues(issuesData.filter(i => i.status === "open"));
const showClosedIssues = () => displayIssues(issuesData.filter(i => i.status === "closed"));

document.getElementById("allButton").addEventListener("click", () => { applyBtn(document.getElementById("allButton")); showAllIssues(); });
document.getElementById("openButton").addEventListener("click", () => { applyBtn(document.getElementById("openButton")); showOpenIssues(); });
document.getElementById("closedButton").addEventListener("click", () => { applyBtn(document.getElementById("closedButton")); showClosedIssues(); });

loadIssues();
