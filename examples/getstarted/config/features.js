module.exports = ({ env }) => ({
  future: {
    unstableContentReleases: env.bool('STRAPI_FUTURE_UNSTABLECONTENTRELEASES', false),
  },
});
