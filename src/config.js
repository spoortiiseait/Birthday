const base = import.meta.env.BASE_URL || './';
const cleanBase = base.endsWith('/') ? base : `${base}/`;
export const getPhoto = (fileName) => `${cleanBase}photos/${fileName}`;

export const BIRTHDAY_CONFIG = {
  husbandName: "Chetan",
  wifeName: "Pooja",
  heroSubtitle: "From Your Loving Wife Pooja ❤️",
  heroTitle: "Happy Birthday Chetan",
  
  // Hero center photo (Only 5.jpg)
  heroPhoto: getPhoto("5.jpg"),
  heroCaption: "Chetan & Pooja ❤️",

  // 10 Photos Collection: 1-4 Solo, 5-10 Couple
  photos: [
    { id: 1, url: getPhoto("1.jpg"), caption: "Handsome", tag: "Solo" },
    { id: 2, url: getPhoto("2.jpg"), caption: "My King", tag: "Solo" },
    { id: 3, url: getPhoto("3.jpg"), caption: "Your Smile", tag: "Solo" },
    { id: 4, url: getPhoto("4.jpg"), caption: "My Love", tag: "Solo" },
    { id: 5, url: getPhoto("5.jpg"), caption: "Together", tag: "Couple" },
    { id: 6, url: getPhoto("6.jpg"), caption: "Our Smile", tag: "Couple" },
    { id: 7, url: getPhoto("7.jpg"), caption: "Us", tag: "Couple" },
    { id: 8, url: getPhoto("8.jpg"), caption: "Forever", tag: "Couple" },
    { id: 9, url: getPhoto("9.jpg"), caption: "Endless Love", tag: "Couple" },
    { id: 10, url: getPhoto("10.jpg"), caption: "Always", tag: "Couple" },
  ],

  // Chetan's Best (1-4)
  chetansBest: [
    { id: 1, url: getPhoto("1.jpg"), caption: "Handsome" },
    { id: 2, url: getPhoto("2.jpg"), caption: "My King" },
    { id: 3, url: getPhoto("3.jpg"), caption: "Your Smile" },
    { id: 4, url: getPhoto("4.jpg"), caption: "My Love" },
  ],
  // backwards compatibility
  get chethansBest() {
    return this.chetansBest;
  },

  // Our Love Story (5-10) with mixed frames
  ourLoveStory: [
    { id: 5, url: getPhoto("5.jpg"), caption: "Together", frameStyle: "vintage-gold" },
    { id: 6, url: getPhoto("6.jpg"), caption: "Our Smile", frameStyle: "heart" },
    { id: 7, url: getPhoto("7.jpg"), caption: "Us", frameStyle: "polaroid" },
    { id: 8, url: getPhoto("8.jpg"), caption: "Forever", frameStyle: "filmstrip" },
    { id: 9, url: getPhoto("9.jpg"), caption: "Endless Love", frameStyle: "vintage-gold" },
    { id: 10, url: getPhoto("10.jpg"), caption: "Always", frameStyle: "polaroid" },
  ],

  // Love Letter (Page 6)
  loveLetter: {
    salutation: "My Dearest Chetan,",
    content: "On your special day I want to tell you how much you mean to me. You are my everything. Happy Birthday my love!",
    signOff: "- Your Pooja",
    stampText: "Sealed with Love ❤️",
  },

  // Final Surprise (Page 7)
  // Only 4 photos cycled: 6, 7, 8, 9
  surpriseMemories: [
    { id: 6, url: getPhoto("6.jpg"), message: "My Greatest Gift Is You" },
    { id: 7, url: getPhoto("7.jpg"), message: "Forever With You" },
    { id: 8, url: getPhoto("8.jpg"), message: "I Love Us" },
    { id: 9, url: getPhoto("9.jpg"), message: "Always & Forever" },
  ],
  surpriseFinalText: "I LOVE YOU CHETAN - FOREVER YOURS POOJA",

  footer: "Made with ❤️ by Pooja for Chetan",
};
