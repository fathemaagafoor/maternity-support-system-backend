import mongoose from 'mongoose';
import 'dotenv/config';

// Import all models
import Article from './src/models/Article.js';
import Appointment from './src/models/Appointment.js';
import Auth from './src/models/Auth.js';
import Baby from './src/models/Baby.js';
import Caregiver from './src/models/Caregiver.js';
import CaregiverBooking from './src/models/CaregiverBooking.js';
import Doctor from './src/models/Doctor.js';
import Hospital from './src/models/Hospital.js';
import Mother from './src/models/Mother.js';
import Vaccine from './src/models/Vaccine.js';

const clearDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/maternity-support');
        console.log('✅ Connected to MongoDB');

        // Clear all collections
        console.log('\n🗑️  Clearing all collections...\n');

        const results = await Promise.all([
            Article.deleteMany({}).then(r => ({ name: 'Articles', count: r.deletedCount })),
            Appointment.deleteMany({}).then(r => ({ name: 'Appointments', count: r.deletedCount })),
            Auth.deleteMany({}).then(r => ({ name: 'Auth', count: r.deletedCount })),
            Baby.deleteMany({}).then(r => ({ name: 'Babies', count: r.deletedCount })),
            Caregiver.deleteMany({}).then(r => ({ name: 'Caregivers', count: r.deletedCount })),
            CaregiverBooking.deleteMany({}).then(r => ({ name: 'CaregiverBookings', count: r.deletedCount })),
            Doctor.deleteMany({}).then(r => ({ name: 'Doctors', count: r.deletedCount })),
            Hospital.deleteMany({}).then(r => ({ name: 'Hospitals', count: r.deletedCount })),
            Mother.deleteMany({}).then(r => ({ name: 'Mothers', count: r.deletedCount })),
            Vaccine.deleteMany({}).then(r => ({ name: 'Vaccines', count: r.deletedCount })),
        ]);

        // Display results
        results.forEach(({ name, count }) => {
            console.log(`   ✓ ${name}: ${count} documents deleted`);
        });

        const totalDeleted = results.reduce((sum, { count }) => sum + count, 0);
        console.log(`\n✅ Database cleared successfully! Total documents deleted: ${totalDeleted}`);

        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing database:', error);
        await mongoose.disconnect();
        process.exit(1);
    }
};

clearDatabase();
