export interface ResearchPole {
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** Lado onde o nome aparece em relação ao ícone. Padrão: "right". */
  labelSide?: "right" | "left" | "top" | "bottom" | "none";
}

/** Cidades atendidas pela 250K na região norte de Mato Grosso */
export const researchPoles: ResearchPole[] = [
  // Norte isolado
  { id: "jacareacanga",       name: "Jacareacanga",          lat: -6.2222,  lng: -57.7544, labelSide: "right"  },
  { id: "apiacas",            name: "Apiacás",               lat: -9.5514,  lng: -57.4567, labelSide: "top"    },
  { id: "nova-bandeirantes",  name: "Nova Bandeirantes",     lat: -9.8414,  lng: -57.7983, labelSide: "left"   },
  { id: "alta-floresta",      name: "Alta Floresta",         lat: -9.8753,  lng: -56.0861, labelSide: "right"  },
  // Faixa nordeste
  { id: "carlinda",           name: "Carlinda",              lat: -10.0314, lng: -55.8286, labelSide: "left"   },
  { id: "matupa",             name: "Matupá",                lat: -10.1694, lng: -54.9244, labelSide: "right"  },
  { id: "nova-guarita",       name: "Nova Guarita",          lat: -10.3133, lng: -55.3058, labelSide: "left"   },
  { id: "terra-nova-norte",   name: "Terra Nova do Norte",   lat: -10.5111, lng: -55.2342, labelSide: "right"  },
  { id: "nova-canaa-norte",   name: "Nova Canaã do Norte",   lat: -10.5267, lng: -55.8028, labelSide: "right"  },
  { id: "colider",            name: "Colíder",               lat: -10.8139, lng: -55.4539, labelSide: "right"  },
  { id: "nova-santa-helena",  name: "Nova Santa Helena",     lat: -10.8458, lng: -55.1761, labelSide: "top"    },
  // Faixa central-norte
  { id: "marcelandia",        name: "Marcelândia",           lat: -11.0689, lng: -54.5564, labelSide: "right"  },
  { id: "juara",              name: "Juara",                 lat: -11.2572, lng: -57.5244, labelSide: "top"    },
  { id: "juina",              name: "Juína",                 lat: -11.3744, lng: -58.7406, labelSide: "right"  },
  // Cluster Cláudia/Feliz Natal — praticamente mesmo ponto; Feliz Natal sem label
  { id: "claudia",            name: "Cláudia",               lat: -11.4858, lng: -54.8767, labelSide: "top"    },
  { id: "feliz-natal",        name: "Feliz Natal",           lat: -11.5325, lng: -54.9253, labelSide: "none"   },
  { id: "uniao-sul",          name: "União do Sul",          lat: -11.5278, lng: -54.3050, labelSide: "right"  },
  // Cluster Porto/Santiago/Tabaporã
  { id: "porto-dos-gauchos",  name: "Porto dos Gaúchos",    lat: -11.5522, lng: -57.4136, labelSide: "right"  },
  { id: "santiago-norte",     name: "Santiago do Norte",     lat: -11.6256, lng: -57.7186, labelSide: "bottom" },
  { id: "sinop",              name: "Sinop",                 lat: -11.8508, lng: -55.5330, labelSide: "right"  },
  { id: "taboroa",            name: "Tabaporã",              lat: -11.8992, lng: -57.8856, labelSide: "left"   },
  // Cluster Ipiranga/Itanhangá (mesma latitude)
  { id: "ipiranga",           name: "Ipiranga do Norte",     lat: -12.1672, lng: -56.1175, labelSide: "top"    },
  { id: "itanhanga",          name: "Itanhangá",             lat: -12.1494, lng: -56.6781, labelSide: "left"   },
  { id: "brasnorte",          name: "Brasnorte",             lat: -12.1544, lng: -58.0167, labelSide: "top"    },
  { id: "vera",               name: "Vera",                  lat: -12.2875, lng: -55.2988, labelSide: "left"   },
  // Cluster Sorriso/Santa Rita (mesma latitude)
  { id: "sorriso",            name: "Sorriso",               lat: -12.5474, lng: -55.8049, labelSide: "left"   },
  { id: "santa-rita-trivelato", name: "Santa Rita do Trivelato", lat: -12.5417, lng: -55.3494, labelSide: "top" },
  { id: "brasilandia",        name: "Brasilândia",           lat: -12.9989, lng: -57.7581, labelSide: "bottom" },
  { id: "lucas-rio-verde",    name: "Lucas do Rio Verde",    lat: -13.0567, lng: -55.9150, labelSide: "right"  },
  { id: "nova-ubirata",       name: "Nova Ubiratã",          lat: -12.9847, lng: -55.2567, labelSide: "bottom" },
  { id: "nova-mutum",         name: "Nova Mutum",            lat: -13.8283, lng: -56.0803, labelSide: "bottom" },
  { id: "sapezal",            name: "Sapezal",               lat: -13.5389, lng: -58.8144, labelSide: "top"    },
  { id: "paranatinga",        name: "Paranatinga",           lat: -14.4278, lng: -54.0511, labelSide: "right"  },
];
