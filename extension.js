let totalFails = 0;
let offerInterval;

function addOffer() {
  let button = 
    document.querySelector('mds-button[icon-type="ico_add_circle"]') ||
    document.querySelector('.add-deal') ||
    document.querySelector('button[title="Add to Card"]');
  if (!button) {
    let close = document.querySelector('.flyout-close');
    if (!close) {
      totalFails++;
      if (totalFails > 30) {
        clearInterval(offerInterval);
      }
      return;
    }
    if (close) {
      close.click();
    }
  }
  button.click();
}

function startOffers() {
  if (
    !document.querySelector('#allOffersContainer') && 
    !document.querySelector('.available-deals') && 
    !(document.querySelector('#offers'))
  ) {
    return;
  }
  offerInterval = setInterval(() => {
    addOffer();
  }, 500);
  return true;
}

function attemptFunction(funcToAttempt) {
  return () => {
    let attempts = 0;
    let interval = setInterval(() => {
      if (funcToAttempt()) {
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 5) {
        clearInterval(interval);
      }
    }, 1000);
  }
}

function pageLoad() {
  setTimeout(attemptFunction(startOffers), 2000)
}

document.addEventListener('DOMContentLoaded', pageLoad());
