import Appointment from "../models/Appointment.js";
import Auth from "../models/Auth.js";
import Baby from "../models/Baby.js";
import Caregiver from "../models/Caregiver.js";
import CaregiverBooking from "../models/CaregiverBooking.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import Mother from "../models/Mother.js";
import Vaccine from "../models/Vaccine.js";
import Article from "../models/Article.js";

// Users (Auth) - for admin to see all users
export const userOptions = {
  resource: Auth,
  options: {
    navigation: { name: "Users", icon: "User" },
    properties: {
      _id: { isVisible: false },
      password: { isVisible: false },
    },
  },
};

// Doctors
export const doctorOptions = {
  resource: Doctor,
  options: {
    navigation: { name: "Medical", icon: "Activity" },
    properties: {
      _id: { isVisible: false },
    },
  },
};

// Caregivers - Admin can approve/reject here
export const caregiverOptions = {
  resource: Caregiver,
  options: {
    navigation: { name: "Caregivers", icon: "Users" },
    properties: {
      _id: { isVisible: false },
    },
    // Make isApproved easy to toggle
    listProperties: [
      "name",
      "phone_no",
      "shift",
      "amount",
      "isApproved",
      "rating",
    ],
  },
};

// Caregiver Bookings
export const caregiverBookingOptions = {
  resource: CaregiverBooking,
  options: {
    navigation: { name: "Bookings", icon: "Calendar" },
    properties: {
      _id: { isVisible: false },
    },
    listProperties: ["mother", "caregiver", "start_date", "end_date", "status"],
  },
};

// Mothers
export const motherOptions = {
  resource: Mother,
  options: {
    navigation: { name: "Users", icon: "User" },
    properties: {
      _id: { isVisible: false },
    },
    listProperties: ["name", "phone_no", "is_pregnant", "age"],
  },
};

// Appointments
export const appointmentOptions = {
  resource: Appointment,
  options: {
    navigation: { name: "Medical", icon: "Activity" },
    properties: {
      _id: { isVisible: false },
    },
  },
};

// Babies
export const babyOptions = {
  resource: Baby,
  options: {
    navigation: { name: "Users", icon: "User" },
    properties: {
      _id: { isVisible: false },
      // Hide the large tracking arrays from list view
      feeding_logs: { isVisible: { list: false, edit: false, show: true } },
      sleep_logs: { isVisible: { list: false, edit: false, show: true } },
      diaper_logs: { isVisible: { list: false, edit: false, show: true } },
      vaccinations: { isVisible: { list: false, edit: false, show: true } },
    },
    listProperties: ["name", "gender", "birth_date", "mother_id"],
  },
};

// Vaccines
export const vaccineOptions = {
  resource: Vaccine,
  options: {
    navigation: { name: "Medical", icon: "Activity" },
    properties: {
      _id: { isVisible: false },
    },
  },
};

// Hospitals
export const hospitalOptions = {
  resource: Hospital,
  options: {
    navigation: { name: "Medical", icon: "Activity" },
    properties: {
      _id: { isVisible: false },
    },
  },
};

// Articles - for Discover tab content
export const articleOptions = {
  resource: Article,
  options: {
    navigation: { name: "Content", icon: "FileText" },
    properties: {
      _id: { isVisible: false },
      content: { type: "richtext" }, // Rich text editor for content
    },
    listProperties: [
      "title",
      "category",
      "for_stage",
      "is_published",
      "createdAt",
    ],
  },
};
