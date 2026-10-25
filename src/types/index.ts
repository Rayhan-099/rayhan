export interface ProjectGalleryView {
  id: string;
  label: string;
  image: string;
  caption?: string;
  telemetry?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  technologies: string[];
  description: string;
  details: string[];
  deliverables: string[];
  stats: string;
  image: string;
  gallery?: ProjectGalleryView[];
  contextLabel?: string;
  links: {
    live?: string;
    github?: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  location: string;
  description: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  dates: string;
  location: string;
}

export interface AchievementItem {
  id?: string;
  title: string;
  role: string;
  details: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    leetcode: string;
    portfolio: string;
  };
  summary: string;
  aboutDetails: string[];
}
