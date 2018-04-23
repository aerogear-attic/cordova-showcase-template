import { config } from "../services/config"
import { MetricsService } from '@aerogear/core';

export var metrics: MetricsService;

// Create metrics
export function initMetrics() {
  // TODO we need shared instance on SDK level not app level!
  // TODO we need this to not crash if config is missing
  let metricsConfig = config.getMetricsConfig();
  metrics = new MetricsService(metricsConfig);
  // TODO ensure device is ready.
  metrics.sendAppAndDeviceMetrics();
}

