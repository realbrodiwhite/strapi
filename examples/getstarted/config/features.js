module.exports = ({ env }) => ({
  future: {
    unstable_contentReleases: env.bool('FUTURE_UNSTABLE_CONTENT_RELEASES', false),
  },
});
