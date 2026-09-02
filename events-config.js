/* =========================================================
   WEBSITE EVENT CONFIGURATION
   ---------------------------------------------------------
   এখানকার লেখা/ফি/বছর/পেমেন্ট নম্বর পরিবর্তন করলেই
   Registration page ও Home page-এর মূল তথ্য বদলানো যাবে।
   নতুন প্রতিযোগিতা যোগ করতে competitions-এর ভিতরে আরেকটি
   object যোগ করুন।
   ========================================================= */
const SITE_CONFIG = {
  siteName: "ফুলকুঁড়ি আসর, Sunamganj",
  anniversaryNumber: "৫২",
  anniversaryTitle: "৫২ তম প্রতিষ্ঠাবার্ষিকী",
  anniversaryGeneralFee: 50,
  competitionFee: 20,
  mindMarathonFee: 20,
  payment: {
    bkash: "01845149255",
    nagad: "01575860708"
  },
  contactPhone: "01886290151",
  competitions: [
    { id: "drawing", title: "চিত্রাঙ্কন", icon: "🎨", category: "প্রতিযোগিতা" },
    { id: "wall-magazine", title: "দেয়ালিকা", icon: "📰", category: "প্রতিযোগিতা" },
    { id: "song", title: "গান", icon: "🎵", category: "সাংস্কৃতিক অনুষ্ঠান" },
    { id: "poem", title: "কবিতা-আবৃত্তি", icon: "📖", category: "সাংস্কৃতিক অনুষ্ঠান" },
    { id: "qirat", title: "কেরাত", icon: "📿", category: "সাংস্কৃতিক অনুষ্ঠান" },
    { id: "speech", title: "উপস্থিত-বক্তৃতা", icon: "🎤", category: "সাংস্কৃতিক অনুষ্ঠান" }
  ]
};
