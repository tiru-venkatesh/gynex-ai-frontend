import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/components/ui/hover-card";
import { Badge } from "@/app/components/ui/badge";
import { Plug } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

interface DevAnnotationProps {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  payload?: object | string;
  response?: object | string;
  title?: string;
  className?: string;
}

export function DevAnnotation({ endpoint, method, payload, response, title, className }: DevAnnotationProps) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <div className={cn("cursor-help inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors select-none", className)}>
          <Plug className="w-3 h-3 mr-1" />
          API
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 md:w-96 p-0 overflow-hidden shadow-xl" align="start">
        <div className="bg-slate-50 dark:bg-slate-900 p-3 border-b flex items-center justify-between">
            <h4 className="text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {title || 'Endpoint Details'}
            </h4>
            <Badge variant={
                method === 'GET' ? 'secondary' : 
                method === 'POST' ? 'default' : 
                method === 'DELETE' ? 'destructive' : 'outline'
            } className="font-mono text-[10px]">
              {method}
            </Badge>
        </div>
        
        <div className="p-4 space-y-4 bg-white dark:bg-slate-950">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Endpoint</div>
            <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 p-1.5 rounded text-slate-700 dark:text-slate-300 break-all border border-slate-200 dark:border-slate-700">
              {endpoint}
            </div>
          </div>

          {payload && (
            <div className="space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payload Example</div>
              <div className="relative">
                <pre className="text-[10px] leading-relaxed font-mono bg-slate-900 text-slate-50 p-3 rounded-md overflow-x-auto max-h-40 border border-slate-800">
                  {typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {response && (
            <div className="space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Response Example</div>
              <div className="relative">
                <pre className="text-[10px] leading-relaxed font-mono bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 p-3 rounded-md overflow-x-auto max-h-40 border border-slate-200 dark:border-slate-800">
                  {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
