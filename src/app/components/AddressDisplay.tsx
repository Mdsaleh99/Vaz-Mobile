import React from "react";

interface AddressProps {
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
}

const AddressDisplay: React.FC<AddressProps> = ({
  city,
  country,
  line1,
  line2,
  postal_code,
  state,
}) => {
  return (
    <div className="address">
      <p>{line1}</p>
      {line2 && <p>{line2}</p>} {/* Only display line2 if it exists */}
      <p>
        {city}, {state} - {postal_code}
      </p>
      <p>{country}</p>
    </div>
  );
};

export default AddressDisplay;
