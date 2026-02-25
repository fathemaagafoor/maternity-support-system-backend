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
      experience_years: { description: "Years of experience" },
      age: { description: "Doctor's age" },
      shift: { description: "Working shift (morning/evening/night)" },
      about: { description: "Doctor's bio/description", type: "textarea" },
    },
    listProperties: ["name", "degree", "hospital_id", "shift", "experience_years"],
  },
};

// Caregivers - Admin can approve/reject here
export const caregiverOptions = {
  resource: Caregiver,
  options: {
    navigation: { name: "Caregivers", icon: "Users" },
    properties: {
      _id: { isVisible: false },
      // Make isApproved read-only everywhere — admin must use Approve/Reject actions
      isApproved: {
        isVisible: { list: true, show: true, edit: false, filter: true },
      },
    },
    listProperties: [
      "name",
      "phone_no",
      "shift",
      "amount",
      "experience_years",
      "availability",
      "isApproved",
      "rating",
    ],
    actions: {

      // ── One-click Approve action (record) ──
      approve: {
        actionType: "record",
        component: false,
        icon: "CheckCircle",
        label: "Approve",
        guard: "Are you sure you want to approve this caregiver?",
        // Only show on unapproved caregivers
        isVisible: true,
        isAccessible: (context) => {
          return context.record && context.record.params.isApproved === false;
        },
        handler: async (request, response, context) => {
          const { record, resource } = context;
          const params = record.params;

          // Validate required profile fields before approving
          const missing = [];
          if (!params.name) missing.push("name");
          if (!params.phone_no) missing.push("phone_no");
          if (!params.shift) missing.push("shift");
          if (!params.amount) missing.push("amount");

          if (missing.length > 0) {
            return {
              record: record.toJSON(),
              notice: {
                message: `Cannot approve: missing fields — ${missing.join(", ")}`,
                type: "error",
              },
            };
          }

          await resource.update(record.id(), { isApproved: true });
          return {
            record: record.toJSON(),
            notice: {
              message: "Caregiver approved successfully!",
              type: "success",
            },
            redirectUrl: context.h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
          };
        },
      },

      // ── One-click Reject action (record) ──
      reject: {
        actionType: "record",
        component: false,
        icon: "XCircle",
        label: "Reject",
        guard: "Are you sure you want to reject this caregiver?",
        isVisible: true,
        isAccessible: (context) => {
          return context.record && context.record.params.isApproved === true;
        },
        handler: async (request, response, context) => {
          const { record, resource } = context;
          await resource.update(record.id(), { isApproved: false });
          return {
            record: record.toJSON(),
            notice: {
              message: "Caregiver rejected.",
              type: "success",
            },
            redirectUrl: context.h.resourceUrl({
              resourceId: resource._decorated?.id() || resource.id(),
            }),
          };
        },
      },

      // ── Bulk Approve action ──
      bulkApprove: {
        actionType: "bulk",
        component: false,
        icon: "CheckCircle",
        label: "Approve Selected",
        guard:
          "Are you sure you want to approve all selected caregivers?",
        handler: async (request, response, context) => {
          const { records, resource } = context;
          await Promise.all(
            records.map((record) =>
              resource.update(record.id(), { isApproved: true })
            )
          );
          return {
            records: records.map((r) => r.toJSON()),
            notice: {
              message: `${records.length} caregiver(s) approved!`,
              type: "success",
            },
          };
        },
      },
    },
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
      location: { description: "Google Maps link (e.g., https://maps.google.com/?q=...)" },
      address: { description: "Full address of the hospital/clinic" },
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
