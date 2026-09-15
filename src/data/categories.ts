import { CategoryInfo, PostcardCategory } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  { id: 'cat-love', name: '❤️ প্রেম', icon: '❤️', count: 75, description: 'হৃদয়ের গভীর অনুভূতির পোস্টকার্ড ও প্রেমকথা' },
  { id: 'cat-romantic', name: '🌹 রোমান্টিক', icon: '🌹', count: 75, description: 'গোলাপ আর স্নিগ্ধ ভালোবাসার ছোঁয়া' },
  { id: 'cat-separation', name: '💔 বিরহ', icon: '💔', count: 75, description: 'অপূর্ণ গল্প আর বুকের ভেতরের হাহাকার' },
  { id: 'cat-missing', name: '🥺 মিস করা', icon: '🥺', count: 75, description: 'দূরত্বের মাঝে প্রিয়জনকে কাছে পাওয়ার আকুতি' },
  { id: 'cat-rain', name: '🌧️ বৃষ্টি', icon: '🌧️', count: 75, description: 'ঝুম বৃষ্টি, কদম ফুল আর চায়ের কাপের প্রেম' },
  { id: 'cat-night', name: '🌙 রাতের অনুভূতি', icon: '🌙', count: 75, description: 'নিঝুম রাত, চাঁদের আলো ও নিঃশব্দ ভাবনা' },
  { id: 'cat-letter', name: '💌 প্রেমপত্র', icon: '💌', count: 75, description: 'চিঠির খামে মোড়ানো ফেলে আসা সোনালী দিন' },
  { id: 'cat-proposal', name: '💍 প্রপোজ', icon: '💍', count: 75, description: 'চিরকাল পাশে থাকার মিষ্টি প্রস্তাব' },
  { id: 'cat-birthday', name: '🎂 জন্মদিন', icon: '🎂', count: 75, description: 'প্রিয় মানুষের বিশেষ দিনের আন্তরিক শুভেচ্ছা' },
  { id: 'cat-anniversary', name: '💑 Anniversary', icon: '💑', count: 75, description: 'একসঙ্গে পথচলার মধুর স্মৃতিচারণ' },
  { id: 'cat-one-sided', name: '🖤 একতরফা প্রেম', icon: '🖤', count: 75, description: 'গোপনে ভালোবেসে যাওয়ার নিঃস্বার্থ অনুভূতি' },
  { id: 'cat-memory', name: '🌸 স্মৃতি', icon: '🌸', count: 75, description: 'পুরনো অ্যালবামের মতো অমলিন সব মুহূর্ত' },
  { id: 'cat-classic', name: '🎞️ Classic Vintage', icon: '🎞️', count: 75, description: 'আশি ও নব্বইয়ের দশকের রেট্রো নস্টালজিয়া' },
  { id: 'cat-bengali-vintage', name: '🇧🇩 Bengali Vintage', icon: '🇧🇩', count: 75, description: 'ঐতিহ্যবাহী বাংলা চিঠি ও ডাকঘরের রূপ' },
  { id: 'cat-rabindranath', name: '📜 রবীন্দ্রনাথ ঠাকুর', icon: '📜', count: 75, description: 'বিশ্বকবি রবীন্দ্রনাথ ঠাকুরের কালজয়ী প্রেম, বিরহ ও চিরন্তন বাণী' },
  { id: 'cat-nazrul', name: '🪶 কাজী নজরুল ইসলাম', icon: '🪶', count: 75, description: 'বিদ্রোহী কবি নজরুলের তীব্র প্রেম, অনুরাগ ও গানের সুর' },
  { id: 'cat-ghalib', name: '✒️ মির্জা গালিব', icon: '✒️', count: 75, description: 'মির্জা গালিবের গভীর দার্শনিক শায়েরী, ইশক ও আবেগের আর্তি' },
  { id: 'cat-humayun', name: '🌙 হুমায়ূন আহমেদ', icon: '🌙', count: 75, description: 'হুমায়ূন আহমেদের মুগ্ধ করা সংলাপ, জোছনা ও বৃষ্টিবিলাস' },
  { id: 'cat-jibanananda', name: '🌾 জীবনানন্দ দাশ', icon: '🌾', count: 75, description: 'বনলতা সেন, রূপসী বাংলা ও কুয়াশাচ্ছন্ন নির্জন প্রেমের কবিতা' },
  { id: 'cat-sunil', name: '🥀 সুনীল গঙ্গোপাধ্যায়', icon: '🥀', count: 75, description: 'নীরা ও সুনীল গঙ্গোপাধ্যায়ের ব্যাকুল প্রেমের পঙক্তিমালা' },
  { id: 'cat-rudra', name: '🍂 রুদ্র মুহম্মদ শহিদুল্লাহ', icon: '🍂', count: 75, description: 'ভালো আছি ভালো থেকো ও রুদ্রের হৃদয়স্পর্শী উচ্চারণ' },
];

export const CATEGORY_NAMES: PostcardCategory[] = CATEGORIES.map(c => c.name);
