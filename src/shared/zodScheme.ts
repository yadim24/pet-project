import { z } from 'zod';

export const coerceValidateInt = z.coerce.number().int();
