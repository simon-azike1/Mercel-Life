// ServiceCard.jsx
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import * as LucideIcons from "lucide-react";

export default function ServiceCard({ service, onEdit, onDelete, showActions = false }) {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active": return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "draft": return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "archived": return "bg-slate-500/10 text-slate-700 border-slate-500/20";
      default: return "bg-blue-500/10 text-blue-700 border-blue-500/20";
    }
  };

  const IconComponent = LucideIcons[service.icon] || LucideIcons.Palette;

  return (
    <Card className="group bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 rounded-2xl overflow-hidden shadow-sm">
      <CardContent className="p-0">
        <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden flex items-center justify-center">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <IconComponent className="w-16 h-16 text-slate-300" />
          )}
          {showActions && (
            <div className="absolute top-4 right-4 flex gap-2">
              {onEdit && <Button size="sm" onClick={() => onEdit(service)}>Edit</Button>}
              {onDelete && <Button size="sm" onClick={() => onDelete(service)}>Delete</Button>}
            </div>
          )}
          <div className="absolute top-4 left-4">
            <Badge className={`${getStatusBadgeColor(service.status || "active")} text-xs font-semibold px-3 py-1 shadow-lg backdrop-blur-sm border`}>
              {(service.status || "active").charAt(0).toUpperCase() + (service.status || "active").slice(1)}
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3">
            <Badge variant="secondary" className="text-xs font-semibold bg-blue-500/10 text-blue-700 border border-blue-500/20 px-3 py-1">
              {service.category}
            </Badge>
          </div>
          <h3 className="font-bold text-slate-900 text-xl mb-3 line-clamp-2 leading-tight">{service.title}</h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{service.description}</p>

          {service.features && service.features.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-semibold text-slate-500 mb-2">Features:</div>
              <div className="space-y-1">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="text-xs text-slate-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <div className="text-xs text-slate-500 ml-4">+{service.features.length - 3} more</div>
                )}
              </div>
            </div>
          )}

          {service.price && (
            <div className="mb-4 text-2xl font-bold text-slate-900">${service.price}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
