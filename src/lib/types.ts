
export interface ContentItem {
  id: string;
  type: "link" | "photo" | "text";
  content: string;
  name?: string ;
  small_description?: string;
  image?: string;
  url?: string;
  owner?: string;
  title?: string;
  og_image?: string;
  is_profile_link?: boolean;
  social_network?: string;
  username?: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
  created?: boolean;
}

export interface Theme {
  background_color?: string;
  foreground_color?: string;
  font_family?: string;
}

export interface BioData {
  id?: string | number;
  name: string;
  biografy?: string;
  image?: string;
  banner?:string;
  content: ContentItem[];
  form_contact?: boolean;
  copyright?: boolean;
  theme:  Theme[]
}

export interface MobileScreenProps {
  bioData: BioData
}

export interface UserData {
  id: string;
  plan?: "GRÁTIS" | "CONEXÃO" | "INFLUÊNCIA";
  name?: string;
}

export interface User {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  biografy?: string;
  banner?: string;
  image?: string;
  plan?: string;
  showProfileForm?: boolean;
  slug?: string;
}

export interface Profile {
  slug?: string;
  banner?: string;
}

export interface FormEmail {
  is_activate: boolean;
}


export interface FormData {
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password: string;
  biografy?: string;
}


export interface SocialLink {
  id: number;
  url: string;
  title: string;
  social_network: string;
  username: string;
}


export interface LinkItem {
  id: string;
  owner: string;
  url: string;
  title: string;
  social_network: string;
  og_image: string;
  username: string;
  is_profile_link: boolean;
  icon: string;
}


export interface SnapItem {
  id: string;
  name: string;
  small_description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface NoteItem {
  id: string;
  text: string;
  created_at: string; 
  updated_at: string; 
}

export interface Dashboard {
  count_views_per_date: Record<string, number>;
  views: number;
  links_count: number;
  snaps_count: number;
  traffic_origin: Record<string, number>;
  locations: Record<string, number>;
  devices: Record<string, number>;
}



