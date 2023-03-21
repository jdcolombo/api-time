
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.phone')) {
    let currentDate;
    const startTime = (9 * 60 * 60 + 30 * 60) * 1000;
    const endTime = 19 * 60 * 60 * 1000;
    let data = document.querySelectorAll('[data-phone]');

    fetch('https://worldtimeapi.org/api/timezone/Europe/Madrid')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          currentDate = data;
        }
      });

    setTimeout(() => {
      if (currentDate != undefined) {
        apiCurrentDate();
      } else {
        userCurrentDate();
      }
    }, 1000);

    function apiCurrentDate() {
      let date = new Date(currentDate.unixtime * 1000);
      let hours = date.getHours();
      let minutes = '0' + date.getMinutes();
      let currentTime = (hours * 60 * 60 + minutes * 60) * 1000;

      if (currentTime >= startTime && currentTime <= endTime && currentDate.day_of_week != (6 || 7)) {
        data.forEach((element) => {
          element.dataset.phoneCallcenter = 'online';
        });
      } else {
        data.forEach((element) => {
          element.dataset.phoneCallcenter = 'offline';
        });
      }
    }

    function userCurrentDate() {
      let currentDate = new Date();
      let currentTime = (currentDate.getHours() * 60 * 60 + currentDate.getMinutes() * 60) * 1000;
      let currentDay = currentDate.getDay();

      if (currentTime >= startTime && currentTime <= endTime && currentDay != (6 || 7)) {
        data.forEach((element) => {
          element.dataset.phoneCallcenter = 'online';
        });
      } else {
        data.forEach((element) => {
          element.dataset.phoneCallcenter = 'offline';
        });
      }
    }
  }
});
