export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  codeUrl?: string;
  demoUrl?: string;
  detailDescription?: string;
  features?: string[];
}