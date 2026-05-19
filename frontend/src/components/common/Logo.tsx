interface LogoProps {
  compact?: boolean;
  className?: string;
}

const Logo = ({ compact = false, className = '' }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/logo.svg" alt="Smart Leads" className="h-9 w-9 shrink-0" />
      {!compact && (
        <span className="min-w-0 text-lg font-semibold leading-tight">
          <span className="block truncate">Smart Leads</span>
          <span className="block text-xs font-medium text-slate-400">Dashboard</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
