import { Transform } from 'class-transformer';
import { trim } from 'lodash';

export function Trim() {
  return Transform((params) => {
    const value = params.value;
    if (Array.isArray(value)) {
      return value.map((v) => trim(v).replace(/\s\s+/g, ' '));
    }
    return trim(value).replace(/\s\s+/g, ' ');
  });
}
