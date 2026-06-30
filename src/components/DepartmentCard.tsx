import React from "react";
import { Department } from "../types";

interface DepartmentCardProps {
  key?: React.Key;
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const { name, icon, status, done, total } = department;

  let statusText = "On Track";
  let textColor = "text-brand-green";
  
  if (status === "DELAYED") {
    statusText = "Delayed";
    textColor = "text-brand-gold";
  } else if (status === "BLOCKED") {
    statusText = "Blocked";
    textColor = "text-brand-muted-red";
  }

  return (
    <div 
      id={`dept-card-${name.toLowerCase().replace(/\s+/g, "-")}`} 
      className="py-3 border-b border-[#EDE8DF]/30 flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2">
        <span className="text-base" aria-hidden="true">{icon}</span>
        <h4 className="font-sans text-[13px] font-bold text-brand-text-primary">
          {name}
        </h4>
      </div>
      
      <div className="text-right">
        <div className={`font-sans text-[11px] font-bold ${textColor}`}>
          {statusText}
        </div>
        <div className="font-sans text-[11px] text-brand-text-muted mt-0.5">
          {done}/{total} done
        </div>
      </div>
    </div>
  );
}
