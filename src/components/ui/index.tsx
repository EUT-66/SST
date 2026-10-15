import clsx from 'clsx';
import { Check, Eye, EyeOff, Loader2, X } from 'lucide-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { Link } from 'react-router-dom';

// ---------------------------------------------------------------- Divers

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={clsx('animate-spin text-sst-600', className ?? 'h-5 w-5')} />;
}

export function PageLoader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-ink-muted">
      <Spinner className="h-8 w-8" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  subtitle,
  actions,
  back,
}: {
  kicker?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  back?: { to: string; label: string };
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {back && (
          <Link to={back.to} className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-sst-700 hover:underline">
            ← {back.label}
          </Link>
        )}
        {kicker && <p className="kicker mb-1">{kicker}</p>}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({ icon, title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center px-6 py-12 text-center">
      {icon && <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sst-50 text-sst-600">{icon}</div>}
      <h3 className="text-lg font-bold">{title}</h3>
      {children && <div className="mt-1 max-w-md text-sm text-ink-muted">{children}</div>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Field({ label, help, children, className }: { label: string; help?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={clsx('block', className)}>
      <span className="label">{label}</span>
      {children}
      {help && <p className="help">{help}</p>}
    </label>
  );
}

/** Champ mot de passe avec un œil pour afficher ou masquer la saisie. */
export function PasswordInput({ className, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  const [visible, setVisible] = useState(false);
  const label = visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe';
  return (
    <span className="relative block">
      <input {...props} type={visible ? 'text' : 'password'} className={clsx('input pr-12', className)} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={label}
        aria-pressed={visible}
        title={label}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-ink-muted transition hover:text-sst-700 focus-visible:text-sst-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sst-300"
      >
        {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </span>
  );
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: { id: T; label: string; icon?: ReactNode; badge?: ReactNode }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div className="no-print -mx-1 mb-6 overflow-x-auto border-b border-sst-100">
      <div className="flex min-w-max gap-6 px-1">
        {tabs.map((t) => (
          <button key={t.id} type="button" className={clsx('tab', value === t.id && 'tab-active')} onClick={() => onChange(t.id)}>
            {t.icon}
            {t.label}
            {t.badge}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Choix exclusif à deux états + vide (Fait / Non fait, Acquis / Non acquis). */
export function TriToggle<T extends string>({
  value,
  onChange,
  yes,
  no,
  yesLabel,
  noLabel,
  disabled,
  size = 'md',
}: {
  value: T | null | undefined;
  onChange: (v: T | null) => void;
  yes: T;
  no: T;
  yesLabel: string;
  noLabel: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}) {
  const base = clsx(
    'inline-flex items-center gap-1 rounded-lg border font-semibold transition disabled:opacity-50',
    size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm',
  );
  return (
    <div className="inline-flex shrink-0 gap-1.5">
      <button
        type="button"
        disabled={disabled}
        aria-pressed={value === yes}
        className={clsx(
          base,
          value === yes ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-200 bg-white text-ink-soft hover:border-sst-300',
        )}
        onClick={() => onChange(value === yes ? null : yes)}
      >
        <Check className="h-3.5 w-3.5" />
        {yesLabel}
      </button>
      <button
        type="button"
        disabled={disabled}
        aria-pressed={value === no}
        className={clsx(
          base,
          value === no ? 'border-red-500 bg-red-500 text-white' : 'border-slate-200 bg-white text-ink-soft hover:border-red-300',
        )}
        onClick={() => onChange(value === no ? null : no)}
      >
        <X className="h-3.5 w-3.5" />
        {noLabel}
      </button>
    </div>
  );
}

export function StatusPill({ value, yes = 'Acquise', no = 'Non acquise', empty = 'À évaluer' }: { value: boolean | null | undefined; yes?: string; no?: string; empty?: string }) {
  if (value === true) return <span className="badge-green">{yes}</span>;
  if (value === false) return <span className="badge-red">{no}</span>;
  return <span className="badge-gray">{empty}</span>;
}

// ---------------------------------------------------------------- Modale

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const width = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }[size];
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-sst-950/40 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={clsx('animate-pop flex max-h-[92vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl', width)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-sst-100 px-6 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" className="rounded-lg p-1 text-ink-muted hover:bg-slate-100" onClick={onClose} aria-label="Fermer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-sst-100 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Notifications et confirmations

interface Toast {
  id: number;
  message: string;
  kind: 'success' | 'error' | 'info';
}

interface ConfirmOptions {
  title: string;
  message?: ReactNode;
  confirmLabel?: string;
  danger?: boolean;
}

interface FeedbackApi {
  toast: (message: string, kind?: Toast['kind']) => void;
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
}

const FeedbackContext = createContext<FeedbackApi | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [pending, setPending] = useState<(ConfirmOptions & { resolve: (v: boolean) => void }) | null>(null);
  const counter = useRef(0);

  const toast = useCallback((message: string, kind: Toast['kind'] = 'success') => {
    const id = ++counter.current;
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), kind === 'error' ? 7000 : 3500);
  }, []);

  const confirm = useCallback((opts: ConfirmOptions) => new Promise<boolean>((resolve) => setPending({ ...opts, resolve })), []);

  const close = (v: boolean) => {
    pending?.resolve(v);
    setPending(null);
  };

  return (
    <FeedbackContext.Provider value={{ toast, confirm }}>
      {children}
      <div className="no-print pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(92vw,380px)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={clsx(
              'animate-pop pointer-events-auto rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg',
              t.kind === 'success' && 'bg-sst-700 text-white',
              t.kind === 'error' && 'bg-red-600 text-white',
              t.kind === 'info' && 'bg-ink text-white',
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
      <Modal
        open={!!pending}
        onClose={() => close(false)}
        title={pending?.title}
        size="sm"
        footer={
          <>
            <button className="btn-secondary" onClick={() => close(false)}>
              Annuler
            </button>
            <button className={pending?.danger ? 'btn bg-red-600 text-white hover:bg-red-700' : 'btn-primary'} onClick={() => close(true)}>
              {pending?.confirmLabel ?? 'Confirmer'}
            </button>
          </>
        }
      >
        <div className="text-sm text-ink-soft">{pending?.message}</div>
      </Modal>
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackApi {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error('useFeedback doit être utilisé dans FeedbackProvider');
  return ctx;
}

/** Message d'erreur lisible à partir d'une erreur Firebase. */
export function errorMessage(e: unknown): string {
  const code = (e as { code?: string })?.code ?? '';
  const map: Record<string, string> = {
    'permission-denied': 'Action non autorisée pour votre compte.',
    'auth/invalid-credential': 'E-mail ou mot de passe incorrect.',
    'auth/wrong-password': 'E-mail ou mot de passe incorrect.',
    'auth/user-not-found': 'Aucun compte avec cet e-mail.',
    'auth/email-already-in-use': 'Un compte existe déjà avec cet e-mail.',
    'auth/weak-password': 'Mot de passe trop faible (6 caractères minimum).',
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/too-many-requests': 'Trop de tentatives. Réessayez dans quelques minutes.',
    'auth/operation-not-allowed': 'Ce mode de connexion n’est pas activé dans la console Firebase.',
    'auth/admin-restricted-operation': 'La connexion anonyme n’est pas activée dans la console Firebase.',
    'auth/network-request-failed': 'Connexion réseau impossible.',
    unavailable: 'Service momentanément indisponible (hors ligne ?).',
    'storage/unauthorized': 'Envoi de fichier non autorisé.',
  };
  if (map[code]) return map[code];
  return (e as Error)?.message ?? 'Une erreur est survenue.';
}
