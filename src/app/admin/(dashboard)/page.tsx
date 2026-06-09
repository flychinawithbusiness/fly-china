import { prisma } from "@/lib/prisma";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-green-100 text-green-700",
  contacted: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const [packages, blogs, gallery, faqs, inquiries] = await Promise.all([
    prisma.package.count(),
    prisma.blogPost.count(),
    prisma.galleryImage.count(),
    prisma.faq.count(),
    prisma.inquiry.count({ where: { status: "new" } }),
  ]);

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const stats = [
    { icon: "📋", label: "New Inquiries", value: inquiries },
    { icon: "✈️", label: "Packages", value: packages },
    { icon: "📝", label: "Blog Posts", value: blogs },
    { icon: "🖼️", label: "Gallery Images", value: gallery },
    { icon: "❓", label: "FAQs", value: faqs },
  ];

  const today = formatDate(new Date());

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[#1C3A6B]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">{today}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 shadow-sm"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-gray-500 text-xs font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-[#1C3A6B] mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#1C3A6B] mb-4">
          Recent Inquiries
        </h2>

        {recentInquiries.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No inquiries yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="py-3 pr-4 font-medium">Name</th>
                  <th className="py-3 pr-4 font-medium">Country</th>
                  <th className="py-3 pr-4 font-medium">Duration</th>
                  <th className="py-3 pr-4 font-medium">WhatsApp</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="border-b border-gray-50 last:border-none"
                  >
                    <td className="py-3 pr-4 text-gray-800 font-medium">
                      {inq.name}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{inq.country}</td>
                    <td className="py-3 pr-4 text-gray-600">{inq.duration}</td>
                    <td className="py-3 pr-4 text-gray-600">{inq.whatsapp}</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {formatDate(inq.createdAt)}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          STATUS_STYLES[inq.status] ??
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
