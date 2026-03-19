export interface CatProfile {
  id: number;
  name: string;
  emoji: string;
  breed: string;
  profile: string;
  tv: string;
}

export interface Question {
  id: number;
  title: string;
  left: string;
  leftProfiles: number[];
  right: string;
  rightProfiles: number[];
}

export const catProfiles: Record<number, CatProfile> = {
  1: {
    id: 1,
    name: "Paciock",
    emoji: "🐱",
    breed: "Persiano Grigio",
    profile: "Il pigro: tranquillo, calmo, dolce, abitudinario, sedentario, affettuoso, tollerante.",
    tv: "Schitt's Creek, Boris, Camera Café, Derry Girls, 30 Rock, The Good Place",
  },
  2: {
    id: 2,
    name: "Peppa Pig",
    emoji: "🐈",
    breed: "Siamese",
    profile: "La chiacchierona: empatica, ama le relazioni profonde, dipendente, molto vocale, giocherellona.",
    tv: "L'Amica Geniale, Downton Abbey, Un medico in famiglia, La meglio gioventù, Babylon Berlin",
  },
  3: {
    id: 3,
    name: "Joey",
    emoji: "🦁",
    breed: "Maine Coon",
    profile: "L'amicone: eccezionalmente amichevole, intelligente, dolce, socievole, leale.",
    tv: "Heartstopper, Sex Education, Normal People, SKAM Italia, Friday Night Lights",
  },
  4: {
    id: 4,
    name: "Miss Marple",
    emoji: "🐈‍⬛",
    breed: "Abissino",
    profile: "L'investigatrice: intelligentissima, curiosa, investigativa, molto attiva, non sta mai ferma.",
    tv: "Il Commissario Montalbano, Don Matteo, Sherlock, Distretto di Polizia, Borgen, House of Cards",
  },
  5: {
    id: 5,
    name: "Hannibal",
    emoji: "🐆",
    breed: "Nigripes",
    profile: "Il killer: fuori dagli schemi, ama il surreale, il violento e il dark.",
    tv: "Hannibal, Dark, American Horror Story, Fargo, Gomorra – La serie",
  },
};

export const questions: Question[] = [
  { id: 1, title: "Preferisci un viaggio in un posto...", left: "Nuovo", leftProfiles: [1, 2], right: "Dove sono già stato", rightProfiles: [3, 4, 5] },
  { id: 2, title: "Preferisci andare a cena...", left: "Con gente nuova", leftProfiles: [1, 2], right: "Con vecchi amici", rightProfiles: [3, 4, 5] },
  { id: 3, title: "Preferiresti un lavoro...", left: "Stabile ma routinario", leftProfiles: [3, 4, 5], right: "Incerto ma fantasioso", rightProfiles: [1, 2] },
  { id: 4, title: "Preferisci un amico...", left: "Simpatico", leftProfiles: [1], right: "Che ti capisca", rightProfiles: [3] },
  { id: 5, title: "Gettarti da uno scoglio molto alto è...", left: "Da evitare", leftProfiles: [1], right: "Eccitante", rightProfiles: [5] },
  { id: 6, title: "Preferisci quadri...", left: "Arte astratta", leftProfiles: [4, 5], right: "Ritratti", rightProfiles: [1, 3] },
  { id: 7, title: "Preferisci quadri...", left: "Impressionisti", leftProfiles: [1, 2, 3], right: "Cubismo", rightProfiles: [4, 5] },
  { id: 8, title: "Preferisci musica...", left: "Lirica", leftProfiles: [1, 2, 3], right: "Jazz", rightProfiles: [4, 5] },
  { id: 9, title: "Preferiresti essere un campione di...", left: "Discesa libera", leftProfiles: [5], right: "Pallavolo", rightProfiles: [1, 2, 3] },
  { id: 10, title: "Preferiresti essere un campione di...", left: "Tennis", leftProfiles: [4], right: "Pallavolo", rightProfiles: [2, 3] },
  { id: 11, title: "Preferisci giocare a...", left: "Burraco", leftProfiles: [1, 2, 3], right: "Scacchi", rightProfiles: [4, 5] },
  { id: 12, title: "Preferisci...", left: "L'amore", leftProfiles: [3], right: "Il successo", rightProfiles: [2] },
  { id: 13, title: "Preferisci...", left: "La filosofia", leftProfiles: [2, 3], right: "La matematica", rightProfiles: [4, 5] },
  { id: 14, title: "Preferisci le vacanze...", left: "Al mare", leftProfiles: [5], right: "In montagna", rightProfiles: [1, 3] },
  { id: 15, title: "Preferisci un weekend...", left: "Di relax a casa", leftProfiles: [1], right: "Con molte attività fuori", rightProfiles: [3] },
  { id: 16, title: "Preferisci leggere di...", left: "Politica", leftProfiles: [3, 4], right: "Sport", rightProfiles: [1, 2] },
  { id: 17, title: "Preferisci leggere di...", left: "Cronaca nera", leftProfiles: [4, 5], right: "Cronaca rosa", rightProfiles: [1, 2, 3] },
  { id: 18, title: "Su internet cerco cose...", left: "Da ridere", leftProfiles: [1, 3], right: "Interessanti", rightProfiles: [2, 4] },
  { id: 19, title: "Preferisci...", left: "Parlare", leftProfiles: [2, 5], right: "Ascoltare", rightProfiles: [4] },
  { id: 20, title: "Preferisci una giornata...", left: "Calma", leftProfiles: [1], right: "Emozionante ma agitata", rightProfiles: [3, 5] },
  { id: 21, title: "Ti interessa di più...", left: "Svelare un segreto", leftProfiles: [4], right: "Conoscere persone interessanti", rightProfiles: [2, 3] },
  { id: 22, title: "Ti appassiona di più...", left: "La realtà di oggi", leftProfiles: [4], right: "Il mondo passato", rightProfiles: [2] },
  { id: 23, title: "Ti appassiona di più...", left: "Il mondo passato", leftProfiles: [2], right: "Il mondo futuro", rightProfiles: [5] },
  { id: 24, title: "Ti appassiona di più...", left: "La realtà di oggi", leftProfiles: [4], right: "Il mondo futuro", rightProfiles: [5] },
  { id: 25, title: "È più interessante parlare di...", left: "Amore/amicizia", leftProfiles: [3], right: "Politica/soldi", rightProfiles: [2] },
  { id: 26, title: "Preferisci cose che...", left: "Ti rilassano", leftProfiles: [1], right: "Ti eccitano", rightProfiles: [5] },
  { id: 27, title: "Preferisci...", left: "Forrest Gump", leftProfiles: [1], right: "Il Padrino", rightProfiles: [2] },
  { id: 28, title: "Preferisci...", left: "La Pantera Rosa", leftProfiles: [1], right: "Titanic", rightProfiles: [3] },
  { id: 29, title: "Preferisci...", left: "Forrest Gump", leftProfiles: [1], right: "Assassinio sull'Orient Express", rightProfiles: [4] },
  { id: 30, title: "Preferisci...", left: "La Pantera Rosa", leftProfiles: [1], right: "Psycho", rightProfiles: [5] },
  { id: 31, title: "Preferisci...", left: "Apocalypse Now", leftProfiles: [2], right: "Casablanca", rightProfiles: [3] },
  { id: 32, title: "Preferisci...", left: "Apocalypse Now", leftProfiles: [2], right: "Match Point", rightProfiles: [4] },
  { id: 33, title: "Preferisci...", left: "Il Padrino", leftProfiles: [2], right: "Il silenzio degli innocenti", rightProfiles: [5] },
  { id: 34, title: "Preferisci...", left: "Titanic", leftProfiles: [3], right: "Match point", rightProfiles: [4] },
  { id: 35, title: "Preferisci...", left: "Casablanca", leftProfiles: [3], right: "Il silenzio degli innocenti", rightProfiles: [5] },
  { id: 36, title: "Preferisci...", left: "Assassinio sull'Orient Express", leftProfiles: [4], right: "Psycho", rightProfiles: [5] },
  { id: 37, title: "Preferisci...", left: "Pretty Woman", leftProfiles: [1, 3], right: "C'era una volta in America", rightProfiles: [2, 4, 5] },
];
