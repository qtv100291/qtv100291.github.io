//This section is written by using pure Javascript. 
//In this project, some pages are written by using pure Javascript and the others pages are written by using Jquery.
//I have done that just for practicing both Javascript and Jquery(a very popular library).

//Part 1 : Function for Calculating Day left
let dateShow = ['04/30/2020','05/10/2020','05/15/2020','05/23/2020'];
let secondInOneDay = 24*3600*1000;
let dateNow = new Date();
let dayleft = dateShow.map(date => Math.floor((new Date(date).getTime() - dateNow.getTime())/secondInOneDay));
for (let i = 0; i < dayleft.length; i++){
    document.querySelectorAll('.day-left-number')[i].textContent = dayleft[i];
}
