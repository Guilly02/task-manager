export default function FilterTabs({ active, onChange, counts }) {
  const tabs = [
    { key: "all",      label: "All",    count: counts.all },
    { key: "active",   label: "Active", count: counts.active },
    { key: "inactive", label: "Done",   count: counts.inactive },
  ];

  return (
    <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all duration-150 ${
            active === tab.key
              ? "bg-white text-blue-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {tab.label}
          <span className={`ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
            active === tab.key ? "bg-blue-50 text-blue-600" : "bg-slate-200 text-slate-500"
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}