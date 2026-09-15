#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates 25 dedicated, exquisite vintage postcards for each of the 7 famous author categories:
1. 📜 রবীন্দ্রনাথ ঠাকুর (vp0351 - vp0375)
2. 🪶 কাজী নজরুল ইসলাম (vp0376 - vp0400)
3. ✒️ মির্জা গালিব (vp0401 - vp0425)
4. 🌙 হুমায়ূন আহমেদ (vp0426 - vp0450)
5. 🌾 জীবনানন্দ দাশ (vp0451 - vp0475)
6. 🥀 সুনীল গঙ্গোপাধ্যায় (vp0476 - vp0500)
7. 🍂 রুদ্র মুহম্মদ শহিদুল্লাহ (vp0501 - vp0525)
"""

import json
import re
from collections import defaultdict

# 1. Read quotes from src/data/quotes.ts to pair with postcards
with open('src/data/quotes.ts', 'r', encoding='utf-8') as f:
    q_content = f.read()

pattern = r'\{\s*\"id\":\s*\"([^\"]+)\",\s*\"text\":\s*\"([^\"]+)\",\s*\"category\":\s*\"([^\"]+)\",\s*\"author\":\s*\"([^\"]+)\"\s*\}'
matches = re.findall(pattern, q_content)

quotes_by_cat = defaultdict(list)
for qid, qtext, qcat, qauthor in matches:
    quotes_by_cat[qcat].append((qtext, qauthor))

AUTHOR_POSTCARD_METAS = {
    '📜 রবীন্দ্রনাথ ঠাকুর': {
        'illustrations': ['old-letter', 'boat-river', 'vintage-rose', 'moonlight-night', 'gramophone-melody', 'lantern-night'],
        'stamps': ['royal-mail', 'dhaka-gpo', 'love-seal', 'wax-seal'],
        'borders': ['gold-filigree', 'classic', 'double-thin', 'vintage-post', 'aged-stamp'],
        'patterns': ['parchment', 'aged-paper', 'tea-stained', 'postal-linen'],
        'recipients': ['হৃদয়ের মানসী', 'সখী', 'প্রাণের মানুষ', 'সুহৃদ', 'মানসকন্যা', 'প্রিয়তমা', 'অন্তরতম'],
        'senders': ['ইতি, তোমার রবি...', 'ইতি, রবি...', 'ইতি, এক মুগ্ধ কবি...', 'ইতি, অনন্ত ভক্ত...', 'ইতি, তোমার ভানুসিংহ...'],
        'dates': ['শান্তিনিকেতন', 'জোড়াসাঁকো', 'শ্রাবণ ১৩৩৮', 'বসন্ত ১৩৩৫', 'ফাল্গুনী অপরাহ্নে', 'শিলাইদহ বোটে', 'পূর্ণিমা রাত্রে'],
        'titles': [
            ("Tagore's Heartfelt Song", "রবীন্দ্রনাথের পরান যাহা চায়"),
            ("Letters from Shilaidaha Boat", "শিলাইদহের পদ্মাবোটে লেখা চিঠি"),
            ("Whispers of Gitanjali", "গীতাঞ্জলির অমর পদাবলি"),
            ("Shesher Kobita Keepsake", "শেষের কবিতার চিরন্তন প্রেমপত্র"),
            ("Silent Moonlit Devotion", "নিশীথ পূর্ণিমায় নীরব ভালোবাসা"),
            ("Spring Breeze & Kadambari", "ফাল্গুনী হাওয়া ও স্মৃতির সুর"),
            ("Golden Boat at Dusk", "সোনার তরী ও গোধূলির আলো"),
            ("Eternal Song of Love", "অনন্ত প্রেমের অমর সুর"),
            ("Soul Connection Beyond Time", "কালের সীমানা পেরোনো আত্মিক টান"),
            ("Parchment of Lipika", "লিপিকার পাতায় সাজানো অনুভূতি"),
            ("Ode to the Beloved", "হৃদয়ের মন্দিরে লেখা নাম"),
            ("Spring Blossoms of Shantiniketan", "শান্তিনিকেতনের পলাশ ও বসন্ত"),
            ("Moonlit River Solitude", "জোছনাধোয়া পদ্মার বুকে খেয়ানৌকা"),
            ("Ties of Inseparable Affection", "নিবিড় ভালোবাসার সুতো"),
            ("A Glimpse from Afar", "দূর হতে দেখা মুগ্ধ নয়ন"),
            ("Autumn Morning Melody", "শরতের ভোরের স্নিগ্ধ শেফালি"),
            ("Song of the Boundless Sky", "অসীম আকাশের গান"),
            ("Words Sealed in Tears", "নয়নজলে সিক্ত চিঠি"),
            ("The Flute of Farewell", "বিদায়বেলার বাঁশির সুর"),
            ("Breeze from the Mango Grove", "আম্রকুঞ্জের স্নিগ্ধ বাতাস"),
            ("The Soul's Sanctuary", "হৃদয়ের নিভৃত কুটির"),
            ("Eternal Companion in Memory", "স্মৃতির মণিকোঠার চিরসাথী"),
            ("The Joy of Waiting", "পথ চাওয়াতেই পরম আনন্দ"),
            ("Light Beyond the Eyes", "চোখের বাহিরের অন্তর্জ্যোতি"),
            ("Tagore's Timeless Love Note", "রবীন্দ্রনাথের কালজয়ী প্রেমপত্র"),
        ]
    },
    '🪶 কাজী নজরুল ইসলাম': {
        'illustrations': ['gramophone-melody', 'vintage-rose', 'lantern-night', 'moonlight-night', 'boat-river', 'old-letter'],
        'stamps': ['dhaka-gpo', 'chittagong-post', 'love-seal', 'wax-seal'],
        'borders': ['classic', 'vintage-post', 'gold-filigree', 'double-thin', 'postage-perforated'],
        'patterns': ['parchment', 'kraft', 'aged-paper', 'postal-linen'],
        'recipients': ['প্রিয়তমা নার্গিস', 'প্রাণপ্রিয়া', 'সুরের রানি', 'মানসকন্যা', 'অশ্রুসিক্ত নয়ন', 'সুহৃদ'],
        'senders': ['ইতি, তোমার নজরুল...', 'ইতি, ধূমকেতু...', 'ইতি, চিরবিরহী কবি...', 'ইতি, সুরের পাগল...', 'ইতি, তোমার বুলবুল...'],
        'dates': ['দৌলতপুর ১৯২১', 'কলকাতা ১৯২৬', 'নিশীথ প্রহরে', 'শ্রাবণের মেঘে', 'বাঁশির সুরে', 'মুহূর্তের বিরহে'],
        'titles': [
            ("Nazrul's Rose & Song", "নজরুলের নার্গিস ও প্রেমকাব্য"),
            ("Rebel Poet's Love Letter", "বিদ্রোহী কবির ব্যাকুল প্রেমপত্র"),
            ("Melody of the Banshuri", "মধুর বাঁশরির ব্যাকুল রাগিণী"),
            ("Unforgotten Gaze", "চিরতরে দূরে যাওয়ার অঙ্গীকার"),
            ("The Tears and the Garland", "নয়ন ভরা জল ও আঁচল ভরা ফুল"),
            ("Ode to Eternal Passion", "উদ্বেল প্রেমের তীব্র আর্তি"),
            ("The Solitary Nightingale", "নার্গিস-বনে নীরব বুলবুলি"),
            ("Breeze from the River Bank", "সুরধুনী তীরের হংস-মিথুন"),
            ("Heartfire of Devotion", "প্রেমের অনল ও অহংকার"),
            ("Song of the Distant Horizon", "দূর প্রবাসের সুরভিত চিঠি"),
            ("Dusk Lamp of the Rebel", "বিদ্রোহীর সান্ধ্য প্রদীপ"),
            ("The Unsent Ghazal", "বুকের রক্তে লেখা বিরহী গজল"),
            ("Tender Chains of Love", "ভালোবাসার কোমল শৃঙ্খল"),
            ("Moonlit Sighs in Daulatpur", "দৌলতপুরের নিঝুম জোছনা"),
            ("Scent of Crimson Petals", "রক্তগোলাপের সোঁদা ঘ্রাণ"),
            ("A Thousand Lifetimes of Love", "জনম জনমের প্রেমবন্ধন"),
            ("Farewell Without Bitterness", "অভিমানহীন বিদায়ের অশ্রু"),
            ("Voice of the Soul's Sitar", "হৃদয়তারের করুণ ঝংকার"),
            ("The Queen of My Melody", "আমার সকল গানের সম্রাজ্ঞী"),
            ("In the Lap of Nature", "বুনো ফুলের সুবাসে সাজানো খাম"),
            ("Waiting by the Crossroads", "পথের বাঁকে তোমার প্রতীক্ষা"),
            ("Grief Turned into Symphony", "বেদনা যখন অমর গান হয়ে ওঠে"),
            ("The Flame That Never Dies", "অনির্বাণ প্রেমের পবিত্র শিখা"),
            ("Letter Written in Red Ink", "অনল কালিতে লেখা চিরকুট"),
            ("Nazrul's Eternal Love Postcard", "কাজী নজরুলের কালজয়ী প্রেমপত্র"),
        ]
    },
    '✒️ মির্জা গালিব': {
        'illustrations': ['old-letter', 'lantern-night', 'coffee-cup', 'moonlight-night', 'vintage-rose'],
        'stamps': ['royal-mail', 'wax-seal', 'love-seal', 'dhaka-gpo'],
        'borders': ['ornate', 'gold-filigree', 'classic', 'aged-stamp'],
        'patterns': ['tea-stained', 'parchment', 'aged-paper', 'diary-leather'],
        'recipients': ['হৃদয়ের মানসী', 'জানেমান', 'বেখবর দিল', 'সুহৃদ', 'দূরবর্তী চাঁদ', 'অচেনা অনুভূতি'],
        'senders': ['ইতি, আসাদুল্লাহ গালিব...', 'ইতি, গালিব...', 'ইতি, এক পোড়া অন্তরের প্রেমিক...', 'ইতি, বল্লিমারানের একলা কবি...'],
        'dates': ['দিল্লি ১৮৫০', 'মুঘল সান্ধ্যলগ্নে', 'নিশীথ প্রহরে', 'অপেক্ষার শতাব্দীতে', 'হাহাকারের রাতে', 'চাঁদের আলোয়'],
        'titles': [
            ("Ghalib's Ballimaran Postcard", "বল্লিমারানের গলি ও গালিবের শায়েরী"),
            ("A Thousand Desires of Heart", "হাজারো খোয়াইশের অমর আর্তি"),
            ("Ishq That Ruined the Poet", "ইশকের নেশা ও একাকী প্রেমিক"),
            ("Lantern in the Mughal Courtyard", "মুঘল বারান্দায় মিটিমিটি বাতি"),
            ("Unsent Ghazal on Parchment", "হলুদ চিঠির খামে না-পাঠানো গজল"),
            ("Tears Dissolved in Ink", "দোয়াত-কালিতে মিশে যাওয়া অশ্রু"),
            ("The Riddle of the Naive Heart", "অবুঝ মনের অমীমাংসিত বেদনা"),
            ("Candle Burning till Dawn", "উষা পর্যন্ত জ্বলা মোমবাতির শেষ শিখা"),
            ("Echoes of Old Delhi Evenings", "পুরনো দিল্লির বিষাদমাখা সন্ধ্যা"),
            ("Wounds Hidden from the World", "আড়াল করে রাখা বুকের রক্তক্ষরণ"),
            ("Silent Longing in Solitude", "নির্জনে প্রিয়ার জন্য ব্যাকুল হাহাকার"),
            ("The Royal Pride of Love", "ভালোবেসে ফকির হওয়ার রাজকীয় অহংকার"),
            ("A Cup of Tea and Unrest", "চায়ের কাপ ও অন্তহীন অস্থিরতা"),
            ("Words Sealed with Red Wax", "লাল গালায় সিলমোহর করা শায়েরী"),
            ("Faded Persian Rug & Quills", "প্রাচীন গালিচায় রাখা পালকের কলম"),
            ("Destiny's Harsh Decision", "নিয়তির নিষ্ঠুর পরিহাসের চিঠি"),
            ("Moonlight Falling on Ruins", "ধ্বংসস্তূপে পড়া শান্ত চাঁদের আলো"),
            ("The Unseen Tear of Grief", "বুকের ভেতরে শুকিয়ে যাওয়া কান্না"),
            ("Ghalib's Midnight Philosophy", "মধ্যরাতে গালিবের গভীর দর্শন"),
            ("A Life Lived for Love", "প্রেমের জন্য সমর্পিত এক জীবন"),
            ("The Whisper of the Sitar", "সেতারের মৃদু তারে ইশকের টান"),
            ("Longing Across the Centuries", "শতাব্দীর সীমানা পেরোনো ব্যাকুলতা"),
            ("Patience Tested by Love", "ভালোবাসায় ধৈর্যের কঠিন পরীক্ষা"),
            ("Unfinished Couplet in the Dark", "অন্ধকারে লেখা অসমাপ্ত শের"),
            ("Mirza Ghalib's Masterpiece", "মির্জা গালিবের অমর ভিন্টেজ পোস্টকার্ড"),
        ]
    },
    '🌙 হুমায়ূন আহমেদ': {
        'illustrations': ['moonlight-night', 'rainy-umbrella', 'bengali-kadam', 'lantern-night', 'coffee-cup'],
        'stamps': ['dhaka-gpo', 'love-seal', 'chittagong-post', 'wax-seal'],
        'borders': ['classic', 'vintage-post', 'gold-filigree', 'double-thin'],
        'patterns': ['parchment', 'rainy-vintage', 'tea-stained', 'postal-linen'],
        'recipients': ['রূপা', 'নীল শাড়ির মানসী', 'মেঘবালিকা', 'প্রিয় মানুষ', 'কদমফুল কন্যা', 'অচেনা পথিক'],
        'senders': ['ইতি, তোমার হিমু...', 'ইতি, হলুদ পাঞ্জাবির এক পথিক...', 'ইতি, একলা জোছনাবিলাসী...', 'ইতি, তোমার মিসির আলি...'],
        'dates': ['শ্রাবণের ঝুম বৃষ্টিতে', 'পূর্ণিমার জোছনায়', 'মধ্যরাতের ঢাকায়', 'একাকী বিকেলে', 'ধানমণ্ডির লেকে', 'চা আর বৃষ্টির প্রহরে'],
        'titles': [
            ("Himu's Yellow Postcard", "হিমুর হলুদ চিঠি ও নীল রোদ"),
            ("Rupa, The Monsoon Kadamba", "রূপার জন্য কদম ফুল ও বৃষ্টি"),
            ("Midnight Rain in Dhaka", "মধ্যরাতের বৃষ্টিতে ভেজা ঢাকা"),
            ("Full Moon Solitude of Himu", "জোছনা রাতে হিমুর একলা হাঁটা"),
            ("Dhanmondi Lake Bench at Dusk", "ধানমণ্ডি লেকের কাঠের বেঞ্চ"),
            ("A Cup of Hot Tea & Raindrops", "বৃষ্টিমুখর দিনে ধোঁয়া ওঠা চা"),
            ("Blue Saree & Silent Love", "নীল শাড়ি পরা রূপার মায়াবী চোখ"),
            ("Letter Kept in Yellow Pocket", "হলুদ পাঞ্জাবির পকেটে রাখা চিরকুট"),
            ("Misir Ali's Thoughtful Night", "মিসির আলির নির্ঘুম রাতের নোটবুক"),
            ("The Beauty of Rain in Attic", "চিলেকোঠার জানালায় বৃষ্টির রিনিঝিনি"),
            ("Walking Barefoot on Wet Asphalt", "ভেজা পিচঢালা পথে খালি পায়ে হাঁটা"),
            ("Unspoken Feelings in the Rain", "বৃষ্টির জলে ধুয়ে যাওয়া না-বলা কথা"),
            ("Fragrance of Wet Soil", "সোঁদা মাটির গন্ধে ভেসে আসা স্মৃতি"),
            ("Waiting by Rupa's Verandah", "রূপার বারান্দার নিচে নিভৃত অপেক্ষা"),
            ("Monsoon Wind Through Curtains", "হাওয়ায় দোলা জানালার নীল পর্দা"),
            ("A Slice of Sunshine in Pocket", "পকেটে লুকিয়ে রাখা এক চিলতে রোদ"),
            ("Midnight Telephone Call", "মধ্যরাতে বেজে ওঠা ল্যান্ডফোনের ঘণ্টা"),
            ("Memories of Shankhanil Karagar", "শঙ্খনীল কারাগারের স্নিগ্ধ স্মৃতি"),
            ("Nuhash Polli's Rain Shadows", "নুহাশ পল্লীর গাছগাছালির ছায়া"),
            ("A Blanket of Silent Tears", "হাসিমুখের আড়ালে লুকানো অশ্রু"),
            ("The Unfinished Love Story", "অসমাপ্ত থেকে যাওয়া অমর ভালোবাসার গল্প"),
            ("Dew Drops on Kadamba Petal", "কদম ফুলের পাপড়িতে জমানো শিশির"),
            ("A Letter Sent to the Clouds", "মেঘেদের ঠিকানায় পাঠানো প্রেমপত্র"),
            ("Smiling Through Heartache", "কষ্ট চেপে রূপার জন্য এক চিলতে হাসি"),
            ("Humayun Ahmed's Nostalgic Card", "হুমায়ূন আহমেদের মুগ্ধ করা পোস্টকার্ড"),
        ]
    },
    '🌾 জীবনানন্দ দাশ': {
        'illustrations': ['boat-river', 'old-letter', 'moonlight-night', 'railway-station', 'lantern-night'],
        'stamps': ['dhaka-gpo', 'chittagong-post', 'wax-seal', 'royal-mail'],
        'borders': ['classic', 'vintage-post', 'aged-stamp', 'double-thin'],
        'patterns': ['parchment', 'aged-paper', 'tea-stained', 'vintage-grid'],
        'recipients': ['নাটোরের বনলতা সেন', 'সুরঞ্জনা', 'শ্যামলী', 'হৃদয়ের মানসী', 'নির্জনতার সাথী', 'পাখির নীড়ের চোখ'],
        'senders': ['ইতি, জীবনানন্দ...', 'ইতি, এক ক্লান্ত পথিক...', 'ইতি, ধানসিঁড়ির এক নিঃসঙ্গ কবি...', 'ইতি, রূপসী বাংলার অনুরাগী...'],
        'dates': ['ধানসিঁড়ির তীরে', 'কুয়াশার ভোর', 'হেমন্তের অপরাহ্নে', 'নভেম্বর ১৯৩৫', 'নক্ষত্রের রাতে', 'রূপসী বাংলায়'],
        'titles': [
            ("Banalata Sen of Natore", "নাটোরের বনলতা সেন ও দুই দণ্ডের শান্তি"),
            ("Mist on the Dhansiri River", "ধানসিঁড়ি নদীর বাঁকে কুয়াশার চাদর"),
            ("Suranjana, Don't Go There", "সুরঞ্জনা, ওইখানে যেয়ো নাকো তুমি"),
            ("A Thousand Years of Wandering", "হাজার বছর ধরে হাঁটার ক্লান্ত পদচিহ্ন"),
            ("Eyes Like a Bird's Nest", "পাখির নীড়ের মতো স্নিগ্ধ চোখ"),
            ("Dhushor Pandulipi Leaves", "ধূসর পাণ্ডুলিপির ঝরা পাতার ঘ্রাণ"),
            ("Autumn Grass and Dewdrops", "হেমন্তের শিশিরভেজা সবুজ কাশবনে"),
            ("Shankhachil Flying in Sky", "শাঁখচিলের ডানায় মেঠো রোদের ছোঁয়া"),
            ("Silence of the Bengal Village", "রূপসী বাংলার নির্জন মেঠোপথ"),
            ("Shadow of the Hijol Tree", "হিজল গাছের তলায় একলা বসে থাকা"),
            ("Faint Bell in the Evening Mist", "সন্ধ্যার কুয়াশায় দূর শাঁখের ধ্বনি"),
            ("The Poet's Solitary Lantern", "কবির টেবিলের নিভু নিভু লণ্ঠন"),
            ("Footprints in the Wet Sand", "নদীতীরে ফেলে যাওয়া পুরনো পদচিহ্ন"),
            ("A Letter from the Mist", "কুয়াশার দেশ থেকে লেখা চিঠি"),
            ("Night Breeze on Bare Fields", "শস্যহীন মাঠের বুকে হিমেল বাতাস"),
            ("The Scent of Ancient Books", "ধুলোমাখা পাণ্ডুলিপির সোঁদা সুবাস"),
            ("Waiting by the Country Boat", "খেয়াঘাটে বাঁধা নিঃসঙ্গ নাও"),
            ("Stars Above the Paddy Fields", "ধানক্ষেতের উপরে অনন্ত নক্ষত্রমালা"),
            ("A Soul Drifting in Darkness", "অন্ধকারের মুখোমুখি বসার প্রশান্তি"),
            ("Memories of Bela Obela", "বেলা অবেলা কালবেলার বিষাদগাথা"),
            ("Gentle Touch of Winter Morning", "কুয়াশাঘেরা শীতের মিষ্টি রোদ"),
            ("The Unseen Beauty of Earth", "পৃথিবীর সবচেয়ে নির্জন রূপ"),
            ("Whispers of the Owl at Night", "লক্ষ্মীপেঁচার ডাকে জেগে থাকা মন"),
            ("A Tear for the Faded Season", "ঝরে যাওয়া পাতার জন্য এক ফোঁটা মায়া"),
            ("Jibanananda's Poetic Postcard", "জীবনানন্দ দাশের কালজয়ী কবিতা পোস্টকার্ড"),
        ]
    },
    '🥀 সুনীল গঙ্গোপাধ্যায়': {
        'illustrations': ['coffee-cup', 'old-letter', 'vintage-rose', 'railway-station', 'lantern-night'],
        'stamps': ['royal-mail', 'love-seal', 'wax-seal', 'dhaka-gpo'],
        'borders': ['gold-filigree', 'classic', 'double-thin', 'vintage-post'],
        'patterns': ['postal-linen', 'parchment', 'parchment-rose', 'tea-stained'],
        'recipients': ['নীরা', 'হৃদয়ের নীরা', 'কলকাতার মানসী', 'প্রিয়তমা', 'অভিমানী মুখ', 'চিরন্তন ভালোবাসা'],
        'senders': ['ইতি, তোমার সুনীল...', 'ইতি, সুনীল...', 'ইতি, তেত্রিশ বছরের অপেক্ষায়...', 'ইতি, এক মুগ্ধ প্রেমিক...'],
        'dates': ['কলকাতা ১৯৭৫', 'কফি হাউজের বিকেলে', 'গোধূলি লগ্ন', 'বর্ষার সন্ধ্যায়', 'তেত্রিশ বছর পর', 'স্মৃতির রাজপথে'],
        'titles': [
            ("Sunil's Thirty-Three Years", "কেউ কথা রাখেনি—তেত্রিশ বছরের দীর্ঘশ্বাস"),
            ("A Thousand Years for Nira", "নীরার জন্য হাজার বছরের অপেক্ষা"),
            ("Coffee House Memories with Nira", "কফি হাউজের আড্ডা ও নীরার মুখ"),
            ("Kolkata Tram & Unsent Letter", "কলকাতার ট্রামলাইন ও না-পাঠানো চিঠি"),
            ("Holding Hands Through Decades", "হাতে হাত রাখার অমলিন অঙ্গীকার"),
            ("Rose Petals for Nira", "নীরার ডায়েরিতে শুকনো গোলাপের পাপড়ি"),
            ("The Midnight Lamppost in Kolkata", "মধ্যরাতের পার্ক স্ট্রিটের ল্যাম্পপোস্ট"),
            ("A River of Drowning Love", "প্রেমের নদী ও সাঁতার না-জানা মন"),
            ("Nira's Incomparable Smile", "নীরার হাসির মায়ায় ভোরের আলো"),
            ("Pride of the Solitary Poet", "প্রেমিকের অহংকার ও নীল খাম"),
            ("A Rainy Evening in College Street", "কলেজ স্ট্রিটে বৃষ্টিভেজা পুরনো বই"),
            ("Waiting by the Gariahat Crossing", "গড়িয়াহাটের মোড়ে দাঁড়িয়ে থাকা চোখ"),
            ("The Letter That Crosses Rivers", "গঙ্গা পার হয়ে আসা ভালোবাসার চিঠি"),
            ("Sunil's Passionate Vow", "নীরার প্রতি একনিষ্ঠ আত্মনিবেদন"),
            ("Echoes of a Forgotten Promise", "ভুলে যাওয়া সেই প্রতিশ্রুতির সুর"),
            ("The Scent of Nostalgic Coffee", "চায়ের ধোঁয়া আর মিষ্টি অনুভূতির বিকেল"),
            ("A Love That Defies Time", "কালের ভ্রুকুটি উপেক্ষা করা প্রেম"),
            ("Unopened Envelope of Tears", "অশ্রুতে ভেজা না-খোলা খামের গোপন কথা"),
            ("Walking Down the Rain-Washed Alleys", "বৃষ্টিস্নাত গলিপথে নীরার হাত ধরে"),
            ("Soul Bound to Nira Forever", "নীরার মায়াজালে আজীবন বন্দি মন"),
            ("The Poet's Restless Heart", "কবির বুকের অবাধ্য ব্যাকুলতা"),
            ("Letters from the 70s", "সত্তরের দশকের স্বর্ণালী প্রেমপত্র"),
            ("Shadows in the Dusk", "গোধূলির আবছায়ায় ফুটে ওঠা মুখ"),
            ("The Magic of Nira's Touch", "নীরার আঙুলের স্পর্শের সেই অমৃত"),
            ("Sunil Gangopadhyay's Nira Postcard", "সুনীল গঙ্গোপাধ্যায়ের নীরা পোস্টকার্ড"),
        ]
    },
    '🍂 রুদ্র মুহম্মদ শহিদুল্লাহ': {
        'illustrations': ['moonlight-night', 'old-letter', 'boat-river', 'vintage-rose', 'lantern-night'],
        'stamps': ['dhaka-gpo', 'love-seal', 'chittagong-post', 'wax-seal'],
        'borders': ['ornate', 'classic', 'vintage-post', 'aged-stamp'],
        'patterns': ['tea-stained', 'parchment', 'kraft', 'aged-paper'],
        'recipients': ['হৃদয় জুড়ে থাকা মানুষ', 'আকাশের ঠিকানায়', 'প্রিয়তমা', 'অন্তরঙ্গ সুহৃদ', 'দূর দিগন্তের মানসী', 'অভিমানী পাখি'],
        'senders': ['ইতি, তোমার রুদ্র...', 'ইতি, রুদ্র...', 'ইতি, এক যাযাবর কবি...', 'ইতি, ভেতরের খাঁটি বাউল...', 'ইতি, অন্তরের রুদ্র...'],
        'dates': ['আকাশের ঠিকানায়', 'মংলা বন্দর', 'নিঝুম রাতে', 'শ্রাবণের ধারায়', 'একাকী সন্ধ্যায়', 'স্মৃতির চত্বরে'],
        'titles': [
            ("Write to Heaven's Address", "ভালো আছি ভালো থেকো—আকাশের ঠিকানায় চিঠি"),
            ("Inside and Out, Deep in Heart", "আমার ভিতর বাহিরে অন্তরে অন্তরে"),
            ("Leaving is Not Parting", "চলে যাওয়া মানে প্রস্থান নয়"),
            ("Searching in the Land of Stars", "নক্ষত্রের দেশে তোমায় খোঁজা"),
            ("The Emperor Who Lost Everything", "ভালোবাসার নিঃস্ব সম্রাটের চিঠি"),
            ("Wounds Turned into Melody", "বুকের ক্ষত যখন গান হয়ে বাজে"),
            ("A Wildflower on My Grave", "সমাধিতে একগুচ্ছ বুনোফুলের আকুতি"),
            ("The Rebel's Tender Love", "দ্রোহের কবির নিভৃত প্রেমের আর্তনাদ"),
            ("Tears Mixed with Raindrops", "বৃষ্টির জলে গোপন চোখের জল"),
            ("Unwritten Poem on Faded Leaf", "ঝরা পাতার বুকে না-লেখা কবিতা"),
            ("A Solitary Bird in Migratory Flight", "যাযাবর পাখির একলা নীড়ের স্বপ্ন"),
            ("Whispers in Mongla Port Dusk", "মংলা পোর্টের গোধূলিতে একলা অপেক্ষা"),
            ("Burning in the Embers of Memory", "স্মৃতির অনলে পোড়া খাঁটি ভালোবাসা"),
            ("Pure Love Without Deception", "কোনো ভণিতা ছাড়া উজাড় করা মন"),
            ("Holding Your Memory in Scent", "নিশ্বাসে টের পাওয়া তোমার সুবাস"),
            ("The Unconquered Heart of Rudra", "চোখের জলের কাছে হেরে যাওয়া কবি"),
            ("Stormy River and Solitary Soul", "উত্তাল নদীর কূলে রুদ্রের পদধ্বনি"),
            ("Words Sealed in Blood-Red Wax", "রক্তিম গালায় মোড়ানো আকুল চিঠি"),
            ("The Smile That Calmed the War", "তোমার সেই হাসিতে যুদ্ধের অবসান"),
            ("A Companion in the Deepest Night", "নিশীথ রাতের একমাত্র সহযাত্রী"),
            ("Destined Across the Distances", "দূরত্বের মাঝে অমর প্রেমগাথা"),
            ("Echoes of Rudra's Guitar", "গীটারের তারে ঝরে পড়া বিরহের সুর"),
            ("Letter Carried by the Wind", "উদাসীন বাতাসে ভাসিয়ে দেওয়া চিঠি"),
            ("The Silent Prayer of Love", "তোমার মঙ্গলে নিবেদিত প্রার্থনা"),
            ("Rudra's Immortal Postcard", "রুদ্র মুহম্মদ শহিদুল্লাহর কালজয়ী পোস্টকার্ড"),
        ]
    }
}

def main():
    # Read existing postcards.ts
    with open('src/data/postcards.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find highest existing vp ID
    pattern = r'\{\s*\"id\":\s*\"vp(\d+)\"'
    ids = re.findall(pattern, content)
    last_num = 350
    if ids:
        last_num = max(int(i) for i in ids)
    print(f"Current highest postcard ID: vp{last_num:03d}")

    new_postcards = []
    current_num = last_num + 1

    for cat_name, meta in AUTHOR_POSTCARD_METAS.items():
        q_list = quotes_by_cat.get(cat_name, [])
        titles = meta['titles']
        ill_list = meta['illustrations']
        st_list = meta['stamps']
        b_list = meta['borders']
        p_list = meta['patterns']
        rec_list = meta['recipients']
        sen_list = meta['senders']
        date_list = meta['dates']

        print(f"Generating 25 postcards for '{cat_name}' (available quotes: {len(q_list)})...")

        for idx in range(25):
            en_title, bn_title = titles[idx % len(titles)]
            # Pick a quote
            quote_tuple = q_list[idx % len(q_list)] if q_list else ("ভালোবাসা এক চিরন্তন অনুভূতি...", cat_name)
            quote_text = quote_tuple[0]
            rec = rec_list[idx % len(rec_list)]
            sen = sen_list[idx % len(sen_list)]
            dat = date_list[idx % len(date_list)]
            ill = ill_list[idx % len(ill_list)]
            st = st_list[idx % len(st_list)]
            border = b_list[idx % len(b_list)]
            pat = p_list[idx % len(p_list)]

            postcard_id = f"vp{current_num:03d}"
            desc = f"{bn_title} — {cat_name} ক্যাটাগরির একটি কালজয়ী ভিন্টেজ পোস্টকার্ড ডিজাইন।"

            new_postcards.append({
                "id": postcard_id,
                "title": en_title,
                "titleBn": bn_title,
                "category": cat_name,
                "collection": "classic" if idx % 2 == 0 else "popular",
                "defaultQuote": quote_text,
                "defaultRecipient": rec,
                "defaultSender": sen,
                "defaultDate": dat,
                "textPosition": {
                    "x": 50,
                    "y": 50,
                    "align": "center"
                },
                "style": {
                    "fontFamily": "Elegant Bengali" if idx % 3 == 0 else ("Vintage Serif" if idx % 3 == 1 else "Handwritten"),
                    "fontSize": 23,
                    "textColor": "#fdf6e2",
                    "bold": False,
                    "italic": False,
                    "letterSpacing": 0.5,
                    "lineHeight": 1.6
                },
                "borderStyle": border,
                "stampType": st,
                "accentColor": "#c5a059" if idx % 4 == 0 else ("#dfb76c" if idx % 4 == 1 else ("#d4af37" if idx % 4 == 2 else "#b8860b")),
                "bgPattern": pat,
                "illustrationType": ill,
                "description": desc
            })
            current_num += 1

    print(f"Total new postcards generated: {len(new_postcards)}. New last ID: vp{current_num-1:03d}")

    # Build JSON string for insertion
    new_cards_str = ""
    for card in new_postcards:
        new_cards_str += f"""  {{
    "id": "{card['id']}",
    "title": {json.dumps(card['title'], ensure_ascii=False)},
    "titleBn": {json.dumps(card['titleBn'], ensure_ascii=False)},
    "category": {json.dumps(card['category'], ensure_ascii=False)},
    "collection": "{card['collection']}",
    "defaultQuote": {json.dumps(card['defaultQuote'], ensure_ascii=False)},
    "defaultRecipient": {json.dumps(card['defaultRecipient'], ensure_ascii=False)},
    "defaultSender": {json.dumps(card['defaultSender'], ensure_ascii=False)},
    "defaultDate": {json.dumps(card['defaultDate'], ensure_ascii=False)},
    "textPosition": {{
      "x": 50,
      "y": 50,
      "align": "center"
    }},
    "style": {{
      "fontFamily": "{card['style']['fontFamily']}",
      "fontSize": 23,
      "textColor": "#fdf6e2",
      "bold": false,
      "italic": false,
      "letterSpacing": 0.5,
      "lineHeight": 1.6
    }},
    "borderStyle": "{card['borderStyle']}",
    "stampType": "{card['stampType']}",
    "accentColor": "{card['accentColor']}",
    "bgPattern": "{card['bgPattern']}",
    "illustrationType": "{card['illustrationType']}",
    "description": {json.dumps(card['description'], ensure_ascii=False)}
  }},\n"""

    last_bracket_idx = content.rfind('];')
    if last_bracket_idx == -1:
        raise Exception("Could not find closing '];' in src/data/postcards.ts")

    updated_content = content[:last_bracket_idx] + new_cards_str + content[last_bracket_idx:]

    with open('src/data/postcards.ts', 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print(f"Successfully updated src/data/postcards.ts! Total postcards now: {len(ids) + len(new_postcards)}")

if __name__ == '__main__':
    main()
