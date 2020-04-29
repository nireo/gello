export interface CreateTemplate {
  title: string;
  description: string;
  lists: string;
  private: string;
}

export interface Template {
  title: string;
  description: string;
  lists: string;
  created_at: string;
}

export interface TemplateState {
  userTemplates: Template[];
  templates: Template[];
}
