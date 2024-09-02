<script setup>
import {onBeforeMount, reactive} from "vue";

let userData = reactive({});

function sendMail() {
  window.location.href = "mailto:" + userData.email;
}

function phone() {
  window.location.href = "tel:" + userData.phone;
}

onBeforeMount(() => {
  // getUserData(route.params.UUID);
  prefill_data();
});

function getUserData(UUID) {
  let companyPrefix = "@testCompany.de";
  fetch(`http://localhost:8080/assignment/uuid?uuid=${UUID}`, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      userData.name = data.firstName + " " + data.sureName;
      userData.email =
        userData.name.toLowerCase().replace(" ", ".") + companyPrefix;
      userData.phone = data.telephoneNumber;
      userData.jobTitle = data.position;
      userData.location = data.clusterName;
      console.log(data);
      console.log(userData);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

function prefill_data() {
  userData.name = "Lorenz Reisacher";
  userData.email = userData.name.toLowerCase().replace(" ", ".") + "@testCompany.de";
  userData.phone = "+4917632160879";
  userData.jobTitle = "Junior Softwareentwickler";
  userData.location = "Stuttgart";
  userData.title = "";
  userData.firstName = "Lorenz";
  userData.lastName = "Reisacher";
}

function createVCFUserData() {
  // Foto einfügen
  //PHOTO;TYPE=JPEG;ENCODING=b:[${userData.photo}]

  const Logo = "../assets/logos/favicon.png";

  const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${userData.lastName};${userData.firstName};;;
FN:${userData.title ? userData.title + userData.name : userData.name}
ORG:testCompany
TITLE:${userData.jobTitle}
LOGO;TYPE=JPEG;ENCODING=b:BASE64[${Logo}]
URL:https://www.testCompany.de/
TEL;TYPE=WORK,VOICE:${userData.phone}
EMAIL;TYPE=PREF,INTERNET:${userData.email}
ADR;TYPE=WORK:;;${userData.location}
REV:${new Date().toISOString()}
END:VCARD`;
  return vcfData;
}

function downloadVCF() {
  const vcfData = createVCFUserData();
  const blob = new Blob([vcfData], {type: "text/vcard"});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${userData.name}`;
  a.click();
  window.URL.revokeObjectURL(url);
}

function transformPhoneNumber(phoneNumber) {
  let cleaned = ("" + phoneNumber).replace(/\D/g, "");
  if (cleaned.startsWith('49')) {
    cleaned = '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    cleaned = '+49' + cleaned.substring(1);
  } else if (!cleaned.startsWith('+')) {
    cleaned = '+49' + cleaned;
  }
  return cleaned.replace(/(\+49)(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4');
}
</script>








<template>
  <div class="bg-handy hidden-md-and-up">
    <div class="d-flex flex-column justify-center align-center h-100">
      <header class="scaling d-flex justify-center align-center">
        <v-row class="d-flex justify-center align-center pt-7">
          <img
            class="w-50"
            src="../assets/logos/test_logo.png"
            alt="testCompany logo"
          />
        </v-row>
      </header>

      <main class="scaling">
        <v-col>
          <v-row class="justify-center align-center ga-1 flex-column mt-10 mx-4 pa-10 bg-orange rounded-lg elevation-2">
            <p class="font-weight-bold text-h4">{{ userData.name }}</p>
            <p>{{ userData.jobTitle }}</p>
          </v-row>
          <v-row class="justify-space-between align-center mt-10 mx-4 py-5 px-10 bg-container rounded-lg elevation-2">
            <a
              href="tel:{{userData.phone}}"
              class="d-flex justify-center align-center flex-column contact"
            >
              <span class="material-symbols-outlined font"> call </span>
            </a>
            <a href="mailto:{{userData.email}}" class="contact">
              <span class="material-symbols-outlined font"> mail </span>
            </a>
<!--            TODO: Add Path to Location of Company-->
            <a
              href=""
              target="_blank"
            >
              <span class="material-symbols-outlined font"> location_on </span>
            </a>
          </v-row>
          <v-row class="justify-center ga-4 align-center mt-10 mx-4 py-5 px-10 bg-orange rounded-lg text-h4 elevation-2">
            <span @click="downloadVCF()">Kontakt speichern   </span>
            <span class="material-symbols-outlined"> person_add </span>
          </v-row>
        </v-col>
      </main>

      <footer class="scaling">
        <v-row class="justify-space-between mt-10 mx-7 py-5 px-10 bg-container rounded-lg elevation-2">
          <v-col cols="12" class="text-center">
          <span class="font-weight-bold" style="color: #7d7e81 !important"
          >Soziale Netzwerke</span>
          </v-col>
          <v-col cols="4">
<!--            TODO:Add Link-->
            <a
              href=""
              target="_blank"
            >
              <img
                class="img"
                src="../assets/socials/LinkedIn.png"
                alt="linkedIn"
              />
            </a>
          </v-col>
          <v-col cols="4">
            <!--            TODO:Add Link-->
            <a href="" target="_blank">
              <img class="img" src="../assets/socials/Xing.png" alt="xing"/>
            </a>
          </v-col>
          <v-col cols="4">
            <!--            TODO:Add Link-->
            <a href="" target="_blank">
              <img
                class="img"
                src="../assets/socials/Instagram.png"
                alt="instagram"
              />
            </a>
          </v-col>
          <v-col cols="4">
            <!--            TODO:Add Link-->
            <a
              href=""
              target="_blank"
            >
              <img class="img" src="../assets/socials/Kununu.png" alt="kununu"/>
            </a>
          </v-col>
          <v-col cols="4">
            <!--            TODO:Add Link-->
            <a href="" target="_blank">
              <img class="img" src="../assets/socials/X.png" alt="x"/>
            </a>
          </v-col>
          <v-col cols="4">
            <!--            TODO:Add Link-->
            <a href="" target="_blank">
              <img class="img" src="../assets/logos/favicon.png" alt="testCompany"/>
            </a>
          </v-col>
        </v-row>
      </footer>
    </div>
  </div>
  <div class="hidden-sm-and-down bg-desktop">
    <div class="d-flex justify-center align-center h-100">
      <v-col offset="1" cols="4" class="d-flex justify-center align-center">
        <img
          class="img-desktop"
          src="../assets/logos/test_logo.png"
          alt="testCompany_logo"
        />
      </v-col>
      <v-col class="details-container align-content-center" offset="3" cols="3">
        <div class="">
          <v-row class="my-2 font-weight-bold text-h2 default-grey">
            {{ userData.title ? userData.title + " " : "" }}{{ userData.firstName }}
          </v-row>
          <v-row class="mt-2 font-weight-bold text-h2 default-grey">
            {{ userData.lastName }}
          </v-row>
          <v-row class="default-orange text-h4 font-weight-bold">
            {{ userData.jobTitle }}
          </v-row>
        </div>
        <div class="default-grey">
          <v-row class="user-info">
            <a href="tel:{{userData.phone}}" class="default-grey text-decoration-none">
              {{ transformPhoneNumber(userData.phone) }}
            </a>
          </v-row>
          <v-row class="user-info">
            <a href="mailto:{{userData.email}}" class="text-decoration-none default-grey">
              {{ userData.email }}
            </a>
          </v-row>
          <v-row class="user-info">
<!--               TODO:add the right Path for Website-->
            <a target="_blank"
               href=""
               class="default-grey text-decoration-none">
              {{ userData.location }}
            </a>
          </v-row>
          <v-row class="user-info">
            <!--            TODO:Add Link-->
            <a class="text-decoration-none default-grey" target="_blank" href="">www.Test Company.de</a>
          </v-row>
        </div>
      </v-col>
    </div>
  </div>
</template>

<style scoped>

.font {
  font-size: 35px;
  color: #7d7e81 !important;
}

.bg-handy {
  background-image: url("../assets/grey-bg.jpg");
  /** https://unsplash.com/de/fotos/ein-schwarz-weiss-foto-einer-wand-_JBKdviweXI  kostenlose lizenz*/
  /** grey_bg.jpg von yandex aber linzenz?
  https://www.dallas.edu/wp-content/uploads/2016/11/clean-white-polygon-backgrounds-8-1.jpg*/
  height: 100vh;
  overflow-x: hidden;
}

.bg-desktop {
  background-image: linear-gradient(-65deg, rgb(104, 109, 118) 50%, rgba(255, 255, 255, 0.9) 0%, transparent 50%), url("../assets/grey_bg.jpg");
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.details-container {
  display: grid;
  grid-row-gap: 30rem;
}

.user-info {
  font-size: 20px;
  margin-bottom: 1rem;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

.img-desktop {
  width: 35rem;
}

.img {
  width: 5rem;
  height: 5rem;
  cursor: pointer;
}

.scaling {
  width: 90%;
  min-width: 330px;
  max-width: 550px;
}

.bg-orange {
  background-color: #DC5F00;
  color: #373A40!important;
}

.bg-container {
  background-color: #EEEEEE;
}

.default-orange {
  color: #DC5F00;
}

.default-grey {
  color: #EEEEEE;
}

.contact {
  font-size: 14px;
  text-decoration: none;
  color: #7d7e81;
}

</style>
