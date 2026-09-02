# ফুলকুঁড়ি আসর, Sunamganj — আসন্ন প্রতিযোগিতা ও ৫২ তম প্রতিষ্ঠাবার্ষিকী

## নতুন কাঠামো
- Home page-এ **আসন্ন প্রতিযোগিতা** শিরোনাম থাকবে।
- **৫২ তম প্রতিষ্ঠাবার্ষিকীর প্রতিযোগিতা সমূহ**: চিত্রাঙ্কন, দেয়ালিকা।
- **সাংস্কৃতিক অনুষ্ঠান**: গান, কবিতা-আবৃত্তি, কেরাত, উপস্থিত-বক্তৃতা।
- প্রতিটি প্রতিযোগিতায় ক্লিক করলে একই registration form-এ সেই প্রতিযোগিতা আগে থেকেই selected থাকবে; চাইলে আরও একাধিক প্রতিযোগিতা নির্বাচন করা যাবে।
- প্রতি নির্বাচিত প্রতিযোগিতার জন্য ৳২০ এবং **প্রতিটি প্রতিযোগিতার আলাদা payment method + Transaction ID** দিতে হবে।
- **৫২ তম প্রতিষ্ঠাবার্ষিকী অনুষ্ঠান রেজিস্ট্রেশন** আলাদা অপশন, ফি ৳৫০।
- **মাইন্ড ম্যারাথন** আলাদা অপশন ও আলাদা registration।
- সফল registration-এর পরে Application Copy তৈরি হয়; Print / Save as PDF এবং HTML copy download করা যায়।
- Admin Dashboard-এ registration type, নির্বাচিত প্রতিযোগিতা, মোট ফি, payment details ও status দেখা যায়।

## সবচেয়ে গুরুত্বপূর্ণ: events-config.js
এই ফাইলেই পরিবর্তন করবেন:
- `anniversaryNumber` → ৫২ থেকে ৫৩ ইত্যাদি
- `anniversaryGeneralFee` → বিশেষ রেজিস্ট্রেশন ফি
- `competitionFee` → প্রতি প্রতিযোগিতার ফি
- `mindMarathonFee` → মাইন্ড ম্যারাথনের ফি
- `payment.bkash` / `payment.nagad` → পেমেন্ট নম্বর
- `competitions` → নতুন প্রতিযোগিতা যোগ/বাদ/নাম/আইকন/ক্যাটাগরি পরিবর্তন

### নতুন প্রতিযোগিতা যোগ করার উদাহরণ
`competitions` array-এর ভিতরে:
```js
{ id: "quiz", title: "কুইজ", icon: "🧠", category: "প্রতিযোগিতা" }
```
`category` শুধু `প্রতিযোগিতা` বা `সাংস্কৃতিক অনুষ্ঠান` রাখলে Home page-এর সঠিক সেকশনে যাবে।

### কোনো প্রতিযোগিতা বাদ দিতে
`events-config.js` থেকে ওই object-টি delete করুন। Registration page থেকেও সেটি স্বয়ংক্রিয়ভাবে চলে যাবে।

## Firebase setup
1. Firebase project ও Web App তৈরি করুন।
2. `firebase-config.js`-এ Firebase Console-এর config বসান।
3. Authentication → Email/Password চালু করুন।
4. Admin user তৈরি করুন এবং UID কপি করুন।
5. `firestore.rules`-এ `YOUR_ADMIN_UID`-এর জায়গায় Admin UID বসান।
6. Firestore Rules Publish করুন।
7. GitHub Pages-এ সব ফাইল ও `assets/` folder upload করুন।

## Admin
`admin.html` সাধারণ visitor-দের navigation-এ না দেওয়াই ভালো। Admin login Firebase Authentication দিয়ে হবে।

## বর্তমান payment/contact
- বিকাশ: 01845149255
- নগদ: 01575860708
- যোগাযোগ: 01886290151
