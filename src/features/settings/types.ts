export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  timezone: string;
}

export interface NotificationPreferences {
  emailDigest: boolean;
  projectUpdates: boolean;
  revisionAlerts: boolean;
  clientActivity: boolean;
}
