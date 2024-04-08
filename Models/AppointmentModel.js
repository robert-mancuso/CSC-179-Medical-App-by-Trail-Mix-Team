// NOT USED YET

class AppointmentModel {
  constructor(patientId, appointmentType, date, reasonForVisit, duration) {
    this.patientId = patientId;
    this.appointmentType = appointmentType;
    this.date = date;
    this.reasonForVisit = reasonForVisit;
    this.duration = duration;
  }

  // Any methods for appointment scheduling:

  // return date
  getFormattedDate() {
    // Implement date formatting later if we need it
  }
}

export default AppointmentModel;
