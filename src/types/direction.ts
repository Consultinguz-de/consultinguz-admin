export interface DirectionLeadLink {
  id: string;
  name: string;
  active: boolean;
}

export interface Direction {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  name: string;
  collectionName: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  leadLinks: DirectionLeadLink[];
  leadLinksActive: boolean;
  linkActive: boolean;
  candidatesCount: number;
}
