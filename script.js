(function () {
  const progressFg = document.getElementById('progressFg');
  const progressWrapper = document.getElementById('progressWrapper');

  const valueInput = document.getElementById('valueInput');
  const animateToggle = document.getElementById('animateToggle');
  const hideToggle = document.getElementById('hideToggle');

  const MIN_VALUE = 0;
  const MAX_VALUE = 100;
  const RADIUS = 54;
  const circumference = 2 * Math.PI * RADIUS;

  progressFg.style.strokeDasharray = circumference;
  progressFg.style.strokeDashoffset = circumference;

  let currentValue = MIN_VALUE;
  let isAnimated = false;
  let isHidden = false;

  function updateProgress(value) {
    const clamped = Math.min(MAX_VALUE, Math.max(MIN_VALUE, Number(value) || MIN_VALUE));
    currentValue = clamped;
    const offset = circumference - (clamped / MAX_VALUE) * circumference;
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
    const val = parseInt(this.value, 10);
    if (isNaN(val)) {
      updateProgress(MIN_VALUE);
      return;
    }
    updateProgress(Math.min(MAX_VALUE, Math.max(MIN_VALUE, val)));
  });

  animateToggle.addEventListener('change', function () {
    isAnimated = this.checked;
    updateStates();
  });

  hideToggle.addEventListener('change', function () {
    isHidden = this.checked;
    updateStates();
  });

  updateProgress(MIN_VALUE);
  updateStates();

})();