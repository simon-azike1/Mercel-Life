import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import * as LucideIcons from "lucide-react";
import { ExternalLink } from "lucide-react";

export default function ServiceCard({ service }) {
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
              onError={(e) => {
                console.error("Image failed to load:", service.image);
                e.target.style.display = "none";
                e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
              }}
            />
          ) : null}
          
          <div className="fallback-icon absolute inset-0 flex items-center justify-center" style={{ display: service.image ? 'none' : 'flex' }}>
            <IconComponent className="w-16 h-16 text-slate-300" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
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
          
          <h3 className="font-bold text-slate-900 text-xl mb-3 line-clamp-2 leading-tight">
            {service.title}
          </h3>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {service.description}
          </p>

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
            <div className="mb-4 text-2xl font-bold text-slate-900">
              ${service.price}
            </div>
          )}

          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {service.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs px-2.5 py-1 bg-slate-50 border-slate-200 text-slate-600 font-medium">
                  {tag}
                </Badge>
              ))}
              {service.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2.5 py-1 bg-slate-50 border-slate-200 text-slate-600 font-medium">
                  +{service.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {service.link && (
            <Button
              variant="link"
              size="sm"
              onClick={() => window.open(service.link, "_blank", "noopener,noreferrer")}
              className="text-blue-600 hover:text-blue-700 p-0 h-auto flex items-center gap-2 font-semibold group/link"
            >
              <span>Learn More</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}