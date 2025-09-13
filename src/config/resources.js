import Appointment from "../models/Appointment.js";
import Auth from "../models/Auth.js";
import Baby from "../models/Baby.js";
import Caregiver from "../models/Caregiver.js";
import caregiverBooking from "../models/caregiverBooking.js";
import Doctor from "../models/Doctor.js";
import Hospital from "../models/Hospital.js";
import Mother from "../models/Mother.js";
import Vaccine from "../models/Vaccine.js";

export const userOptions = {
    resource: Auth,
    options: {
        properties: {
            password: { isVisible: false }, // Hide password field
            email: { isTitle: true },       // Use email as title field
        },
        actions: {
            new: {
                isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin',
            }
        }
    }
}

export const doctorOptions = {
    resource: Doctor,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field
        },

    }
}
export const caregiverOptions = {
    resource: Caregiver,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field
            password: { isVisible: false },

        },

    }
}
export const caregiverBookingOptions = {
    resource: caregiverBooking,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field,
        },

    }
}

export const motherOptions = {
    resource: Mother,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field,
        },

    }
}

export const appointmentOptions = {
    resource: Appointment,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field,
        },

    }
}
export const babyOptions = {
    resource: Baby,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field,
        },

    }
}
export const vaccineOptions = {
    resource: Vaccine,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field,
        },

    }
}
export const hospitalOptions = {
    resource: Hospital,
    options: {
        properties: {
            _id: { isVisible: false }, // Hide password field,
        },

    }
}




