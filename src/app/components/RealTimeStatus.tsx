import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface RealTimeStatusProps {
  isUpdating: boolean;
  lastUpdate: Date;
  updateInterval: number; // in seconds
  onStatusChange?: (status: 'online' | 'offline' | 'updating') => void;
}

export function RealTimeStatus({ 
  isUpdating, 
  lastUpdate, 
  updateInterval = 120, 
  onStatusChange 
}: RealTimeStatusProps) {
  const [status, setStatus] = useState<'online' | 'offline' | 'updating'>('online');
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);
  const [nextUpdateIn, setNextUpdateIn] = useState(updateInterval);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const lastUpdateTime = lastUpdate.getTime();
      const elapsed = Math.floor((now - lastUpdateTime) / 1000);
      
      setTimeSinceUpdate(elapsed);
      setNextUpdateIn(Math.max(0, updateInterval - elapsed));

      // Determine status
      if (isUpdating) {
        setStatus('updating');
      } else if (elapsed > updateInterval * 2) {
        setStatus('offline');
      } else {
        setStatus('online');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isUpdating, lastUpdate, updateInterval]);

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'text-green-600';
      case 'updating': return 'text-blue-600';
      case 'offline': return 'text-red-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'updating': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'offline': return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online': return 'Live';
      case 'updating': return 'Updating...';
      case 'offline': return 'Offline';
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  };

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className={`${getStatusColor()} border-current`}
      >
        <div className="flex items-center gap-1">
          {getStatusIcon()}
          <span className="text-xs font-medium">{getStatusText()}</span>
        </div>
      </Badge>
      
      {status === 'online' && (
        <span className="text-xs text-gray-500">
          Next update in {formatTime(nextUpdateIn)}
        </span>
      )}
      
      {status === 'offline' && (
        <span className="text-xs text-red-500">
          Last update {formatTime(timeSinceUpdate)} ago
        </span>
      )}
    </div>
  );
}
