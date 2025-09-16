import { useEffect, useState, useRef } from 'react';
import { getCountryCodes } from '../../services/countryCodeService';
import type { CountryPrefix } from '../../services/countryCodeService';

type PhoneInputProps = {
  countryCode: string;
  setCountryCode: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
};

export function PhoneInput({
  countryCode,
  setCountryCode,
  phoneNumber,
  setPhoneNumber,
}: PhoneInputProps) {
  const [codes, setCodes] = useState<CountryPrefix[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const data = await getCountryCodes();
        setCodes(data);
      } catch (err) {
        console.error('Error fetching codes', err);
      }
    };
    fetchCodes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountry = codes.find((c) => c.code === countryCode);

  return (
    <div className="flex gap-2 relative w-full">
      <div ref={wrapperRef} className="relative w-1/3">
        <input
          type="text"
          readOnly
          value={
            selectedCountry
              ? `${selectedCountry.country} (${selectedCountry.code})`
              : ''
          }
          onClick={() => setOpen(!open)}
          placeholder="Country Code"
          className="flex-1 font-onest w-full px-3 py-3 border rounded-lg bg-white shadow-sm text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {open && (
          <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border bg-white shadow-lg text-sm">
            {codes.map((c) => (
              <li
                key={c.code}
                onClick={() => {
                  setCountryCode(c.code);
                  setOpen(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-blue-100"
              >
                {c.country} ({c.code})
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="flex-1 font-onest px-4 py-2 w-1/ border rounded-lg text-sm focus:ring-2 focus:outline-none focus:ring-blue-300"
      />
    </div>
  );
}
