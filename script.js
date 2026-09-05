(function () {
  const progressFg = document.getElementById('progressFg');
  const progressWrapper = document.getElementById('progressWrapper');

  const valueInput = document.getElementById('valueInput');
  const animateToggle = document.getElementById('animateToggle');
  const hideToggle = document.getElementById('hideToggle');

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  progressFg.style.strokeDasharray = circumference;
  progressFg.style.strokeDashoffset = circumference;

  let currentValue = 0;
  let isAnimated = false;
  let isHidden = false;

  function updateProgress(value) {
    const clamped = Math.min(100, Math.max(0, Number(value) || 0));
    currentValue = clamped;
    const offset = circumference - (clamped / 100) * circumference;
    progressFg.style.strokeDashoffset = offset;
    if (valueInput.value !== String(clamped)) {
      valueInput.value = clamped;
    }
  }

  function updateStates() {
    if (isAnimated) {
      progressWrapper.classList.add('animated');
    } else {
      progressWrapper.classList.remove('animated');
    }

    if (isHidden) {
      progressWrapper.classList.add('hidden');
    } else {
      progressWrapper.classList.remove('hidden');
    }
  }

  valueInput.addEventListener('input', function () {
    let val = parseInt(this.value, 10);
    if (isNaN(val)) val = 0;
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    updateProgress(val);
  });

  animateToggle.addEventListener('change', function () {
    isAnimated = this.checked;
    updateStates();
  });

  hideToggle.addEventListener('change', function () {
    isHidden = this.checked;
    updateStates();
  });

  updateProgress(0);
  updateStates();

})();