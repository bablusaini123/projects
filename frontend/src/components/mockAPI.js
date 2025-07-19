export const getWalletBalance = async (userId) => {
  // Mock API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        balance: 45000,
        lastUpdated: new Date().toISOString(),
      });
    }, 500);
  });
};

export const getPaymentHistory = async (userId) => {
  // Mock API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        transactions: [
          {
            id: 'tx1',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            courseTitle: 'Digital Marketing Mastery',
            amount: 999,
            commission: 599,
          },
          {
            id: 'tx2',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            courseTitle: 'Web Development Bootcamp',
            amount: 1499,
            commission: 974,
          },
          {
            id: 'tx3',
            date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            courseTitle: 'Social Media Marketing',
            amount: 2399,
            commission: 1679,
          },
        ],
      });
    }, 500);
  });
};

export const getReferrals = async (userId) => {
  // Mock API response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        level1: [
          { id: 'ref1', email: 'user1@example.com', referrals: 3 },
          { id: 'ref2', email: 'user2@example.com', referrals: 2 },
          { id: 'ref3', email: 'user3@example.com', referrals: 0 },
          { id: 'ref4', email: 'user4@example.com', referrals: 1 },
          { id: 'ref5', email: 'user5@example.com', referrals: 4 },
          { id: 'ref6', email: 'user6@example.com', referrals: 0 },
        ],
        level1Count: 15,
        level2Count: 10,
      });
    }, 500);
  });
};