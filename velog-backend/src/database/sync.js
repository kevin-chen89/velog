import {
  EmailAuth,
  SocialAccount,
  User,
  UserProfile,
  Post,
  Category,
  PostsCategories,
  Tag,
  PostsTags,
  PostLike,
  Comment,
  FollowUser,
  FollowTag,
} from './models';

export default function sync() {
  // configure relations
  UserProfile.associate();
  SocialAccount.associate();
  Post.associate();
  Category.associate();
  PostsCategories.associate();
  PostsTags.associate();
  PostLike.associate();
  Comment.associate();
  FollowUser.associate();
  FollowTag.associate();

  if (process.env.SYNC_DB !== 'true') {
    return;
  }
  // sync Models
  User.sync();
  UserProfile.sync();
  SocialAccount.sync();
  EmailAuth.sync();
  Tag.sync();
  Post.sync();
  Category.sync();
  PostsCategories.sync();
  PostsTags.sync();
  PostLike.sync();
  Comment.sync();
  FollowUser.sync();
  FollowTag.sync();
}

