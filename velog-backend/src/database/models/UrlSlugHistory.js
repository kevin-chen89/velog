// @flow
import Sequelize from 'sequelize';
import db from 'database/db';
import { primaryUUID } from 'lib/common';
import { Post } from 'database/models';

const UrlSlugHistory = db.define(
  'url_slug_history',
  {
    id: primaryUUID,
    fk_post_id: Sequelize.UUID,
    url_slug: Sequelize.STRING,
  },
  {
    indexes: [
      {
        fields: ['url_slug'],
      },
    ],
  },
);

UrlSlugHistory.associate = () => {
  UrlSlugHistory.belongsTo(Post, {
    foreignKey: 'fk_post_id',
    onDelete: 'CASCADE',
    onUpdate: 'restrict',
  });
};

export default UrlSlugHistory;
