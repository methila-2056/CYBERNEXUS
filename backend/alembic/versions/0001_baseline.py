"""baseline

Baseline migration for CYBERNEXUS.

Deliberately empty: it establishes the migration pipeline and pins the schema
to the current models. Domain tables (users, events, alerts, incidents, ...)
arrive with their implementation phases (auth Phase 2, event pipeline Phase 3).

Revision ID: 0001_baseline
Revises:
Create Date: 2026-09-17
"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "0001_baseline"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass