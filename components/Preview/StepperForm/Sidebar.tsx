import Link from 'next/link';

const SidebarForm = ({ steps, formData, step }) => {
  const data = [
    {
      type: 'link',
      icon: 'MdDashboard',
      title: 'Dashboard',
      href: '/dashboard',
      children: []
    },
    {
      type: 'link',
      icon: 'GrAnnounce',
      title: 'Announcement',
      href: '/announcement',
      children: []
    }
  ];

  return (
    <div className="hidden md:block">
      <ul className="p-4 list-none fixed  h-[50vh] bg-white rounded-md border-2">
        {steps.map((item, index) => {
          const isActive = Number(step) >= item.step;
          return (
            <li
              key={index}
              className={`flex items-center mb-2 px-2 py-1 ${Number(step) === item.step ? 'bg-success-200 rounded-md' : ''}`}
            >
              {isActive ? (
                <Link href={`/form?step=${item.slug}`}>
                  <span className="ml-2 text-primary-500">{item.name}</span>
                </Link>
              ) : (
                <span className="ml-2 text-gray-500 cursor-not-allowed">{item.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarForm;
