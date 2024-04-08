const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientID: { type: String, required: true },
  patientIDPicture: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  rhFactor: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  ageFormat: {
    type: String,
    required: true,
    enum: ['Years', 'Months', 'Days'],
  },
  contactInfo: {
    phoneResidence: String,
    mobilePhone: { type: String, required: true },
    emailAddress: String,
  },
  emergencyContact: [{
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    optionToSendSMS: { type: Boolean, default: false },
  }],
  healthConditions: {
    currentIllnesses: [String],
    previousIllnesses: [String],
    specificAllergies: [String],
  },
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
