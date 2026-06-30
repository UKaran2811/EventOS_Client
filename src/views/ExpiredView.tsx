export default function ExpiredView() {
  return (
    <div id="expired-view-container" className="min-h-screen flex flex-col items-center justify-center bg-brand-bg px-6 py-12 text-center animate-fade-in">
      <div className="flex flex-col items-center max-w-[320px] w-full">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-1 font-sans text-[15px] mb-12">
          <span className="font-bold text-brand-text-primary">Event</span>
          <span className="font-extrabold text-brand-accent">OS</span>
        </div>

        {/* Link Broken Icon */}
        <div className="w-16 h-16 rounded-full bg-brand-accent-light text-brand-accent flex items-center justify-center text-3xl mb-6" aria-hidden="true">
          🔗
        </div>

        {/* Status Messages */}
        <h2 className="font-serif text-[28px] italic text-brand-text-primary leading-tight">
          This link is not valid or has expired.
        </h2>
        
        <p className="font-sans text-[15px] text-brand-text-secondary mt-4 leading-relaxed">
          Please contact your event coordinator for the correct link.
        </p>
      </div>
    </div>
  );
}
