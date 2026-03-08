const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then((res) => res.json())
  .then((json) => displayIssues(json.data));
};

const displayIssues = (issues) => {
  const issuesContainer = document.getElementById("issues-container");
  issuesContainer.innerHTML = "";

  for(const issue of issues){
    const issueDiv = document.createElement("div");

    const closedImage = `./assets/Closed-Status.png`;
    const openImage = `./assets/Open-Status.png`;

    issueDiv.innerHTML = `
      <div class="issue items-left h-[250px] border-black-300 border-t-4 shadow-xl rounded-t-xl text-sm p-3 space-y-3">
            <div class="space-y-3 h-[180px]">
              <div class="flex justify-between">
              <button><img src="${issue.status === 'open' ? openImage : closedImage}" alt=""></button>
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
              <p class="text-xs text-[#64748B]">#1by john_doe</p>
              <p class="text-xs text-[#64748B]"> 1/15/2024</p>
            </div>
        </div>
    `;
  issuesContainer.append(issueDiv);  
  }
}

// document.getElementById("allButton").addEventListener("click", () => {
//   const issueNumbers = 
// })

loadIssues();
