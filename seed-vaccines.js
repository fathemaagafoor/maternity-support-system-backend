// Seed script for Indian vaccines based on National Immunization Schedule (NIS)
import mongoose from 'mongoose';
import 'dotenv/config';
import Vaccine from './src/models/Vaccine.js';

const indianVaccines = [
    // At Birth
    {
        name: "BCG",
        description: "Bacillus Calmette-Guérin vaccine protects against tuberculosis, especially severe forms in children like TB meningitis and miliary TB.",
        intake_type: "injection",
        recommended_age: "At Birth",
        number_of_doses: 1,
        disease_protection: ["Tuberculosis", "TB Meningitis"],
        order: 1
    },
    {
        name: "OPV-0",
        description: "Oral Polio Vaccine - Birth dose to protect against poliomyelitis, a highly infectious disease that can cause paralysis.",
        intake_type: "oral",
        recommended_age: "At Birth",
        number_of_doses: 1,
        disease_protection: ["Poliomyelitis"],
        order: 2
    },
    {
        name: "Hepatitis B - Birth Dose",
        description: "First dose of Hepatitis B vaccine to prevent liver infection. Should be given within 24 hours of birth.",
        intake_type: "injection",
        recommended_age: "At Birth",
        number_of_doses: 1,
        disease_protection: ["Hepatitis B"],
        order: 3
    },

    // 6 Weeks
    {
        name: "OPV-1",
        description: "First primary dose of Oral Polio Vaccine for continued protection against polio.",
        intake_type: "oral",
        recommended_age: "6 Weeks",
        number_of_doses: 1,
        disease_protection: ["Poliomyelitis"],
        order: 4
    },
    {
        name: "Pentavalent-1",
        description: "Combined vaccine protecting against five diseases: Diphtheria, Pertussis, Tetanus, Hepatitis B, and Haemophilus influenzae type b.",
        intake_type: "injection",
        recommended_age: "6 Weeks",
        number_of_doses: 3,
        disease_protection: ["Diphtheria", "Pertussis", "Tetanus", "Hepatitis B", "Hib Meningitis"],
        order: 5
    },
    {
        name: "Rotavirus-1",
        description: "First dose of Rotavirus vaccine to prevent severe diarrhea caused by rotavirus infection in infants.",
        intake_type: "oral",
        recommended_age: "6 Weeks",
        number_of_doses: 3,
        disease_protection: ["Rotavirus Diarrhea"],
        order: 6
    },
    {
        name: "IPV-1",
        description: "Inactivated Polio Vaccine provides additional protection against polio through injection.",
        intake_type: "injection",
        recommended_age: "6 Weeks",
        number_of_doses: 2,
        disease_protection: ["Poliomyelitis"],
        order: 7
    },
    {
        name: "PCV-1",
        description: "Pneumococcal Conjugate Vaccine protects against pneumococcal diseases like pneumonia, meningitis, and ear infections.",
        intake_type: "injection",
        recommended_age: "6 Weeks",
        number_of_doses: 3,
        disease_protection: ["Pneumonia", "Meningitis", "Ear Infections"],
        order: 8
    },

    // 10 Weeks
    {
        name: "OPV-2",
        description: "Second primary dose of Oral Polio Vaccine.",
        intake_type: "oral",
        recommended_age: "10 Weeks",
        number_of_doses: 1,
        disease_protection: ["Poliomyelitis"],
        order: 9
    },
    {
        name: "Pentavalent-2",
        description: "Second dose of the combined vaccine for Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.",
        intake_type: "injection",
        recommended_age: "10 Weeks",
        number_of_doses: 3,
        disease_protection: ["Diphtheria", "Pertussis", "Tetanus", "Hepatitis B", "Hib Meningitis"],
        order: 10
    },
    {
        name: "Rotavirus-2",
        description: "Second dose of Rotavirus vaccine.",
        intake_type: "oral",
        recommended_age: "10 Weeks",
        number_of_doses: 3,
        disease_protection: ["Rotavirus Diarrhea"],
        order: 11
    },

    // 14 Weeks
    {
        name: "OPV-3",
        description: "Third primary dose of Oral Polio Vaccine.",
        intake_type: "oral",
        recommended_age: "14 Weeks",
        number_of_doses: 1,
        disease_protection: ["Poliomyelitis"],
        order: 12
    },
    {
        name: "Pentavalent-3",
        description: "Third dose of the combined vaccine for Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.",
        intake_type: "injection",
        recommended_age: "14 Weeks",
        number_of_doses: 3,
        disease_protection: ["Diphtheria", "Pertussis", "Tetanus", "Hepatitis B", "Hib Meningitis"],
        order: 13
    },
    {
        name: "Rotavirus-3",
        description: "Third dose of Rotavirus vaccine.",
        intake_type: "oral",
        recommended_age: "14 Weeks",
        number_of_doses: 3,
        disease_protection: ["Rotavirus Diarrhea"],
        order: 14
    },
    {
        name: "IPV-2",
        description: "Second dose of Inactivated Polio Vaccine.",
        intake_type: "injection",
        recommended_age: "14 Weeks",
        number_of_doses: 2,
        disease_protection: ["Poliomyelitis"],
        order: 15
    },
    {
        name: "PCV-2",
        description: "Second dose of Pneumococcal Conjugate Vaccine.",
        intake_type: "injection",
        recommended_age: "14 Weeks",
        number_of_doses: 3,
        disease_protection: ["Pneumonia", "Meningitis", "Ear Infections"],
        order: 16
    },

    // 9 Months
    {
        name: "MR-1 (Measles-Rubella)",
        description: "First dose of Measles-Rubella vaccine. Protects against measles (highly contagious viral disease) and rubella (German measles).",
        intake_type: "injection",
        recommended_age: "9 Months",
        number_of_doses: 2,
        disease_protection: ["Measles", "Rubella"],
        order: 17
    },
    {
        name: "PCV Booster",
        description: "Booster dose of Pneumococcal Conjugate Vaccine for enhanced protection.",
        intake_type: "injection",
        recommended_age: "9 Months",
        number_of_doses: 1,
        disease_protection: ["Pneumonia", "Meningitis", "Ear Infections"],
        order: 18
    },
    {
        name: "Vitamin A - 1st Dose",
        description: "First dose of Vitamin A supplementation to prevent vitamin A deficiency and boost immunity.",
        intake_type: "oral",
        recommended_age: "9 Months",
        number_of_doses: 9,
        disease_protection: ["Vitamin A Deficiency", "Night Blindness"],
        order: 19
    },

    // 12 Months
    {
        name: "Hepatitis A",
        description: "Hepatitis A vaccine protects against liver infection caused by Hepatitis A virus.",
        intake_type: "injection",
        recommended_age: "12 Months",
        number_of_doses: 2,
        disease_protection: ["Hepatitis A"],
        order: 20
    },

    // 15 Months
    {
        name: "MMR",
        description: "Measles, Mumps, Rubella vaccine provides combined protection against three viral diseases.",
        intake_type: "injection",
        recommended_age: "15 Months",
        number_of_doses: 2,
        disease_protection: ["Measles", "Mumps", "Rubella"],
        order: 21
    },
    {
        name: "Varicella (Chickenpox)",
        description: "Varicella vaccine protects against chickenpox, a highly contagious disease causing itchy rash and fever.",
        intake_type: "injection",
        recommended_age: "15 Months",
        number_of_doses: 2,
        disease_protection: ["Chickenpox", "Shingles"],
        order: 22
    },

    // 16-18 Months
    {
        name: "DTP Booster-1",
        description: "First booster dose of Diphtheria, Tetanus, and Pertussis vaccine.",
        intake_type: "injection",
        recommended_age: "16-18 Months",
        number_of_doses: 1,
        disease_protection: ["Diphtheria", "Tetanus", "Pertussis"],
        order: 23
    },
    {
        name: "MR-2 (Measles-Rubella)",
        description: "Second dose of Measles-Rubella vaccine for enhanced immunity.",
        intake_type: "injection",
        recommended_age: "16-18 Months",
        number_of_doses: 2,
        disease_protection: ["Measles", "Rubella"],
        order: 24
    },
    {
        name: "OPV Booster",
        description: "Booster dose of Oral Polio Vaccine.",
        intake_type: "oral",
        recommended_age: "16-18 Months",
        number_of_doses: 1,
        disease_protection: ["Poliomyelitis"],
        order: 25
    },
    {
        name: "Hib Booster",
        description: "Booster dose of Haemophilus influenzae type b vaccine.",
        intake_type: "injection",
        recommended_age: "16-18 Months",
        number_of_doses: 1,
        disease_protection: ["Hib Meningitis", "Pneumonia", "Epiglottitis"],
        order: 26
    },

    // 18 Months
    {
        name: "Hepatitis A - 2nd Dose",
        description: "Second dose of Hepatitis A vaccine for long-term protection.",
        intake_type: "injection",
        recommended_age: "18 Months",
        number_of_doses: 2,
        disease_protection: ["Hepatitis A"],
        order: 27
    },

    // 4-6 Years
    {
        name: "DTP Booster-2",
        description: "Second booster dose of Diphtheria, Tetanus, and Pertussis vaccine before school entry.",
        intake_type: "injection",
        recommended_age: "4-6 Years",
        number_of_doses: 1,
        disease_protection: ["Diphtheria", "Tetanus", "Pertussis"],
        order: 28
    },
    {
        name: "OPV Booster-2",
        description: "Second booster of Oral Polio Vaccine.",
        intake_type: "oral",
        recommended_age: "4-6 Years",
        number_of_doses: 1,
        disease_protection: ["Poliomyelitis"],
        order: 29
    },
    {
        name: "MMR-2",
        description: "Second dose of Measles, Mumps, Rubella vaccine for school-age children.",
        intake_type: "injection",
        recommended_age: "4-6 Years",
        number_of_doses: 2,
        disease_protection: ["Measles", "Mumps", "Rubella"],
        order: 30
    },
    {
        name: "Varicella - 2nd Dose",
        description: "Second dose of chickenpox vaccine for enhanced protection.",
        intake_type: "injection",
        recommended_age: "4-6 Years",
        number_of_doses: 2,
        disease_protection: ["Chickenpox", "Shingles"],
        order: 31
    },

    // 10-12 Years
    {
        name: "Tdap (Tetanus-Diphtheria-Pertussis)",
        description: "Adolescent booster for Tetanus, Diphtheria, and Pertussis.",
        intake_type: "injection",
        recommended_age: "10-12 Years",
        number_of_doses: 1,
        disease_protection: ["Tetanus", "Diphtheria", "Pertussis"],
        order: 32
    },
    {
        name: "HPV (Human Papillomavirus)",
        description: "HPV vaccine protects against cervical cancer and other HPV-related cancers. Recommended for girls aged 9-14 years.",
        intake_type: "injection",
        recommended_age: "9-14 Years",
        number_of_doses: 2,
        disease_protection: ["Cervical Cancer", "HPV-related Cancers", "Genital Warts"],
        order: 33
    },

    // Optional but recommended
    {
        name: "Typhoid Conjugate Vaccine",
        description: "Protects against typhoid fever, a bacterial infection common in areas with poor sanitation.",
        intake_type: "injection",
        recommended_age: "6-9 Months",
        number_of_doses: 1,
        disease_protection: ["Typhoid Fever"],
        order: 34
    },
    {
        name: "Influenza (Flu)",
        description: "Annual flu vaccine recommended especially for young children to prevent seasonal influenza.",
        intake_type: "injection",
        recommended_age: "6 Months & Annually",
        number_of_doses: 1,
        disease_protection: ["Influenza", "Flu Complications"],
        order: 35
    },
    {
        name: "Japanese Encephalitis",
        description: "Protects against Japanese Encephalitis, a mosquito-borne viral brain infection. Recommended in endemic areas.",
        intake_type: "injection",
        recommended_age: "9-12 Months",
        number_of_doses: 2,
        disease_protection: ["Japanese Encephalitis"],
        order: 36
    }
];

async function seedVaccines() {
    try {
        // Connect to MongoDB
        const mongoUri = process.env.MONGO_URL;
        if (!mongoUri) {
            console.error('❌ MONGO_URL not found in environment variables');
            process.exit(1);
        }
        await mongoose.connect(mongoUri);
        console.log('✅ Connected to MongoDB');

        // Clear existing vaccines
        const deleteResult = await Vaccine.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing vaccines`);

        // Insert new vaccines
        const insertResult = await Vaccine.insertMany(indianVaccines);
        console.log(`💉 Successfully seeded ${insertResult.length} Indian vaccines!`);

        // Display summary
        console.log('\n📋 Vaccine Summary by Age:');
        const ageGroups = {};
        indianVaccines.forEach(v => {
            if (!ageGroups[v.recommended_age]) {
                ageGroups[v.recommended_age] = [];
            }
            ageGroups[v.recommended_age].push(v.name);
        });

        Object.entries(ageGroups).forEach(([age, vaccines]) => {
            console.log(`   ${age}: ${vaccines.join(', ')}`);
        });

        console.log('\n✨ Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding vaccines:', error);
        process.exit(1);
    }
}

seedVaccines();
