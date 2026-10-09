let getMinutes = (time) => {
  let parts = time.split(':');
  let hours = Number(parts[0]);
  let minutes = Number(parts[1]);

  return hours * 60 + minutes;
};

let isMeetingInWorkDay = (workStart, workEnd, meetingStart, duration) => {
  let workStartMinutes = getMinutes(workStart);
  let workEndMinutes = getMinutes(workEnd);
  let meetingStartMinutes = getMinutes(meetingStart);
  let meetingEndMinutes = meetingStartMinutes + duration;

  if (meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes) {
    return true;
  } else {
    return false;
  }
};

console.log(isMeetingInWorkDay('08:00', '17:30', '14:00', 90));
console.log(isMeetingInWorkDay('08:00', '10:00', '08:00', 120));
console.log(isMeetingInWorkDay('08:00', '14:30', '14:00', 90));
console.log(isMeetingInWorkDay('14:00', '17:30', '08:00', 90));
console.log(isMeetingInWorkDay('08:00', '17:30', '08:00', 900));
