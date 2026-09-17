# models — serialized ML artifacts

Output of the `ml-engine` training pipeline (`.joblib`/`.pkl`). Contents are **gitignored** — models are reproducible artifacts, not source.

Keep one directory per model (e.g. `endpoint_anomaly_v1/`) with the artifact, the feature list, and evaluation metrics so results are traceable.

See `../ml-engine/` and `../docs/machine-learning.md`.