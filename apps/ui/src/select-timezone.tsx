import React from 'react';

import moment from 'moment-timezone';

const timezones = moment.tz.names();

interface SelectTZProps {
  selectedTimezone: string
  onChange: (selectedOption: string) => void
}

export const SelectTZ = React.forwardRef((props: SelectTZProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const timezone = String(e.target.value);
    props.onChange(timezone);
  }

  return (
    <select
      ref={ref}
      defaultValue={props.selectedTimezone}
      onChange={onSelectChange}
    >
      {
        timezones.map(tz => (<option key={tz} value={tz}>{tz}</option>))
      }
    </select>
  );
});

SelectTZ.displayName = "Select Timezone";
