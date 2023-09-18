type showOrganizationResult = organization & {
  organization_pic: organization_pic;
  city: region;
  province: region;
  user: user;
  organization_reviews: Array<organization_review & { user: user }>;
};
