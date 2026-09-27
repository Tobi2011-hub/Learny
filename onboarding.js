// Learny onboarding logic - ES6
const countries = [
"Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
"Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
"Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
"Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
"Côte d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic","Democratic Republic of the Congo","Denmark","Djibouti",
"Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
"Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala",
"Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
"Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia",
"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
"Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco",
"Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand",
"Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine",
"Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
"Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe",
"Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
"Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland",
"Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia",
"Türkiye","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States",
"Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

const profile = getProfile();

const countrySelect = document.querySelector("#country");
if (countrySelect) {
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });
  if (profile.country) countrySelect.value = profile.country;
}

const nameInput = document.querySelector("#firstName");
if (nameInput && profile.firstName) nameInput.value = profile.firstName;

const levelSelect = document.querySelector("#level");
if (levelSelect && profile.level) levelSelect.value = profile.level;

// Step 1: save first name.
document.querySelector("#step1Form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const error = document.querySelector("#nameError");

  if (!name) {
    error.classList.remove("hidden");
    nameInput.focus();
    return;
  }

  error.classList.add("hidden");
  saveProfile({ firstName: name });
  goTo("onboarding-step-2.html");
});

// Step 2: save level, subjects and country.
document.querySelector("#step2Form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const level = levelSelect.value;
  const selectedSubjects = [...document.querySelectorAll('input[name="subjects"]:checked')]
    .map((input) => input.value);
  const country = countrySelect.value;
  const error = document.querySelector("#step2Error");

  if (!level || !selectedSubjects.length || !country) {
    error.classList.remove("hidden");
    return;
  }

  error.classList.add("hidden");
  saveProfile({ level, subjects: selectedSubjects, country });
  goTo("onboarding-step-3.html");
});

// Restore selected chips on revisit.
if (profile.subjects) {
  profile.subjects.forEach((subject) => {
    const input = document.querySelector(`input[name="subjects"][value="${CSS.escape(subject)}"]`);
    if (input) input.checked = true;
  });
}

// Step 3: save goal and study duration.
document.querySelector("#step3Form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const goal = document.querySelector('input[name="goal"]:checked')?.value;
  const studyTime = document.querySelector('input[name="studyTime"]:checked')?.value;
  const error = document.querySelector("#step3Error");

  if (!goal || !studyTime) {
    error.classList.remove("hidden");
    return;
  }

  error.classList.add("hidden");
  saveProfile({ goal, studyTime, onboardingComplete: true });
  goTo("onboarding-complete.html");
});

// Restore selected Step 3 cards.
["goal", "studyTime"].forEach((group) => {
  const selected = profile[group];
  if (!selected) return;
  const input = document.querySelector(`input[name="${group}"][value="${CSS.escape(selected)}"]`);
  if (input) input.checked = true;
});
