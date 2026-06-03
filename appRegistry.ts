export interface AppDef {
  id: string;
  title: string;
  defaultSize: { width: number; height: number };
}

export const APP_REGISTRY: Record<string, AppDef> = {
  about: { id: 'about', title: 'About Me', defaultSize: { width: 600, height: 400 } },
  textkernel: { id: 'textkernel', title: 'Textkernel Match', defaultSize: { width: 740, height: 520 } },
  pathe: { id: 'pathe', title: 'Pathè Alert', defaultSize: { width: 740, height: 520 } },
  formel: { id: 'formel', title: 'Formel Skin', defaultSize: { width: 740, height: 520 } },
  lun: { id: 'lun', title: 'Lun Misto', defaultSize: { width: 740, height: 520 } },
  chess: { id: 'chess', title: 'Chess', defaultSize: { width: 540, height: 580 } },
};
