import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "Khadamati": "Khadamati",
            "Home": "Home",
            "Categories": "Categories",
            "Find_workers": "Find expert workers near you",
            "Categories_desc": "Plumbers, Carpenters, Doctors, and more...",
            "Search_Now": "Search Now",
            "HeroTitle": "Your Trusted Service Directory",
            "HeroSubtitle": "Connect instantly with top-rated local professionals for any job, big or small. Experience hassle-free hiring today.",
            "GetStarted": "Get Started",
            "LearnMore": "Learn More",
            "FeaturesTitle": "Why Choose Khadamati?",
            "Feature1Title": "Verified Experts",
            "Feature1Desc": "Every professional on our platform is vetted for quality and reliability.",
            "Feature2Title": "Instant Connections",
            "Feature2Desc": "Find exactly who you need, right when you need them with smart filtering.",
            "Feature3Title": "Transparent Reviews",
            "Feature3Desc": "Read real testimonials from people in your community before you hire.",
            "HowItWorksTitle": "How It Works",
            "Step1Title": "1. Search",
            "Step1Desc": "Tell us what you need and where you are located.",
            "Step2Title": "2. Compare",
            "Step2Desc": "Review profiles, experience, and ratings of local pros.",
            "Step3Title": "3. Connect",
            "Step3Desc": "Reach out directly and get your job done perfectly.",
            "AboutUsTitle": "About Our Mission",
            "AboutUsDesc": "Khadamati was built with a simple goal: to eliminate the friction in finding reliable local services. Whether you're dealing with a leaky pipe at midnight or planning a major renovation, our platform bridges the gap between skilled workers and the people who need them. We empower professionals to grow their business while giving customers peace of mind.",
            "StatsProfessionals": "Active Professionals",
            "StatsJobs": "Jobs Completed",
            "StatsCities": "Cities Covered",
            "CTAHeader": "Ready to get things done?",
            "CTASub": "Join thousands of satisfied users who found their perfect service match.",
            "CTABtn": "Find a Professional Today",
            "Login": "Login",
            "RegisterAsWorker": "Join as Professional",
            "Email": "Email Address",
            "Password": "Password",
            "Name": "Full Name",
            "Phone": "Phone Number",
            "City": "City",
            "Area": "Area",
            "Address": "Detailed Address",
            "JobType": "Job Type",
            "ExperienceYears": "Years of Experience",
            "DontHaveAccount": "Don't have an account?",
            "AlreadyHaveAccount": "Already have an account?",
            "Dashboard": "My Profile",
            "Logout": "Logout"
        }
    },
    ar: {
        translation: {
            "Khadamati": "خدماتي",
            "Home": "الرئيسية",
            "Categories": "التصنيفات",
            "Find_workers": "ابحث عن عمال وحرفيين خبراء بالقرب منك",
            "Categories_desc": "سباكين، نجارين، أطباء والمزيد...",
            "Search_Now": "ابحث الآن",
            "HeroTitle": "دليلك الموثوق للخدمات",
            "HeroSubtitle": "تواصل فوراً مع أفضل المحترفين المحليين لأي وظيفة، كبيرة كانت أم صغيرة. جرب التوظيف بدون متاعب اليوم.",
            "GetStarted": "ابدأ الآن",
            "LearnMore": "معرفة المزيد",
            "FeaturesTitle": "لماذا تختار خدماتي؟",
            "Feature1Title": "خبراء معتمدون",
            "Feature1Desc": "يتم فحص كل محترف على منصتنا للتأكد من الجودة والموثوقية.",
            "Feature2Title": "تواصل فوري",
            "Feature2Desc": "اعثر على من تحتاجه بالضبط، في الوقت الذي تحتاجه فيه باستخدام التصفية الذكية.",
            "Feature3Title": "تقييمات شفافة",
            "Feature3Desc": "اقرأ شهادات حقيقية من أشخاص في مجتمعك قبل أن تقوم بالتوظيف.",
            "HowItWorksTitle": "كيف نعمل",
            "Step1Title": "1. ابحث",
            "Step1Desc": "أخبرنا بما تحتاجه وأين تتواجد.",
            "Step2Title": "2. قارن",
            "Step2Desc": "راجع الملفات الشخصية والخبرات والتقييمات للمحترفين المحليين.",
            "Step3Title": "3. تواصل",
            "Step3Desc": "تواصل مباشرة وأنجز عملك بشكل مثالي.",
            "AboutUsTitle": "مهمتنا رؤيتنا",
            "AboutUsDesc": "تم بناء خدماتي بهدف بسيط: القضاء على الصعوبات في العثور على خدمات محلية موثوقة. سواء كنت تتعامل مع أنبوب يتسرب في منتصف الليل أو تخطط لتجديد كبير، فإن منصتنا تسد الفجوة بين العمال المهرة والأشخاص الذين يحتاجون إليهم.",
            "StatsProfessionals": "محترف نشط",
            "StatsJobs": "وظيفة مكتملة",
            "StatsCities": "مدينة مغطاة",
            "CTAHeader": "هل أنت مستعد لإنجاز الأمور؟",
            "CTASub": "انضم إلى الآلاف من المستخدمين الراضين الذين وجدوا الخدمة المثالية لهم.",
            "CTABtn": "ابحث عن محترف اليوم",
            "Login": "تسجيل الدخول",
            "RegisterAsWorker": "انضم كمحترف",
            "Email": "البريد الإلكتروني",
            "Password": "كلمة المرور",
            "Name": "الاسم الكامل",
            "Phone": "رقم الهاتف",
            "City": "المدينة",
            "Area": "المنطقة",
            "Address": "العنوان بالتفصيل",
            "JobType": "نوع المهنة",
            "ExperienceYears": "سنوات الخبرة",
            "DontHaveAccount": "ليس لديك حساب؟",
            "AlreadyHaveAccount": "لديك حساب بالفعل؟",
            "Dashboard": "ملفي الشخصي",
            "Logout": "تسجيل الخروج"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
