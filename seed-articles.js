// import Article from './models/Article.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import Article from './src/models/Article.js';
import { configDotenv } from 'dotenv';

const comprehensiveArticles = [
    // MEAL PLANS
    {
        title: "First Trimester Meal Plan: Combating Morning Sickness",
        content: `Morning sickness can make eating challenging during the first trimester. Focus on small, frequent meals throughout the day. Ginger tea, crackers, and bland foods like rice and bananas can help settle your stomach.

    Key nutrients to focus on:
    - Folic acid: Crucial for neural tube development
    - Vitamin B6: Helps reduce nausea
    - Iron: Supports increased blood volume
    
    Sample daily menu:
    Breakfast: Whole grain toast with almond butter, banana
    Mid-morning: Greek yogurt with berries
    Lunch: Chicken and vegetable soup with whole grain crackers
    Afternoon: Apple slices with cheese
    Dinner: Baked salmon, quinoa, steamed broccoli
    Evening: Small bowl of oatmeal with honey`,
        summary: "Navigate early pregnancy nutrition with meals designed to combat morning sickness while providing essential nutrients.",
        category: "meal_plan",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 8,
        tags: ["first_trimester", "morning_sickness", "healthy_eating", "nutrition"],
        image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061"
    },
    {
        title: "Third Trimester Power Foods: Energy When You Need It Most",
        content: `As your baby grows, your energy needs increase. Focus on nutrient-dense foods that provide sustained energy without causing discomfort.

    Essential nutrients for late pregnancy:
    - Protein: 75-100g daily for baby's growth
    - Calcium: 1000mg for bone development
    - Fiber: Prevents constipation
    - Omega-3s: Brain development
    
    Power foods to include:
    - Eggs: Complete protein and choline
    - Avocados: Healthy fats and folate
    - Lentils: Protein, fiber, and iron
    - Sweet potatoes: Vitamin A and fiber
    - Nuts and seeds: Protein and healthy fats
    
    Meal timing tips: Eat smaller, more frequent meals to avoid heartburn and maintain energy levels throughout the day.`,
        summary: "Fuel your final trimester with nutrient-dense meals that support your baby's rapid growth and your energy needs.",
        category: "meal_plan",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 7,
        tags: ["third_trimester", "energy", "protein", "healthy_eating"],
        image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
    },
    {
        title: "Postpartum Healing Foods: Nourish Your Recovery",
        content: `After delivery, your body needs specific nutrients to heal, produce breast milk, and regain strength. Focus on anti-inflammatory foods and adequate protein.

    Recovery essentials:
    - Iron-rich foods: Replenish blood loss (lean meats, spinach, lentils)
    - Protein: Tissue repair (eggs, fish, chicken, beans)
    - Vitamin C: Wound healing (citrus, berries, bell peppers)
    - Omega-3s: Reduce inflammation (salmon, walnuts, chia seeds)
    - Fiber: Prevent constipation (whole grains, fruits, vegetables)
    
    Easy postpartum meals:
    - Bone broth with vegetables and noodles
    - Overnight oats with nuts and berries
    - Sheet pan chicken with roasted vegetables
    - Smoothie bowls packed with fruits and seeds
    
    Hydration is crucial, especially if breastfeeding. Aim for 10-12 glasses of water daily.`,
        summary: "Support your postpartum recovery with healing foods that restore energy, promote healing, and support breastfeeding.",
        category: "meal_plan",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 9,
        tags: ["postpartum", "recovery", "healing", "breastfeeding", "nutrition"],
        image_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352"
    },
    {
        title: "Batch Cooking for New Moms: 5 Freezer-Friendly Meals",
        content: `Prepare these nutritious meals before baby arrives or during nap times to make postpartum life easier.

    1. Hearty Vegetable Lasagna
    Packed with vegetables, cheese, and whole grain noodles. Freezes for up to 3 months.
    
    2. Chicken and Quinoa Burrito Bowls
    Prep ingredients separately, combine when ready to eat. Rich in protein and fiber.
    
    3. Lentil and Sweet Potato Curry
    Anti-inflammatory spices, plant-based protein, freezes beautifully.
    
    4. Turkey Meatballs with Marinara
    Lean protein, versatile for pasta or sandwiches. Make 50+ at once.
    
    5. Black Bean and Corn Enchiladas
    Vegetarian option loaded with fiber and calcium from cheese.
    
    Freezing tips:
    - Use flat freezer bags for space efficiency
    - Label with date and reheating instructions
    - Thaw in refrigerator overnight
    - Most meals stay fresh 2-3 months`,
        summary: "Master batch cooking with these freezer-friendly meals perfect for busy new parents who need nutritious, ready-to-eat options.",
        category: "meal_plan",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 10,
        tags: ["meal_prep", "batch_cooking", "freezer_meals", "time_saving"],
        image_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd"
    },

    // EXERCISE
    {
        title: "Safe First Trimester Exercises: Staying Active Early On",
        content: `Exercise during the first trimester can help reduce fatigue, morning sickness, and prepare your body for pregnancy changes.

    Safe activities:
    - Walking: 20-30 minutes daily
    - Swimming: Low-impact, supports joints
    - Prenatal yoga: Flexibility and relaxation
    - Stationary cycling: Cardiovascular health
    - Light strength training: Maintain muscle tone
    
    Warning signs to stop exercising:
    - Vaginal bleeding
    - Dizziness or fainting
    - Chest pain
    - Severe headache
    - Contractions
    - Decreased fetal movement (later in pregnancy)
    
    Modifications to make:
    - Avoid overheating
    - Stay well hydrated
    - No contact sports
    - Avoid exercises lying flat on your back after first trimester
    - Listen to your body
    
    Always consult your healthcare provider before starting any exercise program during pregnancy.`,
        summary: "Discover safe and effective exercises for your first trimester that boost energy and support a healthy pregnancy.",
        category: "exercise",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 6,
        tags: ["first_trimester", "exercise", "fitness", "safe_workouts"],
        image_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a"
    },
    {
        title: "Prenatal Yoga: Poses for Each Trimester",
        content: `Yoga during pregnancy improves flexibility, reduces stress, and prepares you for labor. Here are safe poses for each stage.

    First Trimester Poses:
    - Cat-Cow Stretch: Relieves back tension
    - Child's Pose: Gentle hip opener
    - Warrior II: Builds leg strength
    - Side Angle Pose: Opens hips
    
    Second Trimester Adaptations:
    - Modified Downward Dog: Use blocks if needed
    - Supported Bridge Pose: Strengthens back
    - Goddess Pose: Opens pelvis
    - Pigeon Pose: Hip flexibility
    
    Third Trimester Focus:
    - Supported Squat: Prepares for delivery
    - Butterfly Pose: Opens hips
    - Legs Up the Wall: Reduces swelling
    - Supported Savasana: Side-lying relaxation
    
    Poses to avoid throughout pregnancy:
    - Deep twists
    - Belly-down positions
    - Deep backbends
    - Hot yoga
    - Jump transitions
    
    Benefits: Improved sleep, reduced stress, better posture, easier labor, faster recovery.`,
        summary: "Learn trimester-specific prenatal yoga poses that support your changing body and prepare you for childbirth.",
        category: "exercise",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 11,
        tags: ["yoga", "prenatal_exercise", "flexibility", "relaxation", "all_trimesters"],
        image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
    },
    {
        title: "Pelvic Floor Exercises: Prevention and Recovery",
        content: `Pelvic floor exercises are crucial during pregnancy and postpartum for preventing incontinence and supporting recovery.

    Understanding your pelvic floor:
    The pelvic floor is a group of muscles that support your bladder, bowel, and uterus. Pregnancy and childbirth put significant strain on these muscles.
    
    Basic Kegel Exercise:
    1. Identify the muscles (stop urination midstream to locate them)
    2. Empty your bladder
    3. Tighten pelvic floor muscles for 5 seconds
    4. Relax for 5 seconds
    5. Repeat 10 times, 3 times daily
    
    Advanced techniques:
    - Elevator Kegels: Gradually tighten in stages
    - Quick Flicks: Rapid contractions
    - Breath coordination: Exhale during contraction
    
    During pregnancy benefits:
    - Better bladder control
    - Reduced hemorrhoid risk
    - Easier pushing during delivery
    - Faster postpartum recovery
    
    Postpartum recovery:
    Start gentle exercises within days of delivery. Gradually increase intensity over 6-8 weeks. If you experience pain or prolapse symptoms, consult a pelvic floor physical therapist.`,
        summary: "Master pelvic floor exercises to prevent complications during pregnancy and speed up postpartum recovery.",
        category: "exercise",
        for_stage: "both",
        is_published: true,
        read_time_minutes: 8,
        tags: ["pelvic_floor", "kegels", "postpartum_recovery", "prevention"],
        image_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
    },
    {
        title: "Postpartum Workout Plan: Safe Return to Exercise",
        content: `Returning to exercise after childbirth requires patience and proper progression to avoid injury.

    Timeline for return:
    - Week 1-2: Gentle walking only
    - Week 3-4: Add pelvic floor exercises
    - Week 6: Doctor clearance needed
    - Week 6-12: Gradual return to pre-pregnancy activities
    
    Phase 1 (Weeks 1-6):
    - Daily walks (10-20 minutes)
    - Deep breathing exercises
    - Gentle pelvic floor work
    - Posture exercises
    
    Phase 2 (Weeks 6-12):
    - Increase walking to 30 minutes
    - Add bodyweight exercises (modified squats, wall push-ups)
    - Light resistance bands
    - Core reconnection exercises
    
    Phase 3 (Months 3-6):
    - Low-impact cardio (swimming, cycling)
    - Moderate strength training
    - Return to pre-pregnancy activities gradually
    
    Red flags to watch for:
    - Increased bleeding
    - Pain or heaviness in pelvis
    - Leaking urine
    - Diastasis recti worsening
    - Extreme fatigue
    
    Special considerations for C-section recovery: Wait 8-10 weeks before core exercises, focus on incision healing, avoid heavy lifting.`,
        summary: "Follow this progressive postpartum workout plan to safely regain strength and fitness after delivery.",
        category: "exercise",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 9,
        tags: ["postpartum", "workout_plan", "recovery", "fitness", "c_section"],
        image_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b"
    },

    // MENTAL HEALTH
    {
        title: "Managing Pregnancy Anxiety: Practical Coping Strategies",
        content: `Anxiety during pregnancy is common, affecting up to 1 in 5 expectant mothers. Understanding and managing it is crucial for your wellbeing.

    Common pregnancy anxieties:
    - Fear of miscarriage
    - Worry about baby's health
    - Concerns about childbirth
    - Financial stress
    - Body image concerns
    - Parenting readiness
    
    Coping strategies that work:
    
    1. Mindfulness meditation (10 minutes daily)
    - Focus on breath
    - Body scan relaxation
    - Guided imagery
    
    2. Cognitive restructuring
    - Identify anxious thoughts
    - Challenge their validity
    - Replace with realistic thoughts
    
    3. Controlled breathing
    - 4-7-8 technique
    - Box breathing
    - Calming counted breaths
    
    4. Physical activity
    - Reduces stress hormones
    - Releases endorphins
    - Improves sleep
    
    5. Social support
    - Talk to partner, friends, family
    - Join pregnancy support groups
    - Connect with other expecting mothers
    
    When to seek professional help:
    - Constant worry interfering with daily life
    - Panic attacks
    - Inability to sleep
    - Loss of appetite
    - Avoiding prenatal care
    
    Remember: Some anxiety is normal, but you don't have to suffer. Professional support is available and effective.`,
        summary: "Learn evidence-based strategies to manage pregnancy anxiety and maintain your mental wellbeing throughout your journey.",
        category: "mental_health",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 10,
        tags: ["anxiety", "mental_health", "coping_strategies", "mindfulness", "pregnancy_stress"],
        image_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
    },
    {
        title: "Recognizing Postpartum Depression: Signs and Support",
        content: `Postpartum depression affects 1 in 7 new mothers. Early recognition and treatment are essential for recovery.

    Baby Blues vs. Postpartum Depression:
    
    Baby Blues (50-80% of mothers):
    - Mood swings, crying
    - Overwhelm, anxiety
    - Difficulty sleeping
    - Lasts 2 weeks or less
    - Improves on its own
    
    Postpartum Depression (more serious):
    - Persistent sadness, hopelessness
    - Severe mood swings
    - Difficulty bonding with baby
    - Thoughts of harming self or baby
    - Lasts weeks or months
    - Requires treatment
    
    Warning signs:
    - Excessive crying or inability to cry
    - Withdrawing from loved ones
    - Loss of interest in baby
    - Severe anxiety or panic attacks
    - Thoughts of self-harm
    - Inability to care for yourself or baby
    
    Getting help:
    1. Talk to your healthcare provider immediately
    2. Consider therapy (CBT is highly effective)
    3. Medication may be recommended
    4. Join a support group
    5. Lean on your support system
    
    For partners and family:
    - Watch for warning signs
    - Offer specific help (meals, cleaning, baby care)
    - Listen without judgment
    - Encourage professional help
    - Take care of your own mental health
    
    Recovery is possible with proper treatment. You're not alone, and you're not a bad mother for experiencing this.`,
        summary: "Understand the difference between baby blues and postpartum depression, recognize warning signs, and learn how to get help.",
        category: "mental_health",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 12,
        tags: ["postpartum_depression", "mental_health", "warning_signs", "support", "recovery"],
        image_url: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
    },
    {
        title: "Self-Care for New Moms: Finding Time for Yourself",
        content: `Self-care isn't selfish—it's essential for being the best parent you can be. Here's how to prioritize your wellbeing.

    Micro self-care moments (5-15 minutes):
    - Hot shower while partner watches baby
    - Skincare routine during nap time
    - Stretching while baby plays
    - Mindful breathing during feedings
    - Favorite music while doing chores
    
    Daily essentials:
    - Sleep when baby sleeps (really!)
    - Eat nutritious meals
    - Stay hydrated
    - Get outside daily
    - Connect with one person
    
    Weekly goals:
    - One uninterrupted shower
    - 30 minutes of exercise
    - Coffee or phone call with friend
    - Hobby time (reading, crafting, etc.)
    - Date night or quality time with partner
    
    Asking for help:
    Many new moms struggle with this, but accepting help is crucial. Be specific:
    - "Can you watch the baby for an hour Saturday morning?"
    - "Would you bring dinner Tuesday night?"
    - "Can you fold this laundry while you're here?"
    
    Self-care on a budget:
    - Free meditation apps
    - YouTube workout videos
    - Library books
    - Nature walks
    - At-home spa treatments
    
    Remember: Taking care of yourself allows you to better care for your baby. You can't pour from an empty cup.`,
        summary: "Discover practical ways to incorporate self-care into your busy life as a new mom without guilt or overwhelm.",
        category: "mental_health",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 8,
        tags: ["self_care", "new_mom", "mental_health", "wellness", "balance"],
        image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
    },
    {
        title: "Partner Connection During Pregnancy: Staying Close",
        content: `Pregnancy brings changes to your relationship. Maintaining connection with your partner is important for both of you.

    Common relationship challenges:
    - Decreased intimacy
    - Different excitement levels
    - Communication breakdowns
    - Stress and anxiety
    - Role adjustments
    - Physical discomforts affecting mood
    
    Strengthening your bond:
    
    1. Regular check-ins
    - Daily: Share one high and one low
    - Weekly: Discuss upcoming week
    - Monthly: Relationship state assessment
    
    2. Quality time together
    - Date nights (before baby arrives)
    - Prenatal classes together
    - Baby shopping dates
    - Quiet evenings talking
    
    3. Physical connection
    - Non-sexual touch (massage, cuddling)
    - Adapted intimacy as comfortable
    - Hand-holding during appointments
    
    4. Shared preparation
    - Attend appointments together
    - Read parenting books
    - Tour hospital/birth center
    - Prepare nursery as a team
    
    5. Express appreciation
    - Thank partner for specific actions
    - Acknowledge their feelings too
    - Celebrate milestones together
    
    For partners: Your feelings matter too. Attend appointments, ask questions, share fears, and prepare together. Pregnancy is a journey for both of you.
    
    When to seek counseling:
    - Constant arguments
    - Emotional distance growing
    - Resentment building
    - Communication breakdown
    
    Strong partnerships make better co-parents. Invest in your relationship now.`,
        summary: "Maintain and strengthen your relationship during pregnancy with practical strategies for staying connected as a couple.",
        category: "mental_health",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 9,
        tags: ["relationships", "partner_connection", "communication", "intimacy", "pregnancy"],
        image_url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2"
    },

    // BABY CARE
    {
        title: "Newborn Sleep Basics: What to Expect the First Month",
        content: `Newborn sleep patterns are unpredictable, but understanding what's normal can reduce stress and help you cope.

    What's normal:
    - 14-17 hours total sleep per 24 hours
    - Sleep in 2-4 hour stretches
    - No day/night distinction yet
    - Irregular patterns
    - Frequent waking for feeds
    
    Sleep cycle basics:
    Newborns have 50-60 minute sleep cycles (vs. 90 minutes for adults). They spend more time in active (REM) sleep, which is lighter and easier to wake from.
    
    Creating a sleep-friendly environment:
    - Room temperature: 68-72°F
    - Darkness during night feeds
    - White noise machine
    - Safe sleep space (firm mattress, no loose items)
    - Swaddle if baby likes it
    
    Safe sleep guidelines (ABC):
    - Alone: No co-sleeping
    - Back: Always place on back
    - Crib: Firm, flat, empty surface
    
    Day/night confusion solutions:
    - Bright light during day feeds
    - Darkness at night
    - Play and talk during day
    - Quiet and calm at night
    - Sunlight exposure during day
    
    Survival strategies:
    - Sleep when baby sleeps
    - Accept help for non-baby tasks
    - Take shifts with partner
    - Lower expectations for everything else
    - Remember this phase is temporary
    
    When to call doctor:
    - Baby extremely difficult to wake
    - Not waking for feeds
    - Blue or pale color
    - Breathing concerns
    
    Most important: You're doing great. Newborn sleep is hard for everyone.`,
        summary: "Navigate newborn sleep with realistic expectations and practical strategies for those challenging first weeks.",
        category: "baby_care",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 10,
        tags: ["newborn", "sleep", "baby_care", "first_month", "safe_sleep"],
        image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba"
    },
    {
        title: "Breastfeeding 101: Getting Started Successfully",
        content: `Breastfeeding is natural but not always easy. Here's what you need to know to get started successfully.

    First hour after birth:
    - Skin-to-skin contact immediately
    - Baby's instinct to find breast
    - First latch may take time
    - Colostrum is all baby needs
    
    Proper latch technique:
    1. Wait for wide open mouth
    2. Bring baby to breast (not breast to baby)
    3. Baby's chin touches breast first
    4. More areola visible above lip than below
    5. Lips flanged outward
    6. No clicking or smacking sounds
    
    Signs of good feeding:
    - Deep, rhythmic sucking
    - Audible swallowing
    - Baby relaxed, hands open
    - You feel tugging but not pain
    - Breasts softer after feeding
    
    Common challenges and solutions:
    
    Sore nipples:
    - Check latch
    - Apply lanolin or breast milk
    - Air dry nipples
    - Change nursing positions
    
    Engorgement:
    - Feed frequently
    - Apply warm compress before feeding
    - Cold compress after
    - Hand express or pump if needed
    
    Low supply concerns:
    - Feed on demand (8-12 times daily)
    - Ensure proper latch
    - Stay hydrated
    - Eat enough calories
    - Get adequate rest
    
    When to seek help:
    - Severe pain during feeding
    - Baby not gaining weight
    - Insufficient wet diapers
    - Breast infection signs
    - Continued difficulty latching
    
    Lactation consultants can be invaluable. Don't hesitate to reach out for support.`,
        summary: "Master breastfeeding basics with expert guidance on proper technique, common challenges, and when to seek help.",
        category: "baby_care",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 11,
        tags: ["breastfeeding", "newborn", "feeding", "lactation", "baby_care"],
        image_url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9"
    },
    {
        title: "Diaper Changing Mastery: Tips, Tricks, and Troubleshooting",
        content: `Master the art of diaper changing with these practical tips for keeping baby clean, comfortable, and rash-free.

    Diaper changing essentials:
    - Clean diapers (have 2-3 within reach)
    - Wipes or warm washcloths
    - Diaper cream
    - Changing pad or towel
    - Distraction toys
    - Clean clothes (for blowouts)
    
    Step-by-step technique:
    1. Lay baby on safe, flat surface
    2. Never leave baby unattended
    3. Unfasten dirty diaper but don't remove yet
    4. Use front of diaper to wipe bulk of mess
    5. Lift legs gently, clean thoroughly
    6. For girls: wipe front to back
    7. For boys: cover penis with cloth
    8. Apply barrier cream if needed
    9. Slide clean diaper under
    10. Fasten snugly (two fingers fit under waistband)
    
    Frequency guidelines:
    - Newborns: 8-10 times daily
    - Check before and after each feeding
    - Always change poopy diapers immediately
    - Overnight: Only if baby wakes uncomfortable
    
    Diaper rash prevention and treatment:
    
    Prevention:
    - Change frequently
    - Clean thoroughly but gently
    - Apply barrier cream at each change
    - Allow diaper-free time daily
    - Avoid tight diapers
    
    Treatment for mild rash:
    - Increase diaper-free time
    - Use thick layer of zinc oxide cream
    - Try different diaper brand
    - Avoid wipes (use water and cloth)
    - Pat dry instead of rubbing
    
    Call doctor if:
    - Rash doesn't improve in 3 days
    - Blisters, pus, or bleeding
    - Fever accompanies rash
    - Baby seems in pain
    - Bright red or spreading rapidly
    
    Blowout containment:
    - Size up if frequent blowouts
    - Check waistband and leg gap fit
    - Change before feeding
    - Consider different diaper brand
    
    Pro tips:
    - Have backup outfits everywhere
    - Keep travel changing kit in car
    - Use distraction during changes
    - Sing the same song each time
    - Make it fun, not stressful`,
        summary: "Become a diaper changing pro with this complete guide covering technique, troubleshooting, and preventing diaper rash.",
        category: "baby_care",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 9,
        tags: ["diaper_changing", "newborn", "baby_care", "diaper_rash", "hygiene"],
        image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
    },
    {
        title: "Baby Bath Time: Safe and Enjoyable Bathing Routine",
        content: `Bath time can be a wonderful bonding experience. Learn how to bathe your baby safely and make it enjoyable for both of you.

    When to start:
    - Sponge baths until umbilical cord falls off (1-2 weeks)
    - First tub bath after cord site heals
    - 2-3 times per week is sufficient (more can dry skin)
    
    Sponge bath technique:
    1. Gather all supplies first
    2. Room temperature 75°F or warmer
    3. Keep baby dressed, uncover one area at a time
    4. Start with face (no soap)
    5. Move to body with soapy cloth
    6. Clean diaper area last
    7. Pat dry thoroughly, especially creases
    
    First tub baths:
    
    Setup:
    - Infant tub or clean sink
    - Water 2-3 inches deep
    - Temperature 100°F (elbow test)
    - All supplies within reach
    - Never leave baby unattended
    
    Step-by-step:
    1. Undress baby, wrap in towel
    2. Lower gently into water, supporting head
    3. Keep one hand supporting at all times
    4. Wash face first (no soap)
    5. Shampoo head, rinse carefully
    6. Wash body with mild baby soap
    7. Clean diaper area last
    8. Lift out, wrap immediately
    9. Pat dry thoroughly
    10. Dress quickly to prevent chilling
    
    Safety essentials:
    - Never leave baby alone in water
    - Keep one hand on baby always
    - Gather supplies before starting
    - Check water temperature
    - Avoid bath seats initially (false security)
    - Keep room warm
    
    Making it enjoyable:
    - Talk or sing throughout
    - Make eye contact
    - Gentle splashing
    - Calm, confident movements
    - Warm towel ready
    - Quick but thorough
    
    Common concerns:
    
    Baby cries:
    - Water may be wrong temperature
    - Try different time of day
    - Hungry or tired
    - Keep bath short
    
    Dry skin:
    - Bathe less frequently
    - Use gentle, fragrance-free products
    - Apply baby moisturizer after
    - Pat dry, don't rub
    
    Cradle cap:
    - Massage scalp with oil before bath
    - Gentle brushing
    - Use baby shampoo
    - Usually resolves on its own
    
    Special care areas:
    - Cord stump: keep dry
    - Circumcision site: follow care instructions
    - Diaper area: thorough but gentle
    - Skin folds: dry completely
    
    Bath time tips:
    - Evening baths can help bedtime routine
    - Some babies prefer morning
    - Make it part of consistent routine
    - Keep it warm and quick at first
    - Confidence comes with practice`,
        summary: "Learn safe baby bathing techniques from sponge baths to tub baths, plus tips for making bath time enjoyable.",
        category: "baby_care",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 10,
        tags: ["bath_time", "baby_care", "newborn", "hygiene", "safety"],
        image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
    },

    // NUTRITION
    {
        title: "Prenatal Vitamins: What You Really Need",
        content: `Prenatal vitamins fill nutritional gaps during pregnancy, but not all are created equal. Here's what matters most.

    Essential nutrients in prenatal vitamins:
    
    Folic Acid (400-800 mcg):
    - Prevents neural tube defects
    - Start before conception if possible
    - Critical in first 4 weeks
    
    Iron (27 mg):
    - Prevents anemia
    - Supports increased blood volume
    - Take with vitamin C for absorption
    - May cause constipation
    
    Calcium (1000 mg):
    - Baby's bone development
    - Maintains your bone health
    - May need separate supplement
    
    DHA (200-300 mg):
    - Brain and eye development
    - Not in all prenatals
    - Consider separate fish oil
    
    Vitamin D (600 IU):
    - Immune system support
    - Calcium absorption
    - Mood regulation
    
    Other important nutrients:
    - Vitamin B12: Nervous system development
    - Vitamin C: Iron absorption, immunity
    - Zinc: Growth and development
    - Iodine: Thyroid function
    
    Choosing a prenatal:
    - Look for USP or NSF certification
    - Check all essential nutrients
    - Consider your diet gaps
    - Ask about absorption (some are better)
    - Timing: with food to reduce nausea
    
    Common side effects and solutions:
    - Nausea: Take with food or before bed
    - Constipation: Increase fiber and water
    - Large pills: Try gummy or liquid forms
    - Metallic taste: Change brands or take with citrus
    
    Food vs. supplements:
    While supplements are important, food should be your primary source of nutrition. Focus on a varied, nutrient-dense diet and use prenatal vitamins as insurance.`,
        summary: "Understand which prenatal vitamins you really need, what to look for, and how to manage side effects.",
        category: "nutrition",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 8,
        tags: ["prenatal_vitamins", "supplements", "nutrition", "pregnancy_health"],
        image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
    },
    {
        title: "Hydration During Pregnancy: Why Water Matters More Now",
        content: `Staying properly hydrated during pregnancy is crucial for your health and your baby's development.

    Why hydration is critical:
    - Supports increased blood volume (50% increase)
    - Amniotic fluid production
    - Nutrient transportation to baby
    - Waste removal
    - Temperature regulation
    - Prevents constipation
    - Reduces swelling
    - Prevents urinary tract infections
    
    How much water:
    - Minimum: 8-10 glasses (64-80 oz) daily
    - Ideal: 10-12 glasses (80-96 oz)
    - More if exercising or in hot weather
    - Urine should be pale yellow
    
    Signs of dehydration:
    - Dark yellow urine
    - Decreased urination
    - Dry mouth and lips
    - Dizziness
    - Headaches
    - Braxton Hicks contractions
    - Fatigue
    
    Hydration strategies:
    - Start morning with large glass of water
    - Keep water bottle with you always
    - Set phone reminders
    - Drink before feeling thirsty
    - Add lemon or cucumber for flavor
    - Eat water-rich foods
    
    Water-rich foods:
    - Watermelon (92% water)
    - Cucumbers (95% water)
    - Strawberries (91% water)
    - Lettuce (96% water)
    - Celery (95% water)
    - Oranges (86% water)
    
    Beverages to limit:
    - Caffeine: 200mg max daily (2 cups coffee)
    - Sugary drinks: Empty calories
    - Artificial sweeteners: Moderation
    
    Third trimester considerations:
    - May need to limit evening fluids to reduce nighttime bathroom trips
    - But don't reduce overall daily intake
    - Just shift timing earlier in day
    
    Electrolyte balance:
    If exercising heavily or in hot weather, consider:
    - Coconut water
    - Electrolyte drinks (low sugar)
    - Salty snacks with water
    
    Remember: By the time you feel thirsty, you're already mildly dehydrated. Make drinking water a constant habit.`,
        summary: "Learn why hydration is more important than ever during pregnancy and practical strategies to drink enough water daily.",
        category: "nutrition",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 7,
        tags: ["hydration", "water", "pregnancy_health", "nutrition"],
        image_url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19"
    },

    // TIPS & TRICKS
    {
        title: "Hospital Bag Essentials: Complete Packing Checklist",
        content: `Pack your hospital bag by 36 weeks. Here's everything you'll need for labor, delivery, and recovery.

    For Labor:
    - Birth plan copies (3-4)
    - Insurance card and ID
    - Comfortable labor outfit (or hospital gown)
    - Socks with grips
    - Hair ties
    - Lip balm
    - Massage tools or tennis balls
    - Music playlist and speaker
    - Phone charger (long cord)
    - Snacks for partner
    - Camera for photos
    
    For Mom's Recovery:
    - Nursing bras (2-3)
    - High-waisted underwear (disposable or old)
    - Maternity pads (hospital provides, but bring extra)
    - Loose, comfortable going-home outfit
    - Flip flops or slippers
    - Toiletries (travel size)
    - Nipple cream
    - Breast pads
    - Medications you take regularly
    - Robe or comfy cardigan
    
    For Baby:
    - Going-home outfit (2 sizes)
    - Onesies (2-3)
    - Sleepers (2)
    - Socks and mittens
    - Swaddle blankets
    - Hat
    - Car seat (installed before labor!)
    - Pacifiers (if planning to use)
    - Burp cloths
    
    Don't bring:
    - Jewelry or valuables
    - Too many clothes (you'll be in hospital gown mostly)
    - Full-size toiletries (space limited)
    - Entire baby wardrobe
    
    Pack two bags:
    1. Labor bag (essentials only, partner carries)
    2. Postpartum bag (recovery items, can get from car later)
    
    For partner:
    - Change of clothes
    - Toiletries
    - Snacks and drinks
    - Phone charger
    - Pillow and blanket
    - Entertainment (book, tablet)
    - Cash for vending machines
    
    Last-minute additions:
    - Phone and charger
    - Glasses or contacts
    - Current medications
    - Wallet and insurance cards
    
    Pro tip: Take a photo of your packed bags so you remember what's in each one!`,
        summary: "Pack the perfect hospital bag with this comprehensive checklist covering everything for labor, delivery, and recovery.",
        category: "tips",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 8,
        tags: ["hospital_bag", "labor_prep", "delivery", "checklist", "third_trimester"],
        image_url: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf"
    },
    {
        title: "10 Things Nobody Tells You About Postpartum Recovery",
        content: `Postpartum recovery involves more than you might expect. Here's what to really prepare for.

    1. The bleeding is intense
    Heavy bleeding (lochia) lasts 2-6 weeks. Stock up on overnight pads. Expect clots. Call doctor if soaking through pad in an hour.
    
    2. You'll still look pregnant
    Your belly won't deflate immediately. Uterus takes 6 weeks to return to normal size. Maternity clothes for weeks postpartum are normal.
    
    3. First postpartum poop is terrifying
    Stool softeners are your friend. Drink tons of water. High fiber diet. Don't strain. It's scary but manageable.
    
    4. Night sweats are real
    Your body sheds extra fluid through sweat. Keep towels handy. Sleep on towel. Layer bedding. This passes in a few weeks.
    
    5. Hair loss starts around 3 months
    Hormones cause shedding. Can be alarming but temporary. Usually regrows fully. Gentle hair care helps.
    
    6. Breastfeeding hurts initially
    Even with perfect latch, first 2 weeks are uncomfortable. Nipples toughen. Pain that doesn't improve needs lactation help.
    
    7. You might cry—a lot
    Hormone crash causes emotional rollercoaster. Baby blues affect 80% of mothers. Usually improves within 2 weeks. If not, call doctor.
    
    8. Hemorrhoids are common
    Pushing during delivery causes them. Witch hazel pads help. Sitz baths provide relief. Usually resolve with time.
    
    9. You'll be exhausted beyond belief
    Sleep deprivation is real. Accept all help offered. Sleep when baby sleeps. Lower all other expectations.
    
    10. Recovery takes longer than 6 weeks
    "6-week checkup" doesn't mean "fully recovered." Many women need months. Be patient with your body.
    
    What helps recovery:
    - Rest (seriously, rest)
    - Nutritious food
    - Hydration
    - Accept help
    - Gentle movement when cleared
    - Realistic expectations
    - Communication with partner
    - Doctor follow-ups
    
    Red flags requiring immediate care:
    - Fever over 100.4°F
    - Excessive bleeding
    - Severe abdominal pain
    - Foul-smelling discharge
    - Painful, red breast area
    - Difficulty breathing
    - Suicidal thoughts
    
    Remember: Your body just did something incredible. Give it time and grace to heal.`,
        summary: "Get the real, honest truth about postpartum recovery that most people don't talk about—and how to cope.",
        category: "tips",
        for_stage: "postpartum",
        is_published: true,
        read_time_minutes: 9,
        tags: ["postpartum", "recovery", "real_talk", "expectations", "healing"],
        image_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4"
    },

    // PREGNANCY-SPECIFIC
    {
        title: "First Trimester Survival Guide: Managing Early Pregnancy",
        content: `The first trimester is challenging but manageable. Here's how to cope with common early pregnancy symptoms.

    Morning sickness solutions:
    - Eat small, frequent meals
    - Keep crackers by bed, eat before rising
    - Ginger tea or ginger candies
    - Vitamin B6 supplement (ask doctor)
    - Avoid triggers (strong smells, certain foods)
    - Stay hydrated with small sips
    - Sea-bands (acupressure wristbands)
    - Rest when needed
    
    Extreme fatigue:
    - Go to bed earlier
    - Nap when possible
    - Say no to unnecessary commitments
    - Ask for help with chores
    - Eat iron-rich foods
    - Stay hydrated
    - This improves in second trimester
    
    Food aversions and cravings:
    - Listen to your body
    - Don't force foods that repel you
    - Find alternatives for nutrition
    - Most aversions temporary
    - Cravings usually harmless
    - Balance is key
    
    Emotional changes:
    - Hormones cause mood swings
    - Perfectly normal to feel overwhelmed
    - Talk to partner about feelings
    - Join pregnancy support groups
    - Journal your experience
    - Seek help if feeling depressed
    
    Frequent urination:
    - Normal due to increased blood flow
    - Don't limit fluids
    - Lean forward when peeing
    - Empty bladder completely
    - May improve briefly in second trimester
    
    Tender breasts:
    - Buy supportive bra early
    - Sleep in sports bra if helps
    - Avoid underwire if uncomfortable
    - Breast growth is normal
    
    What to eat when nothing sounds good:
    - Bland carbs (toast, crackers, rice)
    - Cold foods (less smell)
    - Smoothies (nutrition in drinkable form)
    - Whatever you can tolerate
    - Prenatal vitamins fill gaps
    
    When to call doctor:
    - Severe vomiting (can't keep anything down)
    - Dehydration signs
    - Severe abdominal pain
    - Heavy bleeding
    - Severe headaches
    - Vision changes
    
    First trimester appointments:
    - Initial visit around 8-10 weeks
    - Confirm pregnancy
    - Medical history
    - Physical exam
    - Due date calculation
    - Prenatal testing discussion
    - Question list prepared
    
    Tips for working:
    - Keep snacks at desk
    - Take breaks when needed
    - Stay hydrated
    - Wear comfortable clothes
    - Plan when to announce
    - Know your rights
    
    Remember: Every woman's experience is different. What you're feeling is valid, and this phase will pass.`,
        summary: "Navigate the challenging first trimester with practical tips for managing morning sickness, fatigue, and emotional changes.",
        category: "pregnancy",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 10,
        tags: ["first_trimester", "morning_sickness", "early_pregnancy", "symptoms", "survival_guide"],
        image_url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9"
    },
    {
        title: "Understanding Your Second Trimester: The Golden Period",
        content: `The second trimester (weeks 13-27) is often called the "golden period" of pregnancy. Here's what to expect.

    Why it's easier:
    - Morning sickness usually subsides
    - Energy returns
    - Miscarriage risk drops significantly
    - Baby bump showing (exciting!)
    - Not yet uncomfortable from size
    - Can enjoy being pregnant
    
    Physical changes:
    
    Growing belly:
    - Maternity clothes needed
    - Belly button may pop out
    - Round ligament pain (sharp sides)
    - Stretch marks may appear
    - Skin changes (darkening, glow)
    
    Feeling baby move:
    - First-time moms: 18-20 weeks
    - Second pregnancies: 16-18 weeks
    - Feels like flutters or bubbles initially
    - Becomes stronger over time
    - Most magical feeling
    
    Other changes:
    - Increased appetite
    - Better sleep (for now)
    - Stuffy nose (pregnancy rhinitis)
    - Bleeding gums
    - Varicose veins may appear
    - Leg cramps at night
    
    Second trimester milestones:
    
    Week 13-16:
    - Energy returns
    - Morning sickness fades
    - Baby's sex may be visible on ultrasound
    
    Week 17-20:
    - Anatomy scan (major ultrasound)
    - Feel baby move
    - Baby bump obvious
    - May feel Braxton Hicks
    
    Week 21-24:
    - Baby viable if born (with medical help)
    - Glucose screening test
    - Growing rapidly now
    - More active baby movements
    
    Week 25-27:
    - Third trimester approaching
    - Consider childbirth classes
    - Baby can hear you
    - May start getting uncomfortable
    
    Self-care tips:
    - Stay active with pregnancy-safe exercise
    - Moisturize belly to prevent itchiness
    - Drink plenty of water
    - Eat balanced, nutritious meals
    - Get dental cleaning
    - Start researching baby gear
    
    What to prepare:
    - Register for childbirth classes
    - Start baby registry
    - Research pediatricians
    - Plan maternity leave
    - Take babymoon if desired
    - Start nursery planning
    
    Warning signs to watch:
    - Severe abdominal pain
    - Regular contractions before 37 weeks
    - Significant decrease in baby movement
    - Heavy bleeding
    - Severe headaches with vision changes
    - Severe swelling (especially face and hands)
    
    Making the most of this time:
    - This is often the best pregnancy phase
    - Plan activities while still comfortable
    - Document with photos
    - Connect with baby
    - Enjoy the excitement
    - Prepare mentally and practically
    
    Enjoy this special time—it really is the sweet spot of pregnancy!`,
        summary: "Make the most of your second trimester—the comfortable, energetic \"golden period\" of pregnancy—with this complete guide.",
        category: "pregnancy",
        for_stage: "pregnancy",
        is_published: true,
        read_time_minutes: 11,
        tags: ["second_trimester", "pregnancy_milestones", "baby_movement", "golden_period"],
        image_url: "https://images.unsplash.com/photo-1493101561740-e745892775b2"
    }
];

const seedDatabase = async () => {
    try {
        await configDotenv();
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Clear existing articles
        await Article.deleteMany({});
        console.log('Cleared existing articles');

        // Insert comprehensive seed data
        const insertedArticles = await Article.insertMany(comprehensiveArticles);
        console.log(`✅ Successfully seeded ${insertedArticles.length} articles`);

        // Display summary by category
        const summary = await Article.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        console.log('\n📊 Articles by category:');
        summary.forEach(cat => {
            console.log(`  ${cat._id}: ${cat.count} articles`);
        });

        console.log('\n✨ Database seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seeder
seedDatabase();