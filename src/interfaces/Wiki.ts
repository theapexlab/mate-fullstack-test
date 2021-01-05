export interface WikiPage {
  missing?: boolean;
  title: string;
  extract?: string;
}

export interface WikiQuery {
  pages: WikiPage[];
}
