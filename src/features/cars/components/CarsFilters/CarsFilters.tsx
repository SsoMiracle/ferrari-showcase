import FilterDropdown from "./FilterDropdown";

type Filters = {
  model: string;
  year: string;
  mileage: string;
};

type Option = {
  label: string;
  value: string;
};

type Props = {
  draftFilters: Filters;
  setDraftFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onSearch: () => void;

  modelOptions: Option[];
  yearOptions: Option[];
};

function CarsFilters({
  draftFilters,
  setDraftFilters,
  onSearch,
  modelOptions,
  yearOptions,
}: Props) {
  return (
    <div className="w-full flex items-end gap-12 mb-16">
      <FilterDropdown
        label="MODEL"
        value={draftFilters.model}
        options={modelOptions}
        onChange={(value) =>
          setDraftFilters((prev) => ({ ...prev, model: value }))
        }
      />

      <FilterDropdown
        label="FROM YEAR"
        value={draftFilters.year}
        options={yearOptions}
        onChange={(value) =>
          setDraftFilters((prev) => ({ ...prev, year: value }))
        }
      />

      <FilterDropdown
        label="MILEAGE"
        value={draftFilters.mileage}
        options={[
          { label: "MILEAGE", value: "ALL" },
          { label: "0 - 1000", value: "0-1000" },
          { label: "1000 - 5000", value: "1000-5000" },
          { label: "5000 - 10000", value: "5000-10000" },
        ]}
        onChange={(value) =>
          setDraftFilters((prev) => ({ ...prev, mileage: value }))
        }
      />

      <button
        onClick={onSearch}
        className="relative px-10 py-3 border border-black text-sm tracking-[0.2em] overflow-hidden group"
      >
        <span className="relative z-10 group-hover:text-white transition-colors duration-200">
          SEARCH
        </span>
        <span className="absolute inset-0 bg-red-600 scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
      </button>
    </div>
  );
}

export default CarsFilters;
