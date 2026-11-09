// Unicode musical symbols, rendered with the "Noto Music" font
const SYMBOL_GROUPS = [
  {
    label: '音部記号',
    symbols: [
      { id: 'g-clef', name: 'ト音記号', code: 0x1d11e },
      { id: 'f-clef', name: 'ヘ音記号', code: 0x1d122 },
      { id: 'c-clef', name: 'ハ音記号', code: 0x1d121 },
    ],
  },
  {
    label: '音符',
    symbols: [
      { id: 'whole', name: '全音符', code: 0x1d15d },
      { id: 'half', name: '2分音符', code: 0x1d15e },
      { id: 'quarter', name: '4分音符', code: 0x1d15f },
      { id: 'eighth', name: '8分音符', code: 0x1d160 },
      { id: 'sixteenth', name: '16分音符', code: 0x1d161 },
      { id: 'beamed-eighths', name: '連桁8分音符', code: 0x266b },
    ],
  },
  {
    label: '休符',
    symbols: [
      { id: 'whole-rest', name: '全休符', code: 0x1d13b },
      { id: 'half-rest', name: '2分休符', code: 0x1d13c },
      { id: 'quarter-rest', name: '4分休符', code: 0x1d13d },
      { id: 'eighth-rest', name: '8分休符', code: 0x1d13e },
      { id: 'sixteenth-rest', name: '16分休符', code: 0x1d13f },
    ],
  },
  {
    label: '変化記号',
    symbols: [
      { id: 'sharp', name: 'シャープ', code: 0x266f },
      { id: 'flat', name: 'フラット', code: 0x266d },
      { id: 'natural', name: 'ナチュラル', code: 0x266e },
      { id: 'double-sharp', name: 'ダブルシャープ', code: 0x1d12a },
      { id: 'double-flat', name: 'ダブルフラット', code: 0x1d12b },
    ],
  },
  {
    label: '強弱・表情',
    symbols: [
      { id: 'forte', name: 'フォルテ', code: 0x1d191 },
      { id: 'piano', name: 'ピアノ', code: 0x1d18f },
      { id: 'mezzo', name: 'メゾ', code: 0x1d190 },
      { id: 'crescendo', name: 'クレッシェンド', code: 0x1d192 },
      { id: 'decrescendo', name: 'デクレッシェンド', code: 0x1d193 },
      { id: 'fermata', name: 'フェルマータ', code: 0x1d110 },
      { id: 'pedal', name: 'ペダル', code: 0x1d1ae },
    ],
  },
  {
    label: '反復・その他',
    symbols: [
      { id: 'segno', name: 'セーニョ', code: 0x1d10b },
      { id: 'coda', name: 'コーダ', code: 0x1d10c },
      { id: 'repeat-start', name: 'リピート開始', code: 0x1d106 },
      { id: 'repeat-end', name: 'リピート終了', code: 0x1d107 },
      { id: 'common-time', name: '4分の4拍子', code: 0x1d134 },
    ],
  },
];
