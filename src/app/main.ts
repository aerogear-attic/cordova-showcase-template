

import { INSTANCE as keycloakInstance } from '../services/auth.service';
import { MetricsService } from '@aerogear/core';
import {config } from "../services/config"





 // Create metrics

 // TODO we need shared instance
 // TODO we need this to not crash if config is missing
 let metricsConfig = config.getConfig("metrics");
 let metrics = new MetricsService(metricsConfig);
 // TODO ensure device is ready.
 metrics.sendAppAndDeviceMetrics();
