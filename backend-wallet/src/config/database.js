module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'wallet',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
