import type { Permission, PermissionMap, Role, UserProfile } from './types';

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administratrice / administrateur',
  referent: 'Formateur référent',
  formateur: 'Formateur SST',
  pending: 'En attente de validation',
  disabled: 'Désactivé',
};

export const ROLE_SHORT: Record<Role, string> = {
  admin: 'Admin',
  referent: 'Référent',
  formateur: 'Formateur',
  pending: 'En attente',
  disabled: 'Désactivé',
};

export const PERMISSION_LABELS: Record<Permission, { label: string; help: string }> = {
  manageUsers: { label: 'Gérer les utilisateurs', help: 'Valider les comptes, attribuer rôles et permissions' },
  manageSettings: { label: 'Paramètres de l’application', help: 'Seuils, logos, installation du contenu' },
  manageTrades: { label: 'Gérer les métiers', help: 'Liste des métiers et mots-clés de détection CSV' },
  manageCourses: { label: 'Modifier les supports de cours', help: 'Créer, modifier et supprimer les cours' },
  manageQuestions: { label: 'Modifier la banque de QCM', help: 'Questions et modèles de QCM' },
  manageCases: { label: 'Modifier les cas pratiques', help: 'Créer, modifier et supprimer les cas' },
  viewAllSessions: { label: 'Voir toutes les sessions', help: 'Consulter les sessions de tous les formateurs' },
};

export const ALL_PERMISSIONS = Object.keys(PERMISSION_LABELS) as Permission[];

export const ROLE_DEFAULTS: Record<Role, PermissionMap> = {
  admin: Object.fromEntries(ALL_PERMISSIONS.map((p) => [p, true])),
  referent: { manageCourses: true, manageQuestions: true, manageCases: true },
  formateur: {},
  pending: {},
  disabled: {},
};

export function isActiveStaff(user: UserProfile | null | undefined): boolean {
  return !!user && (user.role === 'admin' || user.role === 'referent' || user.role === 'formateur');
}

export function can(user: UserProfile | null | undefined, permission: Permission): boolean {
  if (!user || !isActiveStaff(user)) return false;
  if (user.role === 'admin') return true;
  const override = user.permissions?.[permission];
  if (override !== undefined) return override;
  return !!ROLE_DEFAULTS[user.role][permission];
}
