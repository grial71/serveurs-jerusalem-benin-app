const files = Object.keys(import.meta.glob("../images/catalogue/*.jpeg"))
  .map(path => path.split("/").pop())
  .sort();

export const categories = ["Palmier à huile","Cultures et maraîchage","Élevage et préparation","Cailles et équipements","Terrain et vie du projet"];

const details = {
  "01": ["Cultures et maraîchage", "Tomate sur pied"],
  "02": ["Élevage et préparation", "Volailles près d’un abreuvoir"],
  "03": ["Terrain et vie du projet", "Cadres en bois dans la cour"],
  "04": ["Cultures et maraîchage", "Quatre cadres remplis de terre"],
  "05": ["Cultures et maraîchage", "Semences de tomate"],
  "06": ["Cultures et maraîchage", "Cadres de culture disposés au sol"],
  "07": ["Cultures et maraîchage", "Vue rapprochée des cadres de culture"],
  "08": ["Élevage et préparation", "Volailles dans la cour"],
  "09": ["Terrain et vie du projet", "Travail manuel sur une tôle"],
  "10": ["Cultures et maraîchage", "Régimes de bananes vertes"],
  "11": ["Palmier à huile", "Tri des fruits du palmier"],
  "12": ["Palmier à huile", "Tri des fruits en équipe"],
  "13": ["Palmier à huile", "Fruits du palmier à huile"],
  "14": ["Palmier à huile", "Fibres et fruits de palmier"],
  "15": ["Cultures et maraîchage", "Plante déracinée"],
  "16": ["Palmier à huile", "Régimes et fruits détachés"],
  "17": ["Palmier à huile", "Fruits de palmier en gros plan"],
  "18": ["Élevage et préparation", "Porcelets autour d’une mangeoire"],
  "19": ["Terrain et vie du projet", "Eau et végétation sur le terrain"],
  "20": ["Élevage et préparation", "Porcelets dans leur enclos"],
  "21": ["Élevage et préparation", "Lapins près du fourrage"],
  "22": ["Élevage et préparation", "Lapin et récipients d’alimentation"],
  "23": ["Cultures et maraîchage", "Fruit allongé sur la plante"],
  "24": ["Élevage et préparation", "Préparation rôtie en gros plan"],
  "25": ["Élevage et préparation", "Préparations rôties sur plateaux"],
  "26": ["Élevage et préparation", "Enclos maçonné"],
  "27": ["Cultures et maraîchage", "Pots de culture alignés"],
  "28": ["Palmier à huile", "Jeune palmier sur le terrain"],
  "29": ["Palmier à huile", "Palmiers sur le terrain"],
  "30": ["Cultures et maraîchage", "Quatre cadres remplis de terre"],
  "31": ["Cultures et maraîchage", "Sachet de semences sur la terre"],
  "32": ["Cultures et maraîchage", "Semences de piment"],
  "33": ["Cultures et maraîchage", "Récolte de fruits verts"],
  "34": ["Cultures et maraîchage", "Jeune plant en pot"],
  "35": ["Cultures et maraîchage", "Fruits verts en gros plan"],
  "36": ["Élevage et préparation", "Volailles autour des récipients"],
  "37": ["Cultures et maraîchage", "Papayes vertes sur l’arbre"],
  "38": ["Cultures et maraîchage", "Papayes en gros plan"],
  "39": ["Terrain et vie du projet", "Emblème des Serveurs de Jérusalem"],
  "40": ["Élevage et préparation", "Lapins et fourrage dans le clapier"],
  "41": ["Cultures et maraîchage", "Piments verts sur pied"],
  "42": ["Cailles et équipements", "Transport d’abreuvoirs"],
  "43": ["Cailles et équipements", "Entretien d’un enclos de cailles"],
  "44": ["Cailles et équipements", "Cailles près de l’abreuvoir et du fourrage"],
  "45": ["Cailles et équipements", "Installation des cailles"],
  "46": ["Cultures et maraîchage", "Préparation d’une zone de plantation"],
  "47": ["Cultures et maraîchage", "Régime de bananes sur pied"],
  "48": ["Cultures et maraîchage", "Régime de bananes en gros plan"],
  "49": ["Cailles et équipements", "Vue d’ensemble des cailles"],
  "50": ["Cultures et maraîchage", "Plant de tomate"],
};

export const photos = files.map(file => {
  const [category, caption] = details[file.slice(0, 2)];
  return { file, category, caption };
});
