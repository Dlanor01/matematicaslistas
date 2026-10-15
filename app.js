const upgradeDialog = document.getElementById('upgrade-dialog');
const imageDialog = document.getElementById('image-dialog');
const checkoutLinks = {
  basic: 'https://pay.hotmart.com/A108030517P?off=xx1psc87',
  complete: 'https://pay.hotmart.com/A108030517P?off=ltyulqas',
  upgrade: 'https://pay.hotmart.com/A108030517P?off=taait1eu'
};
let lastTrigger = null;

function openDialog(dialog, trigger) {
  lastTrigger = trigger || document.activeElement;
  dialog.showModal();
  document.body.classList.add('modal-open');
}

function selectOffer(offerKey) {
  if (upgradeDialog.open) upgradeDialog.close();
  window.location.assign(checkoutLinks[offerKey]);
}

document.querySelectorAll('[data-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'basic') openDialog(upgradeDialog, button);
    else if (action === 'decline') selectOffer('basic');
    else selectOffer(action);
  });
});

document.querySelectorAll('.sample-card').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('enlarged-image').src = button.dataset.image;
    document.getElementById('enlarged-image').alt = button.dataset.title;
    document.getElementById('image-title').textContent = button.dataset.title;
    openDialog(imageDialog, button);
  });
});

document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
  });
});
