export const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/b2ab3d36-8c16-4a09-b521-a6a584d282c0/_result.png",
  poster:
    "https://image.qwenlm.ai/generated-images/663d7c81-e9f0-452b-bb49-da21510976c4/_result.png",
  canopy:
    "https://image.qwenlm.ai/generated-images/dc476c86-70ca-4e28-8108-ca1c71650ed1/_result.png",
} as const;

/** Court-métrage intégré — « Big Buck Bunny », une saison dans la clairière (9:56) */
export const VIDEO_SRC =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const CHAPTERS = [
  { label: "Aube", time: 0 },
  { label: "La clairière", time: 130 },
  { label: "Les oiseaux", time: 262 },
  { label: "L'orage", time: 428 },
  { label: "Épilogue", time: 540 },
] as const;
