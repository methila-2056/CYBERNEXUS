"""Structured logging configuration.

Logs are structured as key=value pairs so they are easy to parse in CI and
dashboards. Sensitive payloads must never be logged.
"""

import logging
import sys

_CONFIGURED = False


def setup_logging(level: str = "INFO") -> None:
    """Configure root logging exactly once for the whole process."""
    global _CONFIGURED
    if _CONFIGURED:
        return
    _CONFIGURED = True

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter(
            "%(asctime)s level=%(levelname)s logger=%(name)s %(message)s"
        )
    )

    root = logging.getLogger()
    root.setLevel(level.upper())
    root.addHandler(handler)
    # Quiet noisy third-party loggers.
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)