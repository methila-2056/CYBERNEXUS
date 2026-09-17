# ml-engine — machine-learning anomaly detection

Trains and serves **behavioural anomaly detectors** on synthetic/simulated datasets only.

**Cybersecurity concept (Phase 17):** Beyond hand-written rules, ML can flag *novel* behaviour — events that look like almost nothing seen before. We pair it with rules and score both with the same risk pipeline.

Planned contents:

- `datasets` handling (see `../datasets/`)
- Feature engineering (counts, rates, ratios, entropy)
- Train/test split + evaluation (accuracy, precision, recall, F1, confusion matrix, ROC-AUC)
- `joblib` model serialization into `../models/` (gitignored)
- `inference/` API used by the backend
- Honest documentation of dataset limitations — no inflated metrics.

See `../docs/machine-learning.md`.