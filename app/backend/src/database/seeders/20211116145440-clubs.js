module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'clubs',
      [
        {
          club_name: 'Avaí/Kindermann',
        },
        {
          club_name: 'Bahia',
        },
        {
          club_name: 'Botafogo',
        },
        {
          club_name: 'Corinthians',
        },
        {
          club_name: 'Cruzeiro',
        },
        {
          club_name: 'Ferroviária',
        },
        {
          club_name: 'Flamengo',
        },
        {
          club_name: 'Grêmio',
        },
        {
          club_name: 'Internacional',
        },
        {
          club_name: 'Minas Brasília',
        },
        {
          club_name: 'Napoli-SC',
        },
        {
          club_name: 'Palmeiras',
        },
        {
          club_name: 'Real Brasília',
        },
        {
          club_name: 'Santos',
        },
        {
          club_name: 'São José-SP',
        },
        {
          club_name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('clubs', null, {});
  },
};
