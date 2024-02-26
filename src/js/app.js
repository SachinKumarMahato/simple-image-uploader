const box = document.body.querySelector('[data-id="box"]');
const themeSwitcherBtn = document.body.querySelector('[data-id="themeSwitcher"]');
const uploadFile = document.body.querySelector('[data-id="file"]');
const shareBtn = document.body.querySelector('[data-id="share-btn"]');
const pickerOpts = {
  types: [
    {
      description: "Images",
      accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

const makeHyperLink = (file) => {
  const downloadLink = document.createElement("a");
  const shareLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(file);
  downloadLink.download = file.name;
  downloadLink.innerText = "download";
  shareLink.innerText = "share";
  document.body.querySelector('[data-id="download-btn"]').appendChild(downloadLink);
  shareBtn.appendChild(shareLink);
};

const hideAndRevealElement = (e, file) => {
  const img = new Image();
  img.classList.add("user-uploaded-img");
  img.src = URL.createObjectURL(file);
  const hideIcon = e.target.parentElement.parentElement;
  hideIcon.parentElement.classList.toggle("remove-border");
  hideIcon.classList.toggle("hide");
  document.body.querySelector('[data-id="wrapper"]').appendChild(img);
  document.body.querySelector('[data-id="buttons"]').classList.toggle("reveal");
};

async function accessFile(e) {
  try {
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    console.log('file', file)
    makeHyperLink(file);
    hideAndRevealElement(e, file);
  } catch (e) {
    console.log(e);
  }
}

async function copyUrl (url) {
  try {
    await navigator.clipboard.writeText(url);
    console.log('copy successfully');
 
  } catch(e) {
    console.log(e)
  }
}
themeSwitcherBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

uploadFile.addEventListener("click", accessFile);
shareBtn.addEventListener("click", () => {
  const copyUrlLink = window.location.href;
  copyUrl(copyUrlLink)
})


box.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  console.log(event.target);
})


box.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const fileList = event.dataTransfer.files[0];
  const img = new Image();
  img.classList.add("user-uploaded-img");
  img.src = URL.createObjectURL(fileList);
  const hideBorder = document.body.querySelector('[data-id="wrapper"]');
  hideBorder.classList.add("remove-border");
  hideBorder.classList.add("hide");
  box.appendChild(img)
  document.body.querySelector('[data-id="buttons"]').classList.toggle("reveal");
  makeHyperLink(fileList)
})
