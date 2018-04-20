

import { initKeycloak } from "../services/auth.service"
import { initMetrics } from "../services/metrics"

initKeycloak();
initMetrics();
