export type CountryCode = {
  name: { common: string };
  idd: { root: string; suffixes?: string[] };
};

export type CountryPrefix = {
  country: string;
  code: string;
};

export async function getCountryCodes(): Promise<CountryPrefix[]> {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=idd,name');
  if (!res.ok) {
    throw new Error('Failed to fetch country codes');
  }
  const data = await res.json();
  return data
    .filter((c: any) => c.idd?.root)
    .map((c: any) => ({
      country: c.name.common,
      code: `${c.idd.root}${c.idd.suffixes ? c.idd.suffixes[0] : ''}`,
    }))
    .sort((a: CountryPrefix, b: CountryPrefix) =>
      a.country.localeCompare(b.country)
    );
}
