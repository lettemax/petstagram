"""second try

Revision ID: fa84b2047a28
Revises: 8634e214f5c2
Create Date: 2021-02-22 13:31:45.969293

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'fa84b2047a28'
down_revision = '8634e214f5c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('comments', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('comments', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('photos', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('photos', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('users', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column('users', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('users', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('photos', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('photos', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('comments', 'updatedAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column('comments', 'createdAt',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    # ### end Alembic commands ###
