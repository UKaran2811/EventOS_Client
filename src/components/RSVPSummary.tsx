import { RSVP } from "../types";

interface RSVPSummaryProps {
  rsvp: RSVP;
}

export default function RSVPSummary({ rsvp }: RSVPSummaryProps) {
  const { total, confirmed, declined, maybe, pending } = rsvp;

  // Calculate percentages
  const confirmedPct = (confirmed / total) * 100;
  const declinedPct = (declined / total) * 100;
  const maybePct = (maybe / total) * 100;
  const pendingPct = (pending / total) * 100;

  return (
    <div id="rsvp-summary-card" className="py-4 border-b border-[#EDE8DF]/40 space-y-4">
      <div className="flex justify-between items-baseline">
        <h3 className="font-sans text-[14px] font-bold text-brand-text-primary">
          Guest Attendance
        </h3>
        <span className="font-sans text-[13px] text-brand-text-secondary font-semibold">
          {confirmed}/{total} confirmed
        </span>
      </div>

      {/* Proportional Stacked Bar Chart */}
      <div className="w-full h-1.5 flex rounded-full overflow-hidden bg-[#F5F3EF]">
        {confirmedPct > 0 && (
          <div 
            style={{ width: `${confirmedPct}%` }} 
            className="bg-brand-green h-full"
            title={`Attending: ${confirmed}`}
          />
        )}
        {declinedPct > 0 && (
          <div 
            style={{ width: `${declinedPct}%` }} 
            className="bg-brand-muted-red h-full"
            title={`Not Attending: ${declined}`}
          />
        )}
        {maybePct > 0 && (
          <div 
            style={{ width: `${maybePct}%` }} 
            className="bg-brand-gold h-full"
            title={`Maybe: ${maybe}`}
          />
        )}
        {pendingPct > 0 && (
          <div 
            style={{ width: `${pendingPct}%` }} 
            className="bg-brand-text-muted h-full"
            title={`Awaiting response: ${pending}`}
          />
        )}
      </div>
      
      {/* Detailed RSVP list - Clean inline layout or compact table */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <span className="block text-[10px] text-brand-text-muted uppercase font-bold">Attending</span>
          <span className="font-sans text-[14px] font-bold text-brand-green">{confirmed}</span>
        </div>
        <div>
          <span className="block text-[10px] text-brand-text-muted uppercase font-bold">No</span>
          <span className="font-sans text-[14px] font-bold text-brand-muted-red">{declined}</span>
        </div>
        <div>
          <span className="block text-[10px] text-brand-text-muted uppercase font-bold">Maybe</span>
          <span className="font-sans text-[14px] font-bold text-brand-gold">{maybe}</span>
        </div>
        <div>
          <span className="block text-[10px] text-brand-text-muted uppercase font-bold">Pending</span>
          <span className="font-sans text-[14px] font-bold text-brand-text-secondary">{pending}</span>
        </div>
      </div>
    </div>
  );
}
