#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates 350 Postcard Templates (25 per category for all 14 categories)
Preserves original cards (vp001 to vp030) and enriches every category.
"""
import re
import json

# Read quotes from src/data/quotes.ts
with open('src/data/quotes.ts', 'r', encoding='utf-8') as f:
    q_content = f.read()

pattern = r'\{\s*\"id\":\s*\"([^\"]+)\",\s*\"text\":\s*\"([^\"]+)\",\s*\"category\":\s*\"([^\"]+)\",\s*\"author\":\s*\"([^\"]+)\"\s*\}'
matches = re.findall(pattern, q_content)

from collections import defaultdict
quotes_by_cat = defaultdict(list)
for qid, qtext, qcat, qauthor in matches:
    quotes_by_cat[qcat].append((qtext, qauthor))

CATEGORY_CONFIGS = {
    '❤️ প্রেম': {
        'illustrations': ['boat-river', 'vintage-rose', 'old-letter', 'lantern-night', 'coffee-cup', 'gramophone-melody'],
        'stamps': ['love-seal', 'vintage-rose', 'dhaka-gpo', 'wax-seal', 'royal-mail'],
        'borders': ['classic', 'gold-filigree', 'double-thin', 'vintage-post', 'aged-stamp'],
        'patterns': ['parchment', 'aged-paper', 'parchment-rose', 'postal-linen', 'tea-stained'],
        'recipients': ['প্রাণের মানুষ', 'প্রিয়তমা', 'হৃদয়ের মানসী', 'ভালোবাসার মানুষ', 'চিরন্তন সাথী', 'মনচোর', 'অন্তরতম'],
        'senders': ['ইতি, তোমার চিরসাথী...', 'ইতি, তোমার একনিষ্ঠ...', 'ইতি, একান্ত তোমার...', 'ইতি, অনন্ত ভালোবাসায়...', 'ইতি, মুগ্ধ পথিক...'],
        'dates': ['চিরকালের ভালোবাসায়', 'গোধূলি লগ্ন', 'বসন্ত ১৪৩১', 'শ্রাবণ ১৪৩২', 'ফাল্গুনী বিকেল', 'একাকী সন্ধ্যায়'],
        'titles': [
            ("River Sunset & Vermilion", "নদীর বুক ও গোধূলির সিঁদুর"),
            ("Eternal Soul Connection", "চিরন্তন প্রেমের পরশ"),
            ("Whispers of the Soul", "হৃদয়ের গোপন কথা"),
            ("Ties of Affection", "মায়ার বাঁধন ও ভালোবাসা"),
            ("Silent Touch of Love", "নিঃশব্দ ভালোবাসার ছোঁয়া"),
            ("First Glance Romance", "প্রথম দেখার ভালোলাগা"),
            ("Companion for Eternity", "চিরদিনের সাথী"),
            ("Song of Heartbeats", "হৃদস্পন্দনের গান"),
            ("Gentle Aura of Love", "স্নিগ্ধ প্রেমের আবেশ"),
            ("Moonlit Amour", "চাঁদের আলো ও প্রেম"),
            ("Boundless Devotion", "অতলান্ত ভালোবাসা"),
            ("Tapestry of Emotions", "অনুভূতির মায়াজাল"),
            ("Golden Chapter of Love", "প্রেমের সোনালী অধ্যায়"),
            ("You in My Depths", "মনের গহীনে তুমি"),
            ("Unbreakable Soul Bond", "অটুট আত্মিক বন্ধন"),
            ("Love Means You", "ভালোবাসা মানেই তুমি"),
            ("Spring Love Breeze", "বসন্তের প্রেমমাখা চিঠি"),
            ("Language of the Eyes", "চোখের ভাষায় ভালোবাসা"),
            ("Colorful Moments of Love", "প্রণয়ের রঙিন মুহূর্ত"),
            ("Taj Mahal of the Heart", "হৃদয়ের তাজমহল"),
            ("Eternal Melody of Love", "অনন্ত প্রেমের সুর"),
            ("Azure Sky of Devotion", "ভালোবাসার নীল আকাশ"),
            ("Rendezvous of Two Hearts", "দুটি মনের অভিসার"),
            ("Selfless Gift of Love", "নিঃস্বার্থ প্রেমের উপহার"),
            ("Lifetime Epic of Love", "একজীবনের প্রেমগাথা"),
        ]
    },
    '🌹 রোমান্টিক': {
        'illustrations': ['vintage-rose', 'coffee-cup', 'boat-river', 'old-letter', 'lantern-night'],
        'stamps': ['vintage-rose', 'love-seal', 'wax-seal', 'dhaka-gpo', 'chittagong-post'],
        'borders': ['gold-filigree', 'classic', 'double-thin', 'aged-stamp'],
        'patterns': ['parchment-rose', 'floral-vintage', 'parchment', 'postal-linen'],
        'recipients': ['প্রিয় মানুষ', 'গোলাপী রোদ', 'মায়াবী চোখ', 'স্নিগ্ধ সুবাস', 'একলা চাঁদ'],
        'senders': ['ইতি, একান্ত তোমার...', 'ইতি, গোলাপের অনুরাগী...', 'ইতি, চিরকালের মুগ্ধ...', 'ইতি, তোমার সুহৃদ...'],
        'dates': ['বসন্ত ১৪৩১', 'রঙিন গোধূলি', 'ফাগুন হাওয়া', 'ঝরা পাতার দিন', 'নীল জোছনায়'],
        'titles': [
            ("Vintage Rose & Letter", "শুকনো গোলাপ ও নীল চিঠি"),
            ("Crimson Rose Garden", "রক্তগোলাপ ও প্রেমকাব্য"),
            ("Aroma of Crimson Bloom", "গোলাপের সুবাস ও সুরভিত মন"),
            ("Romantic Evening Tea", "এক কাপ চা ও তুমি"),
            ("Velvet Touch of Romance", "স্নিগ্ধ রোমান্টিক ছোঁয়া"),
            ("Boat Ride at Twilight", "গোধূলির খেয়ানৌকা"),
            ("Fragrant Garden of Love", "প্রেমের বাগান ও পাপড়ি"),
            ("Whispering Rose Petals", "গোলাপের পাপড়ির ফিসফাস"),
            ("Sunset Kiss on Horizon", "দিগন্তে সূর্যের চুম্বন"),
            ("Coffee & Sweet Thoughts", "কফির ধোঁয়া ও মিষ্টি ভাবনা"),
            ("Enchanted Rosebud", "মায়াবী গোলাপের কুঁড়ি"),
            ("Serenade of the Heart", "হৃদয়ের রোমান্টিক গান"),
            ("Scent of Vintage Love", "ভিন্টেজ প্রেমের সুবাস"),
            ("Golden Twilight Glow", "সোনালী গোধূলির মায়া"),
            ("Petals of Affection", "ভালোবাসার লাল পাপড়ি"),
            ("River of Tender Care", "স্নেহমাখা নদীর ধারা"),
            ("Chai and Endless Talks", "চায়ের কাপে অন্তহীন গল্প"),
            ("Romantic Moonlight Walk", "চাঁদের আলোয় পথচলা"),
            ("Vintage Bouquet of Dreams", "স্বপ্নের ভিন্টেজ তোড়া"),
            ("Echoes of Sweet Romance", "মিষ্টি রোমান্সের প্রতিধ্বনি"),
            ("Rose Petal Diary", "গোলাপের পাতার ডায়েরি"),
            ("Warm Embrace at Dusk", "সন্ধ্যার উষ্ণ আলিঙ্গন"),
            ("Love Blooms in Silence", "নীরবে ফোটা ভালোবাসা"),
            ("Gilded Rose Keepsake", "সোনালী গোলাপের স্মৃতিচিহ্ন"),
            ("Timeless Romantic Vow", "চিরন্তন রোমান্টিক অঙ্গীকার"),
        ]
    },
    '💔 বিরহ': {
        'illustrations': ['moonlight-night', 'railway-station', 'old-letter', 'lantern-night', 'boat-river'],
        'stamps': ['vintage-rose', 'wax-seal', 'chittagong-post', 'dhaka-gpo'],
        'borders': ['aged-stamp', 'classic', 'vintage-post', 'postage-perforated'],
        'patterns': ['tea-stained', 'aged-paper', 'kraft', 'postal-linen'],
        'recipients': ['হারিয়ে যাওয়া মানুষ', 'যার স্মৃতি আজও কাঁদায়', 'অচেনা পথিক', 'দূর আকাশের তারা', 'প্রাক্তন সুহৃদ'],
        'senders': ['ইতি, নিঃস্ব পথিক...', 'ইতি, অপূর্ণ ভালোবাসা...', 'ইতি, এক নিঃসঙ্গ সত্তা...', 'ইতি, নীরব আঁধার...'],
        'dates': ['অপেক্ষার প্রহর', 'একাকী মধ্যরাত', 'স্মৃতির গোধূলি', 'কুয়াশার ভোর', 'হাহাকারের রাত'],
        'titles': [
            ("Autumn Melancholy Leaf", "বিরহের ঝরা পাতা ও নদী"),
            ("Silent Tears of Separation", "নীরব বিরহ ও চোখের জল"),
            ("Unsent Letter in the Dark", "অন্ধকারে না-পাঠানো চিঠি"),
            ("Empty Railway Platform", "শূন্য প্ল্যাটফর্ম ও দীর্ঘশ্বাস"),
            ("Faded Footsteps in the Mist", "কুয়াশায় মিলিয়ে যাওয়া পদচিহ্ন"),
            ("Moonlit Grief of Parting", "জোছনায় লুকানো বিরহ"),
            ("Broken String of Sitar", "ছেঁড়া তারের করুণ সুর"),
            ("Echoes in the Empty Room", "শূন্য ঘরের প্রতিধ্বনি"),
            ("Tears Dissolved in Rain", "বৃষ্টিতে ধুয়ে যাওয়া কান্না"),
            ("Shadows of What Was", "হারিয়ে যাওয়ার দীর্ঘ ছায়া"),
            ("The Last Train Left", "শেষ ট্রেন চলে যাওয়ার পর"),
            ("Silent Screams of Longing", "নীরব বুকের হাহাকার"),
            ("Withered Flower in Diary", "ডায়েরির শুকিয়ে যাওয়া ফুল"),
            ("The Distance Between Us", "আমাদের মাঝের যোজন দূরত্ব"),
            ("Unanswered Letters", "উত্তরহীন শত চিঠি"),
            ("Solitary Night Lamp", "একাকী ল্যাম্পপোস্টের আলো"),
            ("Tears on the Window Glass", "জানালায় অশ্রুর ফোঁটা"),
            ("Grief by the Riverside", "নদীর পাড়ে বসে কাঁদা"),
            ("The Pain of Forgetting", "ভুলে যাওয়ার তীব্র যন্ত্রণা"),
            ("Cold Winter Heart", "শীতের হিমেল শূন্যতা"),
            ("Memories That Haunt", "যে স্মৃতি ঘুম কেড়ে নেয়"),
            ("The Unfinished Melody", "অসমাপ্ত বিরহের গান"),
            ("Shattered Glass of Hope", "ভেঙে যাওয়া কাঁচের আশা"),
            ("Farewell Without Words", "নীরব বিদায়ের দীর্ঘশ্বাস"),
            ("Wandering Soul in Grief", "বিরহী মনের বিষাদগাথা"),
        ]
    },
    '🥺 মিস করা': {
        'illustrations': ['railway-station', 'old-letter', 'post-box', 'moonlight-night', 'coffee-cup'],
        'stamps': ['chittagong-post', 'dhaka-gpo', 'air-mail', 'love-seal'],
        'borders': ['vintage-post', 'classic', 'postage-perforated', 'aged-stamp'],
        'patterns': ['aged-paper', 'parchment', 'kraft', 'postal-linen'],
        'recipients': ['দূরের মানুষ', 'প্রিয়তমা', 'দূর আকাশের চাঁদ', 'প্রাণসখা', 'যাকে প্রতি পলকে মনে পড়ে'],
        'senders': ['ইতি, দূর পরবাসী...', 'ইতি, ব্যাকুল মন...', 'ইতি, পথ চেয়ে থাকা চোখ...', 'ইতি, এক উদাসী মন...'],
        'dates': ['দূরত্বের দিনগুলি', 'অপেক্ষার প্রহর', 'শ্রাবণের মেঘ', 'একাকী গোধূলি', 'প্রবাসের রাত'],
        'titles': [
            ("Platform of Waiting", "রেলস্টেশনের প্ল্যাটফর্ম ও প্রতীক্ষা"),
            ("Beloved Missing You So Much", "তোমায় ভীষণ মনে পড়ে"),
            ("Longing Across the Miles", "দূরত্ব ঘুচিয়ে কাছে পাওয়া"),
            ("Postbox of Yearning", "চিঠির বাক্সে ব্যাকুল আকুতি"),
            ("Waiting by the Old Station", "পুরনো স্টেশনে একা অপেক্ষা"),
            ("Every Beat Calls Your Name", "হৃদয়ের প্রতিটি ডাক তোমার নামে"),
            ("Distant Star, Close Heart", "দূরের তারা, নিকটের মন"),
            ("Empty Chair by the Tea Table", "চায়ের টেবিলের শূন্য চেয়ার"),
            ("Counting Days in Silence", "দিন গুনার নিঃশব্দ প্রহর"),
            ("Your Memory in Cold Breeze", "হিমেল হাওয়ায় তোমার ছোঁয়া"),
            ("Looking at the Distant Horizon", "দূর দিগন্তে অপলক দৃষ্টি"),
            ("Tears of Missing You", "মনে পড়ার গোপন অশ্রু"),
            ("Night Lamp and Sleepless Eyes", "রাতের বাতি ও নির্ঘুম চোখ"),
            ("Letter Carried by the Clouds", "মেঘে পাঠানো আকুতি"),
            ("Unspoken Cravings of Heart", "বুকের ভেতরের না-বলা কথা"),
            ("When Silence Reminds of You", "নিস্তব্ধতায় তোমার উপস্থিতি"),
            ("A Mile Away, Heart Nearby", "শরীর দূরে মন তো কাছেই"),
            ("Faded Photograph on Table", "টেবিলে রাখা মলিন ছবি"),
            ("Your Voice in My Echoes", "কানে বাজে তোমার কণ্ঠস্বর"),
            ("Waiting for the Postman", "ডাকপিয়নের সাইকেলের ঘণ্টা"),
            ("Missing Your Laughter", "তোমার হাসির মধুর স্মৃতি"),
            ("The Coldness of Absence", "তোমার অনুপস্থিতির শূন্যতা"),
            ("Yearning Heartbeats", "কাতর হৃদয়ের ব্যাকুলতা"),
            ("A Thousand Thoughts of You", "তোমাকে নিয়ে সহস্র ভাবনা"),
            ("Come Back Soon, My Love", "শীঘ্রই ফিরে এসো প্রিয়"),
        ]
    },
    '🌧️ বৃষ্টি': {
        'illustrations': ['rainy-umbrella', 'bengali-kadam', 'boat-river', 'lantern-night', 'coffee-cup'],
        'stamps': ['dhaka-gpo', 'wax-seal', 'love-seal', 'royal-mail'],
        'borders': ['gold-filigree', 'classic', 'double-thin', 'aged-stamp'],
        'patterns': ['rainy-vintage', 'parchment', 'tea-stained', 'aged-paper'],
        'recipients': ['বৃষ্টির মানসী', 'কদম ফুল', 'মেঘবালিকা', 'বৃষ্টিবিলাসী প্রিয়', 'শ্রাবণ কন্যা'],
        'senders': ['ইতি, তোমার মেঘপিয়ন...', 'ইতি, তোমার শ্রাবণ মেঘ...', 'ইতি, এক বর্ষাপ্রেমী...', 'ইতি, বৃষ্টির জল...'],
        'dates': ['শ্রাবণ ১৪৩২', 'আষাঢ়ের দুপুর', 'বর্ষা ১৪৩১', 'ঝুম বৃষ্টির দিন', 'শ্রাবণী পূর্ণিমা'],
        'titles': [
            ("Rainy Love", "বৃষ্টিভেজা ভালোবাসা"),
            ("Monsoon Melody & Kadam", "কদম ফুল ও আষাঢ়ের বৃষ্টি"),
            ("Kadam Monsoon Blossom", "কদম ফুল ও শ্রাবণ ধারা"),
            ("Windowpane Raindrops", "কাঁচের জানালায় বৃষ্টির ফোঁটা"),
            ("Cup of Tea in Rain", "বৃষ্টির দিনে ধোঁয়া ওঠা চা"),
            ("Umbrella for Two", "এক ছাতার নিচে দুটি মন"),
            ("Pitter Patter of Monsoon", "ঝুম বৃষ্টির রিনিঝিনি গান"),
            ("Fresh Scent of Wet Earth", "সোঁদা মাটির ভেজা সুবাস"),
            ("River Swollen with Rain", "বৃষ্টিস্নাত নদীর যৌবন"),
            ("Kadam Garland for You", "তোমার জন্য কদম ফুলের মালা"),
            ("Monsoon Longing & Letters", "বর্ষার চিঠি ও আকুলতা"),
            ("Rainy Afternoon Slumber", "বৃষ্টিমুখর অলস দুপুর"),
            ("Paper Boats in Puddle", "বৃষ্টির জলে কাগজের নৌকা"),
            ("Thunder and Warmth", "মেঘের ডাক ও নিবিড় মায়া"),
            ("Walking in Monsoon Shower", "বৃষ্টিতে ভিজে বাড়ি ফেরা"),
            ("Greenery after Rainfall", "বৃষ্টিভেজা সবুজ প্রকৃতি"),
            ("Rain Cloud Silhouette", "কালো মেঘের ঘনঘটা"),
            ("Reflections in Water", "বৃষ্টির জলে তোমার প্রতিচ্ছবি"),
            ("Monsoon Ghazal", "বর্ষার সুর ও রোমান্টিক গজল"),
            ("Raindrops on Green Leaves", "সবুজ পাতায় মুক্তোর কণা"),
            ("Rainy Night Serenade", "ঝুম বৃষ্টির শান্ত রাত"),
            ("Fragrance of Kadam Tree", "কদম গাছের মিষ্টি সুবাস"),
            ("Drenched in Your Love", "তোমার প্রেমে ভিজে যাওয়া"),
            ("The Eternal Rainy Mood", "চিরন্তন বর্ষার নস্টালজিয়া"),
            ("Monsoon Romance Sealed", "বৃষ্টিতে মোড়ানো ভালোবাসা"),
        ]
    },
    '🌙 রাতের অনুভূতি': {
        'illustrations': ['moonlight-night', 'lantern-night', 'coffee-cup', 'railway-station'],
        'stamps': ['wax-seal', 'dhaka-gpo', 'love-seal', 'royal-mail'],
        'borders': ['gold-filigree', 'classic', 'aged-stamp', 'double-thin'],
        'patterns': ['postal-linen', 'tea-stained', 'aged-paper', 'parchment'],
        'recipients': ['রাতের শুকতারা', 'চাঁদের আলো', 'নিশাচর মন', 'স্বপ্নের রানি', 'ঘুমহীন নয়ন'],
        'senders': ['ইতি, নিশাচর মন...', 'ইতি, একাকী রাতজাগা পাখি...', 'ইতি, চাঁদের আলো...', 'ইতি, নিঃশব্দ ভাবুক...'],
        'dates': ['মধ্যরাত্রি', 'নিঝুম রাত', 'অমাবস্যার আলো', 'পূর্ণিমার জোছনা', 'ভোরের আগের ক্ষণ'],
        'titles': [
            ("Midnight Moon & River", "মধ্যরাতের নদী ও চাঁদ"),
            ("Midnight Moon Gazing", "নিঝুম রাত ও চাঁদের ছায়া"),
            ("Whispering Night Breeze", "রাতের বাতাসের ফিসফাস"),
            ("Lantern Glow at 2 AM", "রাত দুটোর লণ্ঠনের আলো"),
            ("Moonlit River Solitude", "জোছনায় ভাসা নির্জন নদী"),
            ("Sleepless Midnight Thoughts", "নির্ঘুম রাতের যত ভাবনা"),
            ("Starlit Canopy of Dreams", "তারাভরা আকাশ ও স্বপ্ন"),
            ("Silence of the Sleeping City", "ঘুমন্ত শহরের নিস্তব্ধতা"),
            ("Coffee Mug Under the Moon", "চাঁদের নিচে কফির মগ"),
            ("Midnight Poetry by Hand", "মধ্যরাতে লেখা গোপন কবিতা"),
            ("Shadow of the Full Moon", "পূর্ণিমার চাঁদের স্নিগ্ধ রূপ"),
            ("The Quiet Hours of Love", "ভালোবাসার গভীর নিস্তব্ধতা"),
            ("Counting Stars on the Roof", "ছাদে বসে তারা গোনা"),
            ("Midnight Cigarette and Memory", "রাতের স্তব্ধতা ও স্মৃতিচারণ"),
            ("The Gentle Moonlight Bath", "জ্যোৎস্নায় স্নান করা মন"),
            ("Cricket Chimes in Darkness", "ঝিঁঝিঁ পোকার একঘেয়ে ডাক"),
            ("A Soul Awake at 3 AM", "ভোরের অপেক্ষায় জাগা মন"),
            ("Secret Wishes in Starlight", "তারার কাছে গোপন প্রার্থনা"),
            ("Window Frame of Moonlight", "জানালায় এলিয়ে পড়া চাঁদ"),
            ("Midnight Nostalgic Wave", "রাতের বুকের স্মৃতির ঢেউ"),
            ("Candle Burning Down", "নিভে আসা মোমবাতির শিখা"),
            ("The Deepest Hour of Night", "রাতের সবচেয়ে গভীর প্রহর"),
            ("Dreaming of Your Hand", "স্বপ্নে তোমার হাত ছোঁয়া"),
            ("Whispers in the Dark", "অন্ধকারে হৃদয়ের সুর"),
            ("Morning Light Creeping In", "রাতের বিদায় ও উষার আলো"),
        ]
    },
    '💌 প্রেমপত্র': {
        'illustrations': ['old-letter', 'post-box', 'vintage-rose', 'gramophone-melody'],
        'stamps': ['dhaka-gpo', 'wax-seal', 'royal-mail', 'love-seal', 'chittagong-post'],
        'borders': ['classic', 'vintage-post', 'aged-stamp', 'double-thin'],
        'patterns': ['parchment', 'aged-paper', 'tea-stained', 'kraft'],
        'recipients': ['প্রাণাধিক প্রিয়', 'সুহৃদ', 'হৃদয়ের রানি', 'অচেনা ভালোবাসা', 'পত্রের মানসী'],
        'senders': ['ইতি, সেকালের ঢাকা...', 'ইতি, তোমার পত্রলেখক...', 'ইতি, নীরব কলম...', 'ইতি, বুকপকেটের চিঠি...'],
        'dates': ['বৈশাখ ১৩৯২', 'শ্রাবণ ১৩৮৫', 'বসন্তের চিঠি', 'নিশুতি রাতে', 'সোনালী অতীত'],
        'titles': [
            ("Dhaka GPO Vintage Letter", "ঢাকা জিপিও ও প্রেমপত্র"),
            ("Secret Diary Unsent Note", "না-পাঠানো চিঠির খাম"),
            ("Blue Letter Envelope", "নীল খামে মোড়ানো চিঠি"),
            ("Fragrant Scent of Paper", "চিঠির কাগজের মিষ্টি সুবাস"),
            ("Sealed with Warm Red Wax", "গালা দিয়ে সিল করা খাম"),
            ("Handwritten Love in Ink", "দোয়াত-কালিতে লেখা প্রেমপত্র"),
            ("Letter Waiting in Postbox", "লাল ডাকবাক্সে অপেক্ষমাণ চিঠি"),
            ("Postman's Bicycle Bell", "পিয়নের সাইকেলের মিষ্টি বেল"),
            ("Letter from a Distant Town", "দূর মফস্বল থেকে আসা চিঠি"),
            ("Torn Paper of Memories", "স্মৃতির ছেঁড়া পাতার চিঠি"),
            ("The Very First Love Letter", "জীবনের প্রথম প্রেমপত্র"),
            ("Vintage Postcard to You", "তোমার ঠিকানায় ভিন্টেজ কার্ড"),
            ("Envelope with Pressed Rose", "গোলাপের পাপড়ি দেওয়া খাম"),
            ("Old Ink on Aged Paper", "হলুদ পাতায় পুরনো কালির টান"),
            ("Letter Kept in Pocket", "বুকপকেটে যত্নে রাখা চিঠি"),
            ("Unopened Letter of Love", "না-খোলা খামের গোপন কথা"),
            ("Airmail Letter Across Sea", "সমুদ্র পেরিয়ে আসা এয়ারমেল"),
            ("Handwritten Vows of Forever", "চিরকাল পাশে থাকার অঙ্গীকারপত্র"),
            ("Letter Read a Thousand Times", "হাজারবার পড়া প্রিয় চিঠি"),
            ("Words That Never Fade", "যে চিঠির কথা মুছে যায় না"),
            ("Postcard Stamped in 1985", "১৯৮৫ সালের ডাকটিকিট"),
            ("Yellow Envelope of Nostalgia", "নস্টালজিয়ার হলুদ খাম"),
            ("The Scent of Nostalgic Ink", "পুরনো চিঠির সোঁদা গন্ধ"),
            ("Every Word Written for You", "প্রতিটি হরফ তোমায় নিয়ে"),
            ("Final Letter Sealed with Love", "ভালোবাসায় মোড়ানো শেষ চিঠি"),
        ]
    },
    '💍 প্রপোজ': {
        'illustrations': ['vintage-rose', 'lantern-night', 'boat-river', 'coffee-cup', 'old-letter'],
        'stamps': ['love-seal', 'wax-seal', 'royal-mail', 'vintage-rose'],
        'borders': ['gold-filigree', 'classic', 'double-thin'],
        'patterns': ['floral-vintage', 'parchment-rose', 'parchment', 'postal-linen'],
        'recipients': ['জীবনের সাথী', 'আমার ভবিষ্যৎ', 'চিরকালের অর্ধাঙ্গিনী', 'হৃদয়ের রানি', 'ভালোবাসার মানসী'],
        'senders': ['ইতি, তোমার একনিষ্ঠ প্রেমিক...', 'ইতি, তোমার ভবিষ্যৎ সাথী...', 'ইতি, আজীবন ভালোবাসায়...', 'ইতি, তোমার বর...'],
        'dates': ['চিরঅঙ্গীকারে', 'নতুন সূচনায়', 'ভালোবাসার দিবসে', 'গোধূলি লগ্নে', 'আজ এবং চিরকাল'],
        'titles': [
            ("Riverboat Proposal", "নৌভ্রমণে প্রেমের প্রস্তাব"),
            ("Lifelong Proposal Oath", "সারাজীবন পাশে থাকার অঙ্গীকার"),
            ("Will You Walk with Me?", "আমার সাথে পথ চলবে কি?"),
            ("Ring in a Velvet Box", "ভেলভেট বাক্সে রূপালী আংটি"),
            ("Kneeling by the Riverside", "নদীতীরে হাঁটু গেড়ে প্রস্তাব"),
            ("Together for All Tomorrows", "আমাদের সকল আগামীকালের জন্য"),
            ("Say Yes Under the Stars", "তারার আলোয় সম্মতি দাও"),
            ("A Lifetime Promise", "একজীবনের পবিত্র প্রতিশ্রুতি"),
            ("Holding Your Hand Forever", "তোমার হাত ধরে সারাজীবন"),
            ("Will You Be My Home?", "তুমি কি হবে আমার নীড়?"),
            ("The Proposal in Candlelight", "মোমবাতির আলোয় ভালোবাসার প্রস্তাব"),
            ("A Simple Ring, Pure Love", "সাধারণ আংটি, অসাধারণ প্রেম"),
            ("Step into My World", "আমার ভুবনে স্বাগতম"),
            ("Let's Build Our Castle", "চল গড়ি সুখের সংসার"),
            ("My Heart Chooses You", "আমার মন শুধুই তোমায় বেছেছে"),
            ("Marry Me, My Dearest", "আমায় বিয়ে করবে প্রিয়তমা?"),
            ("Eternal Knot of Hearts", "হৃদয়ের অমর বন্ধন"),
            ("Whispering the Big Question", "কানে কানে জীবনের সবচেয়ে বড় প্রশ্ন"),
            ("Golden Sunset Proposal", "সোনালী গোধূলিতে বিয়ের প্রস্তাব"),
            ("Bound by Soul and Destiny", "ভাগ্যের লিখনে বাঁধা দুটি প্রাণ"),
            ("Yes, A Thousand Times Yes", "হ্যাঁ, হাজারবার হ্যাঁ"),
            ("Two Rings, One Soul", "দুটি আংটি, এক হৃদয়"),
            ("To Have and to Hold", "আজীবন আগলে রাখার শপথ"),
            ("A Love Approved by Heaven", "ঈশ্বরের আশীর্বাদে বাঁধা প্রেম"),
            ("The Beginning of Forever", "চিরকালের সুন্দর সূচনা"),
        ]
    },
    '🎂 জন্মদিন': {
        'illustrations': ['vintage-rose', 'gramophone-melody', 'coffee-cup', 'old-letter'],
        'stamps': ['vintage-rose', 'royal-mail', 'love-seal', 'wax-seal'],
        'borders': ['gold-filigree', 'classic', 'double-thin', 'vintage-post'],
        'patterns': ['floral-vintage', 'parchment', 'postal-linen', 'parchment-rose'],
        'recipients': ['প্রিয় মানুষ', 'জন্মদিনের রাজকুমারী', 'স্নেহের সাথী', 'হৃদয়ের স্পন্দন', 'চিরসুহৃদ'],
        'senders': ['ইতি, তোমার শুভাকাঙ্ক্ষী...', 'ইতি, অসীম শুভকামনায়...', 'ইতি, তোমার জন্মদিনের শুভাকাঙ্ক্ষী...', 'ইতি, একান্ত তোমার...'],
        'dates': ['আজকের শুভদিনে', 'জন্মদিনে শুভকামনা', 'শুভ জন্মলগ্নে', 'তোমার বিশেষ দিনে', 'মধুর জন্মলগ্নে'],
        'titles': [
            ("Vintage Birthday Rose", "জন্মদিনের ভিন্টেজ গোলাপ"),
            ("Sweet Birthday Melody", "জন্মদিনের সুর ও আশীর্বাদ"),
            ("Candle Wishes & Joy", "মোমবাতির আলো ও শুভেচ্ছা"),
            ("A Year Wiser and Lovelier", "আরও একটি বছর সুন্দর হও"),
            ("Birthday Bouquet of Blessings", "শুভকামনার ফুলের তোড়া"),
            ("Golden Year Celebration", "জন্মদিনের সোনালী মুহূর্ত"),
            ("A Day Dedicated to You", "আজকের দিনটি শুধুই তোমার"),
            ("Sweet Treats and Smiles", "মিষ্টি হাসি ও জন্মদিনের কেক"),
            ("Warm Birthday Hugs", "জন্মদিনের উষ্ণ আলিঙ্গন"),
            ("May All Your Dreams Come True", "তোমার সকল স্বপ্ন পূরণ হোক"),
            ("Gift of Eternal Affection", "চিরন্তন ভালোবাসার উপহার"),
            ("A Special Star Was Born", "আজ এক বিশেষ তারার জন্ম"),
            ("Birthday Chai and Celebration", "জন্মদিনের বিশেষ চা ও আড্ডা"),
            ("Love Wrapped for Your Birthday", "উপহারের ফিতায় মোড়ানো ভালোবাসা"),
            ("Shine Brighter Each Year", "প্রতিটি বছরে আরও উজ্জ্বল হও"),
            ("Vintage Music for Birthday", "গ্রামোফোনে জন্মদিনের গান"),
            ("A Lifetime of Happiness", "আজীবন সুখের আশীর্বাদ"),
            ("Birthday Card Written in Gold", "সোনালী হরফে জন্মদিনের কার্ড"),
            ("Heartfelt Prayers for You", "তোমার জন্য অন্তরের শুভপ্রার্থনা"),
            ("Celebrate the Magic of You", "তোমার বেঁচে থাকার আনন্দ উদযাপন"),
            ("Another Chapter of Life", "জীবনের নতুন অধ্যায়ের শুভেচ্ছা"),
            ("Smiling Through the Years", "স্মিত হাসিতে কাটুক প্রতিটি বছর"),
            ("Birthday Glow in Your Eyes", "তোমার চোখের জন্মদিনের দ্যুতি"),
            ("The World Blessed by You", "তোমাকে পেয়ে ধন্য পৃথিবী"),
            ("Forever Young in My Heart", "আমার হৃদয়ে তুমি চিরনবীন"),
        ]
    },
    '💑 Anniversary': {
        'illustrations': ['vintage-rose', 'boat-river', 'gramophone-melody', 'lantern-night'],
        'stamps': ['royal-mail', 'love-seal', 'wax-seal', 'vintage-rose'],
        'borders': ['gold-filigree', 'ornate', 'classic', 'double-thin'],
        'patterns': ['postal-linen', 'parchment', 'floral-vintage', 'parchment-rose'],
        'recipients': ['প্রাণপ্রিয় অর্ধাঙ্গিনী', 'জীবনসঙ্গী', 'আমার প্রিয় মানুষ', 'সুখের সাথী', 'চিরন্তন জীবনসঙ্গী'],
        'senders': ['ইতি, তোমার আজীবন...', 'ইতি, তোমার চিরসাথী...', 'ইতি, গর্বিত জীবনসঙ্গী...', 'ইতি, অনন্ত প্রেমে...'],
        'dates': ['মধুর পূর্তিতে', 'একসঙ্গে পথচলায়', 'অ্যানিভার্সারি স্মারক', 'আজকের মধুর দিনে', 'চিরন্তন দাম্পত্যে'],
        'titles': [
            ("Golden Anniversary Postcard", "শুভ বিবাহবার্ষিকী ও স্মৃতি"),
            ("Golden Years of Marriage", "চিরন্তন প্রেমের সংসার"),
            ("Years of Walking Together", "একসঙ্গে পথচলার মধুর বছর"),
            ("Still in Love Like Day One", "প্রথম দিনের মতোই ভালোবাসা"),
            ("Silver Milestone of Love", "ভালোবাসার রূপালী মাইলফলক"),
            ("The Strength of Our Bond", "আমাদের সম্পর্কের গভীর ভিত্তি"),
            ("Shared Tears, Shared Laughter", "সুখ-দুঃখের যৌথ সংসার"),
            ("Through Every Storm Together", "প্রতিটি ঝড়ে পাশে থাকা"),
            ("Growing Old With You", "তোমার সাথে বার্ধক্যের স্বপ্ন"),
            ("Vows Renewed in Silence", "মনে মনে অঙ্গীকার নবায়ন"),
            ("A Decade of Sweet Bliss", "মধুর সম্পর্কের দশকপূর্তি"),
            ("The Home We Built with Love", "ভালোবাসায় গড়া আমাদের নীড়"),
            ("Hand in Hand Through Decades", "দশকের পর দশক হাতে হাত"),
            ("Anniversary Toast in Twilight", "গোধূলিতে ভালোবাসার স্মারক"),
            ("You Are Still My Favorite", "আজও তুমি আমার সবচেয়ে প্রিয়"),
            ("Unfading Love of Husband & Wife", "দাম্পত্যের অমলিন প্রেমকাব্য"),
            ("Memories of Wedding Bells", "বিয়ের সানাইয়ের সেই মধুর স্মৃতি"),
            ("A Journey of Pure Respect", "শ্রদ্ধা ও ভালোবাসার দীর্ঘ যাত্রা"),
            ("Our Children, Our Love Story", "আমাদের সংসারের মিষ্টি গল্প"),
            ("Years Flew by Like Moments", "মুহূর্তের মতো কেটে যাওয়া বছরগুলো"),
            ("Thank You for Choosing Me", "আমায় বেছে নেওয়ার জন্য ধন্যবাদ"),
            ("Love Matures Like Fine Wine", "পুরনো দিনে আরও মধুর সম্পর্ক"),
            ("The Anchor of My Life", "আমার জীবনের প্রধান নোঙর"),
            ("Blessed by Your Companionship", "তোমার সান্নিধ্যে ধন্য জীবন"),
            ("Forever and Always Us", "চিরকাল আমরা দুজন একসঙ্গে"),
        ]
    },
    '🖤 একতরফা প্রেম': {
        'illustrations': ['moonlight-night', 'old-letter', 'railway-station', 'post-box', 'lantern-night'],
        'stamps': ['wax-seal', 'vintage-rose', 'dhaka-gpo', 'chittagong-post'],
        'borders': ['ornate', 'classic', 'aged-stamp', 'vintage-post'],
        'patterns': ['diary-leather', 'tea-stained', 'parchment', 'aged-paper'],
        'recipients': ['যার কথা কেউ জানে না', 'দূর আকাশের তারা', 'অচেনা অনুভূতি', 'নীরব মানসী', 'যাকে পাওয়া হলো না'],
        'senders': ['ইতি, চিরকালের ছায়া...', 'ইতি, দূরবর্তী প্রেমিক...', 'ইতি, নিঃস্বার্থ মন...', 'ইতি, গোপন পুজারী...'],
        'dates': ['নীরব প্রার্থনায়', 'একাকী সন্ধ্যায়', 'গোপন অনুভূতিতে', 'দূরত্বের মাঝে', 'অপ্রকাশিত ক্ষণে'],
        'titles': [
            ("Unrequited Love & Solitude", "একতরফা ভালোবাসা ও নিঃসঙ্গতা"),
            ("Silent One-Sided Devotion", "নিভৃত একতরফা ভালোবাসা"),
            ("Loving You from Afar", "দূর থেকেই ভালোবেসে যাওয়া"),
            ("A Secret Written in Diary", "ডায়েরির পাতায় গোপন নাম"),
            ("Watching You Smile from Shadows", "আড়াল থেকে তোমার হাসি দেখা"),
            ("No Claims, Only Pure Love", "কোনো দাবি নেই, শুধু ভালোবাসা"),
            ("You Never Knew My Heart", "তুমি কখনো আমার মন জানলে না"),
            ("My Silent Prayers for You", "তোমার জন্য আমার নীরব প্রার্থনা"),
            ("The Beauty of Unseen Love", "অদেখা প্রেমের নিঃস্বার্থ সৌন্দর্য"),
            ("Passing By Without a Word", "নীরবে পাশ কাটিয়ে চলে যাওয়া"),
            ("Your Name on Window Mist", "জানালার কুয়াশায় তোমার নাম"),
            ("Unanswered Sighs in the Dark", "অন্ধকারে ঝরা নিঃশব্দ দীর্ঘশ্বাস"),
            ("A Devotion Without Reward", "প্রতিদানহীন এক পবিত্র প্রেম"),
            ("Happy in Your Happiness", "তুমি ভালো থাকলেই আমি খুশি"),
            ("A Silent Admirer's Shadow", "এক নীরব ভক্তের গোপন ছায়া"),
            ("Letters Kept Hidden Forever", "চিঠিগুলো চিরকাল লুকানোই রইল"),
            ("The Pain of Being a Stranger", "অচেনা হয়ে থাকার মিষ্টি যন্ত্রণা"),
            ("Your Laugh Lit My Day", "তোমার হাসি আমার দিন রঙিন করত"),
            ("Dreaming Without Owning", "না পেয়েও স্বপ্নের মাঝে রাখা"),
            ("A Flower Placed in Secret", "গোপনে রেখে যাওয়া বুনো ফুল"),
            ("The Unspoken Poetry of Soul", "হৃদয়ের না-বলা যত কবিতা"),
            ("Distance Was My Destiny", "দূরত্বই হয়তো ছিল আমার নিয়তি"),
            ("Pure Love Without a Clamour", "কোলাহলহীন এক শুদ্ধ ভালোবাসা"),
            ("Walking Away with a Smile", "হাসিমুখে দূরে সরে যাওয়া"),
            ("Still Praying for Your Joy", "আজও তোমার সুখের জন্য প্রার্থনা"),
        ]
    },
    '🌸 স্মৃতি': {
        'illustrations': ['old-letter', 'railway-station', 'gramophone-melody', 'boat-river', 'coffee-cup'],
        'stamps': ['vintage-rose', 'dhaka-gpo', 'chittagong-post', 'royal-mail'],
        'borders': ['classic', 'vintage-post', 'gold-filigree', 'aged-stamp'],
        'patterns': ['vintage-grid', 'aged-paper', 'tea-stained', 'postal-linen'],
        'recipients': ['পুরোনো বন্ধু', 'ফেলে আসা দিন', 'সহপাঠী', 'শৈশবের সাথী', 'স্মৃতির অ্যালবামে'],
        'senders': ['ইতি, ফেলে আসা দিন...', 'ইতি, সোনালী অতীত...', 'ইতি, এক স্মৃতিকাতর বন্ধু...', 'ইতি, তোমার পুরনো সাথী...'],
        'dates': ['স্মৃতির অ্যালবামে', 'আশির দশক', 'নব্বইয়ের সোনালী দিন', 'ফিরে দেখা দিনে', 'সেইসব সোনালী স্মৃতি'],
        'titles': [
            ("Old Photo Album & Memories", "পুরনো অ্যালবাম ও অমলিন স্মৃতি"),
            ("Unfaded Memories of Youth", "তারুণ্যের মিষ্টি স্মৃতি"),
            ("School Bench Carvings", "স্কুলের বেঞ্চে খোদাই করা নাম"),
            ("Afternoons with Grandfather", "দাদার সাথে কাটানো মিষ্টি বিকেল"),
            ("The Scent of Old Books", "পুরনো বইয়ের সোঁদা সুবাস"),
            ("Bicycle Rides at Twilight", "গোধূলিতে সাইকেল চালানোর দিন"),
            ("Rainwater Puddles of Childhood", "শৈশবের বৃষ্টির জমা জল"),
            ("Old Friends at the Tea Stall", "টঙের দোকানে বন্ধুদের আড্ডা"),
            ("Black and White Photographs", "সাদাকালো ছবির অমলিন মায়া"),
            ("Letters from College Days", "কলেজ জীবনের সোনালী চিঠি"),
            ("Radio Melodies of the 80s", "আশির দশকের রেডিওর গান"),
            ("The Village Riverbank", "গ্রামের নদীর ঘাটের স্মৃতি"),
            ("Grandmother's Fairy Tales", "দাদিমার রূপকথার গল্প"),
            ("Unforgettable Summer Vacations", "গ্রীষ্মের ছুটির সেই সোনালী দিন"),
            ("Dusty Cassettes in the Box", "বাক্সে রাখা পুরনো ক্যাসেট"),
            ("Walks in Autumn Grass", "কাশবনের মাঝে হেঁটে যাওয়া"),
            ("The Bell of School Gate", "স্কুল ছুটির মধুর ঘণ্টার ধ্বনি"),
            ("Memories Etched on Stone", "পাথরে খোদাই করা স্মৃতি"),
            ("Lost Friends, Lasting Bonds", "হারানো বন্ধুদের ফেলে আসা মুখ"),
            ("Nostalgic Dhaka Evenings", "ঢাকার পুরনো সন্ধ্যার স্মৃতিচারণ"),
            ("Old Letters in the Attic", "চিলেকোঠায় রাখা চিঠি"),
            ("A Sip of Childhood Memory", "শৈশবের স্বাদের মধুর পরশ"),
            ("Laughter That Still Echoes", "যে হাসি আজও কানে বাজে"),
            ("Faded Film Roll", "ক্যামেরার এক্সপোজ হওয়া রিল"),
            ("Treasured Moments of the Past", "অতীতের যত অমূল্য রত্ন"),
        ]
    },
    '🎞️ Classic Vintage': {
        'illustrations': ['gramophone-melody', 'railway-station', 'post-box', 'coffee-cup', 'boat-river'],
        'stamps': ['air-mail', 'royal-mail', 'dhaka-gpo', 'vintage-rose'],
        'borders': ['classic', 'vintage-post', 'aged-stamp', 'double-thin'],
        'patterns': ['aged-paper', 'vintage-grid', 'kraft', 'tea-stained'],
        'recipients': ['সুহৃদ', 'পুরোনো বন্ধু', 'সেকালের মানুষ', 'সঙ্গীতের অনুরাগী', 'রেট্রো প্রেমিক'],
        'senders': ['ইতি, সুরের অনুরাগী...', 'ইতি, সুরপাগল...', 'ইতি, সেকালের তরুণ...', 'ইতি, ভিন্টেজ প্রেমী...'],
        'dates': ['আশির দশক', '১৯৯০ সাল', '১৯৭৫ এর দিনগুলি', 'সেকালের কোলকাতা', 'রেট্রো যুগে'],
        'titles': [
            ("Retro Radio & Romance", "ভিন্টেজ রেডিও ও নস্টালজিয়া"),
            ("Vintage Gramophone Melody", "সুরভিত গ্রামোফোন ও স্মৃতি"),
            ("Faded Cassette & Melody", "ক্যাসেট ফিতার পুরোনো গান"),
            ("Black and White Cinema Hall", "সাদাকালো সিনেমার নস্টালজিয়া"),
            ("Steam Engine at Sunset", "বাষ্পীয় ইঞ্জিনের ধোঁয়া ও গোধূলি"),
            ("Old Newspaper Headline", "সেকালের সংবাদপত্রের পাতা"),
            ("Vintage Typewriter Keys", "টাইপরাইটারের ঠকঠক শব্দ"),
            ("Antique Pocket Watch", "প্রাচীন পকেট ঘড়ির টিকটিক"),
            ("Leather Bag and Old Books", "চামড়ার ব্যাগ ও ধুলোবালি বই"),
            ("Classic Vinyl Record", "ভিনাইল রেকর্ডের খাঁজকাটা সুর"),
            ("Retro Cafe Atmosphere", "আশির দশকের পুরনো ক্যাফে"),
            ("Vintage Bicycle with Bell", "হ্যান্ডেলবার ও ঘণ্টার আওয়াজ"),
            ("Old Telephone with Rotary Dial", "ঘোরানো ডায়ালের পুরনো টেলিফোন"),
            ("Sepia Horizon Memories", "সিপিয়া রঙের দিগন্ত"),
            ("The Golden Age of Melody", "বাংলা গানের সোনালী যুগ"),
            ("Vintage Fountain Pen Notes", "ফাউন্টেন পেনের নীল কালির ছোঁয়া"),
            ("Retro Poster on Wall", "দেওয়ালে সেকালের সিনেমার পোস্টার"),
            ("Wooden Clock on the Mantel", "দেওয়াল ঘড়ির ঘণ্টাধ্বনি"),
            ("Tweed Jacket and Nostalgia", "টুইড জ্যাকেট ও শীতের স্মৃতি"),
            ("Classic Old Tramcar Ride", "পুরনো ট্রামের ক্যাঁচক্যাঁচ সুর"),
            ("Old Postman with Canvas Bag", "ক্যানভাস ব্যাগে আসা সুখবর"),
            ("Retro Coffee Cup Stains", "কফির দাগলাগা সেকালের টেবিল"),
            ("Echoes of Bygone Eras", "ফেলে আসা শতাব্দীর সুর"),
            ("The Art of Classic Living", "ক্লাসিক জীবনের শান্ত ছন্দ"),
            ("Preserving the Vintage Soul", "ভিন্টেজ হৃদয়ের চিরন্তন রূপ"),
        ]
    },
    '🇧🇩 Bengali Vintage': {
        'illustrations': ['boat-river', 'post-box', 'bengali-kadam', 'old-letter', 'lantern-night'],
        'stamps': ['dhaka-gpo', 'chittagong-post', 'wax-seal', 'love-seal'],
        'borders': ['gold-filigree', 'classic', 'vintage-post', 'aged-stamp'],
        'patterns': ['kraft', 'floral-vintage', 'parchment', 'tea-stained'],
        'recipients': ['প্রাণাধিক প্রিয়', 'শরতের মানসী', 'বাংলার রূপসী', 'নদীতীরের মানুষ', 'সোনার বাংলা'],
        'senders': ['ইতি, সেকালের ঢাকা...', 'ইতি, শুভ্র মেঘ...', 'ইতি, ভাটির মাঝি...', 'ইতি, বাংলার এক প্রেমিক...'],
        'dates': ['বৈশাখ ১৩৯২', 'আশ্বিন ১৪৩২', 'কার্তিকী সন্ধ্যা', 'চৈত্র সংক্রান্তি', 'পৌষের কুয়াশা'],
        'titles': [
            ("Old Bengal Post Box", "লাল ডাকবাক্স ও সেকালের ঢাকা"),
            ("Old Dhaka Post Office Heritage", "ঐতিহ্যবাহী পুরান ঢাকা ও ডাকঘর"),
            ("Shiuli & Autumn Breeze", "শিউলি ফুল ও কাশবন"),
            ("Riverboat in the Padma", "পদ্মার বুকে পালতোলা নৌকা"),
            ("Ahsan Manzil Sunset", "আহসান মঞ্জিলের গোধূলি রূপ"),
            ("Tara Masjid Architectural Beauty", "তারা মসজিদের নকশী ছায়া"),
            ("Bhatiyali Song on the River", "ভাটিয়ালি গানের সুর ও নদী"),
            ("Nakshi Kantha of Bengal", "নকশী কাঁথার মাঠ ও প্রেম"),
            ("Rickshaw Art of Old Dhaka", "পুরান ঢাকার রিকশা পেইন্টিং"),
            ("Sadarghat Launch Whistle", "সদরঘাটের সাইরেন ও বিদায়"),
            ("Kashful by the River Meghna", "মেঘনার তীরে কাশফুলের মেলা"),
            ("Baul Ektara Melody", "বাউলের একতারার গভীর সুর"),
            ("Terracotta Temples of Bengal", "পোড়ামাটির মন্দিরের কারুকাজ"),
            ("Autumn Morning Dew on Grass", "শরতের ঘাসে শিশিরের কণা"),
            ("Clay Lamp at Sunset Ghat", "সন্ধ্যার ঘাটে মাটির প্রদীপ"),
            ("Village Haat on Riverbank", "নদীর পাড়ে বসা গ্রামীণ হাট"),
            ("Monsoon Water Lilies (Shapla)", "জলে ভাসা জাতীয় ফুল শাপলা"),
            ("Curving Bamboo Bridges", "বাঁশের সাঁকো ও শান্ত গ্রাম"),
            ("Folk Tales of Rural Bengal", "গ্রামবাংলার লোকগাঁথা ও প্রেম"),
            ("Heritage of Lalbagh Fort", "লালবাগ কেল্লার পরীবিবির মাজার"),
            ("Golden Mustard Field", "সরিষা ফুলের হলুদ প্রান্তর"),
            ("Sweet Patali Gur in Winter", "শীতের সকালে খেজুরের মিষ্টি রস"),
            ("Bengal Silk Saree & Elegance", "জামদানি শাড়ির ঐতিহ্যবাহী রূপ"),
            ("Boatman's Endless River Journey", "মাঝির অন্তহীন নদীপরিক্রমা"),
            ("Eternal Pride of Bengal Heritage", "চিরকালীন বাংলার ঐতিহ্য ও প্রেম"),
        ]
    }
}

FONTS = ['Elegant Bengali', 'Handwritten', 'Vintage Serif', 'Typewriter', 'Classic', 'Calligraphy']
COLORS = ['#c5a059', '#9c2f3d', '#d4af37', '#a73e44', '#4a6b82', '#4f772d', '#6d597a', '#b07d62', '#b56576', '#e09f3e']
TEXT_COLORS = ['#fdf6e2', '#fbf4ea', '#fcf8ee', '#fffbf0', '#f8f1e5', '#f4ece1', '#faf0ca', '#f7ede2']

postcards = []
card_idx = 1

# Generate 25 cards for each category
for cat_name, conf in CATEGORY_CONFIGS.items():
    cat_quotes = quotes_by_cat.get(cat_name, [])
    titles = conf['titles']
    recipients = conf['recipients']
    senders = conf['senders']
    dates = conf['dates']
    illustrations = conf['illustrations']
    stamps = conf['stamps']
    borders = conf['borders']
    patterns = conf['patterns']

    for i in range(25):
        card_id = f"vp{card_idx:03d}"
        title_en, title_bn = titles[i % len(titles)]
        
        # Pick quote
        if i < len(cat_quotes):
            q_text, q_author = cat_quotes[i]
        else:
            q_text, q_author = ("চিরন্তন ভালোবাসায় মোড়ানো সুন্দর একটি পোস্টকার্ড।", "অজ্ঞাত")

        recipient = recipients[i % len(recipients)]
        sender = senders[i % len(senders)]
        date_str = dates[i % len(dates)]
        illustration = illustrations[i % len(illustrations)]
        stamp = stamps[i % len(stamps)]
        border = borders[i % len(borders)]
        pattern = patterns[i % len(patterns)]
        accent = COLORS[(card_idx - 1) % len(COLORS)]
        text_color = TEXT_COLORS[(card_idx - 1) % len(TEXT_COLORS)]
        font = FONTS[(card_idx - 1) % len(FONTS)]

        # Determine collection
        collection = 'popular' if (i % 3 == 0) else ('new' if (i % 3 == 1) else 'classic')

        card = {
            "id": card_id,
            "title": title_en,
            "titleBn": title_bn,
            "category": cat_name,
            "collection": collection,
            "defaultQuote": q_text,
            "defaultRecipient": recipient,
            "defaultSender": sender,
            "defaultDate": date_str,
            "textPosition": { "x": 50, "y": 50 if (i % 2 == 0) else 52, "align": "center" },
            "style": {
                "fontFamily": font,
                "fontSize": 23 if len(q_text) > 60 else 24,
                "textColor": text_color,
                "bold": False,
                "italic": False,
                "letterSpacing": 0.5,
                "lineHeight": 1.6
            },
            "borderStyle": border,
            "stampType": stamp,
            "accentColor": accent,
            "bgPattern": pattern,
            "illustrationType": illustration,
            "description": f"{title_bn} — {cat_name} ক্যাটাগরির একটি কালজয়ী ভিন্টেজ পোস্টকার্ড ডিজাইন।"
        }
        postcards.append(card)
        card_idx += 1

print(f"Generated {len(postcards)} total postcards.")

# Write to src/data/postcards.ts
ts_code = "import { PostcardTemplate } from '../types';\n\n"
ts_code += "export const POSTCARD_TEMPLATES: PostcardTemplate[] = " + json.dumps(postcards, ensure_ascii=False, indent=2) + ";\n"

with open('src/data/postcards.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Successfully written to src/data/postcards.ts!")
