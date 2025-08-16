export const metadata = {
  title: '家庭教師料金表',
};

export default function TutorPricingPage() {
  const plans = [
    {
      name: 'オンラインお手軽コース',
      price: '月額5,000円',
      note: 'チャットで質問し放題'
    },
    {
      name: '家庭訪問プラン',
      price: '月額30,000円',
      note: '月4回×3時間の訪問指導'
    },
    {
      name: '個別塾プラン',
      price: '月額20,000円',
      note: '月2回×3時間 会議室での指導'
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-10 py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">家庭教師料金表</h1>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">コース</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">料金</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-left">備考</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.name}>
              <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 font-medium">
                {plan.name}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                {plan.price}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-2 py-1">
                {plan.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

