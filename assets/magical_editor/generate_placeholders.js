const fs = require('fs');
const dir = __dirname;

const chars = [
    { id: 1, emoji: '💖', color: '#FF6B9D', hair: '#FFD700', skin: '#FFE4C4' },
    { id: 13, emoji: '🎀', color: '#FF4444', hair: '#8B4513', skin: '#FFE4C4' },
    { id: 14, emoji: '🌸', color: '#FFB7C5', hair: '#D4A574', skin: '#FFECD2' },
    { id: 2, emoji: '🕵️', color: '#4A5568', hair: '#2D2D2D', skin: '#FFE4C4' },
    { id: 3, emoji: '👻', color: '#7C3AED', hair: '#E8E8FF', skin: '#E8E8FF' },
    { id: 8, emoji: '🍷', color: '#1A1A2E', hair: '#2D2D2D', skin: '#D4A574' },
    { id: 18, emoji: '🧹', color: '#334155', hair: '#1A1A2E', skin: '#FFE4C4' },
    { id: 7, emoji: '🔥', color: '#EF4444', hair: '#FF4500', skin: '#FFD4B8' },
    { id: 19, emoji: '⚔️', color: '#78350F', hair: '#5C3317', skin: '#D4A574' },
    { id: 4, emoji: '🧝', color: '#059669', hair: '#C0C0C0', skin: '#FFECD2' },
    { id: 15, emoji: '👼', color: '#38BDF8', hair: '#FFD700', skin: '#FFECD2' },
    { id: 5, emoji: '🤖', color: '#06B6D4', hair: '#00E5FF', skin: '#B0C4DE' },
    { id: 16, emoji: '🧪', color: '#65A30D', hair: '#FFFFFF', skin: '#FFE4C4' },
    { id: 17, emoji: '👽', color: '#8B5CF6', hair: '#C084FC', skin: '#90EE90' },
    { id: 9, emoji: '🐾', color: '#FB923C', hair: '#D2691E', skin: '#FFD4B8' },
    { id: 11, emoji: '🎈', color: '#FACC15', hair: '#FF0000', skin: '#FFFFFF' },
    { id: 10, emoji: '🍸', color: '#1E1B4B', hair: '#2D2D2D', skin: '#D4A574' },
    { id: 6, emoji: '🖋️', color: '#D97706', hair: '#1A1A2E', skin: '#E8E8F0' },
    { id: 20, emoji: '👩‍💼', color: '#3B82F6', hair: '#1A1A2E', skin: '#FFE4C4' },
    { id: 21, emoji: '🕶️', color: '#6B7280', hair: '#2D2D2D', skin: '#D4A574' },
    { id: 22, emoji: '☕', color: '#78716C', hair: '#8B8B8B', skin: '#FFE4C4' },
    { id: 23, emoji: '🔮', color: '#581C87', hair: '#9333EA', skin: '#FFECD2' },
    { id: 24, emoji: '🐈‍⬛', color: '#1F2937', hair: '#000000', skin: '#333333' },
    { id: 12, emoji: '🧙‍♀️', color: '#D946EF', hair: '#E879F9', skin: '#FFECD2' }
];

chars.forEach(c => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 280' width='200' height='280'>
  <defs><linearGradient id='bg${c.id}' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='${c.color}' stop-opacity='0.15'/><stop offset='100%' stop-color='${c.color}' stop-opacity='0.03'/></linearGradient></defs>
  <rect width='200' height='280' fill='url(#bg${c.id})' rx='20'/>
  <circle cx='100' cy='90' r='50' fill='${c.skin}'/>
  <ellipse cx='100' cy='60' rx='55' ry='35' fill='${c.hair}'/>
  <circle cx='82' cy='88' r='5' fill='#333'/><circle cx='118' cy='88' r='5' fill='#333'/>
  <path d='M92 100 Q100 108 108 100' fill='none' stroke='${c.color}' stroke-width='2' stroke-linecap='round'/>
  <rect x='65' y='140' width='70' height='90' rx='15' fill='${c.color}'/>
  <rect x='45' y='155' width='25' height='50' rx='10' fill='${c.color}'/>
  <rect x='130' y='155' width='25' height='50' rx='10' fill='${c.color}'/>
  <rect x='75' y='228' width='20' height='35' rx='8' fill='${c.color}'/>
  <rect x='105' y='228' width='20' height='35' rx='8' fill='${c.color}'/>
  <text x='100' y='195' text-anchor='middle' font-size='32'>${c.emoji}</text>
  </svg>`;
    fs.writeFileSync(`${dir}/char_${c.id}.svg`, svg);
});
console.log("Created " + chars.length + " SVG files");
